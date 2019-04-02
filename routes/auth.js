var express = require('express');

var authRouter = express.Router();
const signupController = require('../controllers').Signup;
const loginController = require('../controllers').Login;

authRouter.post('/', signupController.add);
authRouter.get('/:identifier', signupController.query);
authRouter.post('/login', loginController.add);



module.exports = authRouter;