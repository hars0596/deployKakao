const PhoneBook = require("../db/models").phonebook;
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
        jwt.verify(req.token, config.jwtSecret, (err, authData) => {
            createdBy = authData.id;
            return PhoneBook
                .create({
                    name: req.body.name,
                    photoUrl: req.body.photoUrl,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    createdBy: createdBy,
                    groupId: [null]
                },
                    {
                    })
                .then(todo => res.status(201).send(todo))
                .catch(error => res.status(400).send(error));

        });

    },

    list(req, res) {
        jwt.verify(req.token, config.jwtSecret, (err, authData) => {
            console.log("check Point List");
            createdBy = authData.id;
            return PhoneBook
                .findAll({
                    where: {
                        createdBy: createdBy
                    }
                })
                .then(todos => res.status(200).send(todos))
                .catch(error => res.status(400).send(error));

        });
    },
    //for the master list in Admin panel
    masterPhoneBook(req, res) {
        return PhoneBook
            .findAll({
                where: {
                    createdBy: req.params.id
                }
            })
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

    //for adding the Phonebookmembers in the group
    AddMemberToGroup(req, res) {
        jwt.verify(req.token, config.jwtSecret, (err, authData) => {
            createdBy = authData.id;
            return PhoneBook
                .update({ 'groupId': sequelize.fn('array_append', sequelize.col('groupId'), req.body.groupId) },
                    // { 'where': { 'id': req.body.phoneBookMemberId } }
                    {
                        where: {
                            [Op.and]: [{ id: req.body.phoneBookMemberId }, { createdBy: createdBy }]
                        }
                    }
                )
                .then(() => res.status(200).send(todo))
                .catch(error => res.status(400).send(error));
        });

    },

    //fetching the group member of particular group
    groupMember(req, res) {
        jwt.verify(req.token, config.jwtSecret, (err, authData) => {
            createdBy = authData.id;
            return PhoneBook
                .findAll({
                    where: {
                        [Op.and]: [{ groupId: { $contains: [req.body.groupId] } }, { createdBy: createdBy }]
                    }
                })
                .then(todos => res.status(200).send(todos))
                .catch(err => res.status(403).send(err));
        });
    },
    //removing member from the group
    removeMember(req, res) {
        return PhoneBook
            .update({ 'groupId': sequelize.fn('array_remove', sequelize.col('groupId'), req.body.groupId) },
                { 'where': { 'id': req.body.phoneBookMemberId } })
            .then(() => res.status(200).send(todo))
            .catch(error => res.status(400).send(error));

    },
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
    // getParticularUserOfMaster(req, res) {
    //     return Admin
    //         .findAll({
    //             where: {
    //                 [Op.and]: [{ roleId: 3 }, { createdBy: req.params.id }]

    //             }
    //         })
    //         .then(todos => res.status(200).send(todos))
    //         .catch(error => res.status(400).send(error));
    // },

    // userCount(req, res) {
    //     sequelize.query('select "createdBy",COUNT("createdBy") from "Profiles" where "createdBy"= :status  and "roleId" = 3 GROUP BY "createdBy"; ',
    //         { replacements: { status: req.params.id }, type: sequelize.QueryTypes.SELECT }
    //     ).then(projects => {
    //         res.json(projects)
    //     })

    // }
};
