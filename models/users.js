const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    remember_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
  })
  users.init({
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};