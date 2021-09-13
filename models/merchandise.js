const { DataTypes } = require("sequelize");
const db = require("../db");

const Merchandise = db.define("merchandise", {
    Category: {
        type: DataTypes.STRING,
        allowNull: false
    },

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
    },

    Price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    Favorited: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
});

module.exports = Merchandise;