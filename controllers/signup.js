const Profile = require('../db/models').Profile;
const config = require('../config/token.js');
const models = require('../db/models');
const commonvalidations = require('../Admin/src/shared/validations/signup');
const jwt = require("jsonwebtoken");
// const bcrypt = require('bcrypt');
const crypto = require('crypto-random-string');
const bcrypt = require('bcryptjs');
const isEmpty = require('lodash/isEmpty');
const Promise = require('bluebird');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sendVerificationResetPasswordEmail = require("./helper/verificationResetPassword");
function validateInput(data, otherValidations) {
    let { errors } = otherValidations(data);
    return Promise.all([
        Profile.findOne({
            where: { email: data.email }
        }).then(user => {
            if (user) { errors.email = 'email is alredy exist' }
        }),
        Profile.findOne({
            where: { name: data.name }
        }).then(user => {
            if (user) { errors.username = 'username is alredy exist' }
        })
    ]).then(() => {
        return {
            errors,
            isValid: isEmpty(errors)
        };
    })
}
module.exports = {

    query(req, res) {

        return Profile
            .findOne(
                {
                    attributes: ['username', 'email'],
                    where: {
                        [Op.or]: [{ username: req.params.identifier }, { email: req.params.identifier }]
                    }
                }).then(user => {
                    res.json({ user });
                })
    },
    add(req, res) {
        validateInput(req.body, commonvalidations).then(({ errors, isValid }) => {
            if (isValid) {
                const { password } = req.body;
                const password_digest = bcrypt.hashSync(password, 10);
                return Profile
                    .create({
                        username: req.body.username,
                        password: password_digest,
                        email: req.body.email
                    }).then(user => res.status(201).send(user))
                    .catch(err => res.status(500).json({ error: err }));
            }
            else {
                res.status(400).json(errors);
            }
        })
    },
    resetPassword(req, res) {
        return Profile
            .findOne(
                {
                    where: {
                        email: req.body.email
                    }
                }).then((user, err) => {
                    return models.ResetPasswordVerificationToken.create({
                        userId: user.id,
                        token: crypto(16)
                    }).then((result) => {
                        sendVerificationResetPasswordEmail(user.email, result.token);
                        return res.status(200).json(`${user.email} account created successfully`);
                    })
                })
            .catch(error => res.status(400).send(error));
    },
    resetAdminPassword(req, res) {
        jwt.verify(req.token, config.jwtSecret, (err, authData) => {
            const { password } = req.body;
            const id = authData.id;
            const password_digest = bcrypt.hashSync(password, 10);
            return Profile
                .findById(id)
                .then(todo => {
                    if (!todo) {
                        return res.status(404).send({
                            message: "Todo Not Found"
                        });
                    }
                    return todo
                        .update({
                            password: password_digest || todo.password,
                        })
                        .then(() => res.status(200).send(todo))
                        .catch(error => res.status(400).send(error));
                })
                .catch(error => res.status(400).send(error));

        });
    }
}
