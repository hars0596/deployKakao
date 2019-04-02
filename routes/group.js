var express = require('express');

var groupRouter = express.Router();
const groupController = require("../controllers").Group;
const authenticate = require('../middlewares/authenticate.js');


groupRouter.get('/:id', groupController.getParticularGroup);
//CRUD for USER
groupRouter.post('/groupCreate', authenticate, groupController.create);
groupRouter.get('/groupList', groupController.list);
// groupRouter.put('/:id', groupController.update);


module.exports = groupRouter;