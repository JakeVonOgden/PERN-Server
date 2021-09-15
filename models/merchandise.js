const { DataTypes } = require("sequelize");
const db = require("../db");

const Merchandise = db.define("merchandise", {
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    image: {
        type: DataTypes.STRING,
        allowNull: true
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    owner: {
        type: DataTypes.STRING,
        allowNull: false
    },
 },
    {
        freezeTableName: true,
        tableName: "Merchandises"
    }
);

module.exports = Merchandise;