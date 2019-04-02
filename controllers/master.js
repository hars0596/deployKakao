const Admin = require("../db/models").Profile;
const models = require("../db/models");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('../config/token.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const crypto = require('crypto-random-string');
const sendVerificationEmail = require('./helper/verificationHelper');
const sequelize = new Sequelize(process.env.DB_NAME, "postgres", "1234", {
    host: "localhost",
    dialect: "postgres",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
});

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
                    roleId: 2,
                })
                // .then(todo => res.status(201).send(todo))
                .then((todo, err) => {
                    return models.VerificationToken.create({
                        userId: todo.id,
                        token: crypto(16)
                    }).then((result) => {
                        sendVerificationEmail(todo.email, result.token);
                        return res.status(200).json(`${todo.email} account created successfully`);
                    })
                })
                .catch(error => res.status(400).send(error));
        });


    },
    list(req, res) {
        console.log("check Point List");
        return Admin
            .findAll({
                where: {
                    [Op.and]: [{ roleId: 2 }, { isVerified: true }]
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
                return res.status(200).send(todo);
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
                        phoneNumber: req.body.phoneNumber || todo.phoneNumber,

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
    },
    getParticularUserOfMaster(req, res) {
        return Admin
            .findAll({
                where: {
                    [Op.and]: [{ roleId: 3 }, { createdBy: req.params.id }]

                }
            })
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },

    userCount(req, res) {
        sequelize.query('select "createdBy",COUNT("createdBy") from "Profiles" where "createdBy"= :status  and "roleId" = 3 GROUP BY "createdBy"; ',
            { replacements: { status: req.params.id }, type: sequelize.QueryTypes.SELECT }
        ).then(projects => {
            res.json(projects)
        })

    }
};
