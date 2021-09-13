const { DataTypes } = require("sequelize");
const db = require("../db");

const Shop = db.define("shop", {
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    Owner: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Image: {
        type: DataTypes.STRING,
        allowNull: true
    },

    Description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Shop;