const Admin = require("../db/models").Profile;
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('../config/token.js');
// const { sendVerificationEmail } = require('./SendGridEmailHelper');

module.exports = {
    create(req, res) {
        console.log(req.body);
        jwt.verify(req.token, config.jwtSecret, (err, authData) => {
            const createdBy = authData.id;
            const password_digest = bcrypt.hashSync(req.body.password, 10);
            return Admin
                .create({
                    name: req.body.name,
                    password: password_digest,
                    photoUrl: req.body.photoUrl,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    createdBy: createdBy,
                    roleId: 3
                },
                    {
                    })
                .then(todo => res.status(201).send(todo))
                .catch(error => res.status(400).send(error));
        });


    },
    list(req, res) {
        console.log("check Point List");
        return Admin
            .findAll({
                where: {
                    roleId: 3
                }
            })
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Admin
            .findById(req.params.id)
            .then(todo => {
                if (!todo) {
                    return res.status(404).send({
                        message: "Todo Not Found"
                    });
                }
                return res.status(200)
                    .send(todo);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Admin
            .findById(req.params.id)
            .then(todo => {
                if (!todo) {
                    return res.status(404).send({
                        message: "Todo Not Found"
                    });
                }
                return todo
                    .update({
                        // pId: req.body.pId || newUser.pId,
                        name: req.body.name || todo.name,
                        password: req.body.password || todo.password,
                        photoUrl: req.body.photoUrl || todo.photoUrl,
                        email: req.body.email,
                        phoneNumber: req.body.phoneNumber || todo.phoneNumber
                    })
                    .then(() => res.status(200).send(todo))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Admin
            .findById(req.params.id)
            .then(todo => {
                if (!todo) {
                    return res.status(400).send({
                        message: "Todo Not Found"
                    });
                }
                return todo
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};
