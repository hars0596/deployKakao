'use strict';
module.exports = (sequelize, DataTypes) => {
  const ResetPasswordVerificationToken = sequelize.define('ResetPasswordVerificationToken', {
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {});
  ResetPasswordVerificationToken.associate = function (models) {
    // associations can be defined here
    ResetPasswordVerificationToken.belongsTo(models.Profile, {
      as: "user",
      foreignKey: "userId",
      foreignKeyConstraint: true
    });
  };
  return ResetPasswordVerificationToken;
};