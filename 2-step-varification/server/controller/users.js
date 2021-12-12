const bcrypt = require('bcrypt');
const { USERS } = require('../DB/users.js');

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
          res.send(user.key ? 'verification' : 'home'); //Send where to navigate to the "home" page or the "verification" page
          return;
        }
      }
    }

    // User registration
    USERS.push({ userName, password: await bcrypt.hash(password, await bcrypt.genSalt(8)), key: '' });
    console.log('USERS', USERS);
    res.send('home'); //Send where to navigate to the "home" page or the "verification" page
  } catch (error) {
    next(error);
  }
};
