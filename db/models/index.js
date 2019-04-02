const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const sequelize = require('../connection');

const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.values({ ...db }).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
});

module.exports = db;