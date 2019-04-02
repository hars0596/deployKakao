var express = require('express');

var userRouter = express.Router();
const UserController = require("../controllers").User;
const authenticate = require('../middlewares/authenticate.js');


//CRUD for USER
userRouter.post('/userCreate', authenticate, UserController.create);
userRouter.get('/userList', UserController.list);
userRouter.put('/:id', UserController.update);
userRouter.get('/:id', UserController.retrieve);



module.exports = userRouter;