var express = require('express');
var router = express.Router();
var path = require('path');
const signupController = require('../controllers').Signup;
const MasterController = require("../controllers").Master;
const groupController = require("../controllers").Group;
const phoneBookListController = require("../controllers").PhoneBookList;
const VerificationController = require("../controllers").VerificationCotroller;
// const UserController = require("../controllers").User;
const authenticate = require('../middlewares/authenticate.js');


router.post("/resetPassword", signupController.resetPassword);

router.post("/resetAdminPassword", authenticate, signupController.resetAdminPassword);

router.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname + '/about.html'));
});
router.post('/about2', function (req, res) {
    res.sendFile(path.join(__dirname + '/about2.html'));
});





router.get('/verification', VerificationController);
// CRUD for MASTER
router.post('/masterCreate', authenticate, MasterController.create);
router.get('/masterList', MasterController.list);
router.put('/:id', MasterController.update);
router.get('/:id', MasterController.retrieve);
router.get('/masterUser/:id', MasterController.getParticularUserOfMaster);
router.get('/userCount/:id', MasterController.userCount);
router.get('/masterGroup/:id', groupController.getParticularGroup);
router.get('/masterPhoneBook/:id', phoneBookListController.masterPhoneBook);



module.exports = router;


