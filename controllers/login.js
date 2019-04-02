const Login = require('../db/models').Profile;
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');
const Promise = require('bluebird');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const jwt = require('jsonwebtoken');
const config = require('../config/token.js');
module.exports = {
    add(req, res) {
        const { identifier, password } = req.body;
        return Login
            .findOne(
                {
                    where: {
                        [Op.or]: [{ name: identifier }, { email: identifier }],
                        [Op.and]: [{ isVerified: true }]
                    }

                }).then((results) => {
                    if (results) {
                        if (bcrypt.compareSync(password, results.password)) {
                            const token = jwt.sign({
                                id: results.id,
                                name: results.name,
                                roleId: results.roleId
                            }, config.jwtSecret,

                                {
                                    expiresIn: '24h'
                                }
                            );

                            res.json({ token });
                        } else {
                            res.status(401).json({ errors: { form: 'Wrong password. Try again' } });
                        }
                    }

                    else {
                        res.status(401).json({ errors: { form: 'Enter a valid email or username ' } })
                    }
                })
    },
};
