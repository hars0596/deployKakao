'use strict';
module.exports = (sequelize, DataTypes) => {
  const group = sequelize.define('group', {
    groupName: DataTypes.STRING,
    createdBy: DataTypes.INTEGER
  }, {});
  group.associate = function(models) {
    // associations can be defined here
  };
  return group;
};