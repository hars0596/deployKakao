'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    name: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.DOUBLE,
    createdBy: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
    isVerified: DataTypes.BOOLEAN
  }, {});
  Profile.associate = function (models) {
    // associations can be defined here
    Profile.hasOne(models.VerificationToken, {
      as: 'verificationtoken',
      foreignKey: 'userId',
      foreignKeyConstraint: true,
    });
    Profile.hasOne(models.ResetPasswordVerificationToken, {
      as: 'resetPasswordverificationtoken',
      foreignKey: 'userId',
      foreignKeyConstraint: true,
    });
  };
  return Profile;
};