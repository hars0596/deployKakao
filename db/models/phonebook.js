'use strict';
module.exports = (sequelize, DataTypes) => {
  const phonebook = sequelize.define('phonebook', {
    name: DataTypes.STRING,
    phoneNumber: DataTypes.DOUBLE,
    email: DataTypes.STRING,
    photourl: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    groupId: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: null }
  }, {});
  phonebook.associate = function (models) {
    // associations can be defined here
  };
  return phonebook;
};