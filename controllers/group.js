const Group = require("../db/models").group;
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('../config/token.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// const { sendVerificationEmail } = require('./SendGridEmailHelper');
const sequelize = new Sequelize("kakao", "postgres", "1234", {
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
            return Group
                .create({
                    groupName: req.body.groupName,
                    createdBy: createdBy,
                },
                    {
                    })
                .then(todo => res.status(201).send(todo))
                .catch(error => res.status(400).send(error));
        });


    },
    list(req, res) {
        console.log("check Point List");
        return Group
            .findAll()
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },
    // retrieve(req, res) {
    //     return Admin
    //         .findById(req.params.id)
    //         .then(todo => {
    //             if (!todo) {
    //                 return res.status(404).send({
    //                     message: "Todo Not Found"
    //                 });
    //             }
    //             return res.status(200).send(todo);
    //         })
    //         .catch(error => res.status(400).send(error));
    // },
    // update(req, res) {
    //     return Admin
    //         .findById(req.params.id)
    //         .then(todo => {
    //             if (!todo) {
    //                 return res.status(404).send({
    //                     message: "Todo Not Found"
    //                 });
    //             }
    //             return todo
    //                 .update({
    //                     // pId: req.body.pId || newUser.pId,
    //                     name: req.body.name || todo.name,
    //                     password: req.body.password || todo.password,
    //                     photoUrl: req.body.photoUrl || todo.photoUrl,
    //                     email: req.body.email,
    //                     phoneNumber: req.body.phoneNumber || todo.phoneNumber
    //                 })
    //                 .then(() => res.status(200).send(todo))
    //                 .catch(error => res.status(400).send(error));
    //         })
    //         .catch(error => res.status(400).send(error));
    // },
    // destroy(req, res) {
    //     return Admin
    //         .findById(req.params.id)
    //         .then(todo => {
    //             if (!todo) {
    //                 return res.status(400).send({
    //                     message: "Todo Not Found"
    //                 });
    //             }
    //             return todo
    //                 .destroy()
    //                 .then(() => res.status(204).send())
    //                 .catch(error => res.status(400).send(error));
    //         })
    //         .catch(error => res.status(400).send(error));
    // },
    getParticularGroup(req, res) {
        return Group
            .findAll({
                where: {
                    createdBy: req.params.id
                }
            })
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },

    // userCount(req, res) {
    //     let querry
    //     querry = sequelize.query('select "createdBy",COUNT("createdBy") from "Profiles" where "createdBy"= :status  and "roleId" = 3 GROUP BY "createdBy"; ',
    //         { replacements: { status: req.params.id }, type: sequelize.QueryTypes.SELECT }
    //     ).then(projects => {
    //         res.json(projects)
    //     })

    // }
};
