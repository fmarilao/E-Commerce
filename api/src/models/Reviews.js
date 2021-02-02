const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("reviews", {
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rating: {
            type: DataTypes.ENUM("1", "2", "3", "4", "5")
        }
    })
}