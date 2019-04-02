var express = require('express');
var phoneBookListRouter = express.Router();
const phoneBookListController = require("../controllers").PhoneBookList;
const authenticate = require('../middlewares/authenticate.js');





phoneBookListRouter.put('/add', authenticate, phoneBookListController.AddMemberToGroup);
phoneBookListRouter.put('/remove', phoneBookListController.removeMember);
phoneBookListRouter.get('/groupMember', authenticate, phoneBookListController.groupMember);
phoneBookListRouter.post('/phoneBookListCreate', authenticate, phoneBookListController.create);
phoneBookListRouter.get('/phoneBookList', authenticate, phoneBookListController.list);
phoneBookListRouter.get('/:id', phoneBookListController.masterPhoneBook);
// phoneBookListRouter.put('/add', phoneBookListController.AddMemberToGroup);
// phoneBookListRouter.get('/:id', phoneBookListController.retrieve);



module.exports = phoneBookListRouter;