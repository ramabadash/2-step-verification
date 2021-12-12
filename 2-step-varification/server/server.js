/***** REQUIRE *****/
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;

const usersRouter = require('./routers/users.js');
// const { errorHandlerMiddleware } = require('./Middlewares/errorHandler.js');

/***** MIDDLEWARE *****/
app.use(express.json());
app.use(cors());

/***** ROUTERS *****/
app.use('/users', usersRouter); // Login

// app.use(errorHandlerMiddleware);

app.listen(PORT, () => console.log(`app listening at http://localhost:${PORT}`));
