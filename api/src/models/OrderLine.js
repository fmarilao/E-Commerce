const { DataTypes } = require('sequelize');

// Las ordenes deben tener línea de orden que contiene el precio, productId, y cantidad.

module.exports = (sequelize) => {
  sequelize.define('OrderLine', {
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,  
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};