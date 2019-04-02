/**
 * Create database connection.
 *
 * @since 1.0.0
 */

const config = require('../config/database');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col,
};

const options = {
    dialect: config.dialect,
    dialectOptions: {
        ssl: config.ssl,
    },
    host: config.host,
    pool: {
        idle: 10000,
        max: 5,
        min: 0,
    },
    logging: config.logging,
    operatorsAliases,
    port: config.port,
    ssl: config.ssl,
};
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    options,
);

module.exports = sequelize;
