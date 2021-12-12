const bcrypt = require('bcrypt');
const { USERS } = require('../DB/users.js');
const twofactor = require('node-2fa');

/***** FUNCTIONS ******/

// Login by userName and password save to DB and send back
exports.login = async (req, res, next) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    throw { status: 400, message: 'Missing user name or password' };
  }
  try {
    // Check if the user already exists
    for (const user of USERS) {
      const currentUserName = user.userName;
      if (userName === currentUserName) {
        // Check if exists the password is correct
        if (!(await bcrypt.compare(password, user.password))) {
          //Existing and incorrect password
          throw {
            status: 400,
            message: 'registered user? Wrong password! \n Not registered yet? Choose another username!',
          };
        } else {
          res.send(user.verification ? 'verification' : 'home'); //Send where to navigate to the "home" page or the "verification" page
          return;
        }
      }
    }

    // User registration
    USERS.push({
      userName,
      password: await bcrypt.hash(password, await bcrypt.genSalt(8)),
      key: '',
      verification: false,
    });
    console.log('USERS', USERS);
    res.send('home'); //Send where to navigate to the "home" page or the "verification" page
  } catch (error) {
    next(error);
  }
};

// Add or disable 2-step-validation
exports.TwoStepVerification = (req, res, next) => {
  const { userName } = req.body;
  try {
    const userIndex = getUserIndexFromDB(userName);
    if (userIndex || userIndex === 0) {
      // User exists

      if (!USERS[userIndex].key && !USERS[userIndex].verification) {
        // Now set to false (want to turn on) and do not have a key

        const newSecret = twofactor.generateSecret({ name: "Rama's App", account: userName });
        USERS[userIndex].key = newSecret.secret;
        USERS[userIndex].verification = !USERS[userIndex].verification; // Switch true \ false
        console.log('users', USERS);
        res.send(newSecret.qr);
        return;
      }

      USERS[userIndex].verification = !USERS[userIndex].verification; // Switch true \ false
      console.log('users', USERS);

      res.send('changed!');
      return;
    } else {
      throw {
        status: 400,
        message: 'No such user',
      };
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Get user
const getUserIndexFromDB = (userName) => {
  for (const user of USERS) {
    if (user.userName === userName) {
      console.log('users index', USERS.indexOf(user));
      return USERS.indexOf(user);
    }
  }
  return false; //No such user
};
