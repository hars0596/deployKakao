var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')
var app = express();

const cors = require("cors")
const env = require("./envalid");
const port = env.PORT;

require('dotenv').config();

var auth = require('./routes/auth');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var groupRouter = require('./routes/group');
var phoneListRouter = require('./routes/phoneList');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/kakaoUser', userRouter);
app.use('/api/auth', auth);
app.use('/kakaoMaster', indexRouter);
app.use('/kakaoGroup', groupRouter);
app.use('/kakaoPhoneList', phoneListRouter)


app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(port, () => console.log(`Server is running at: http://${env.HOST}:${port}`));








