const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
    },
    gender: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    phone: {
      type: DataTypes.STRING,
    },
    recoveryId: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING
    }
  });
};
