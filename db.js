const {Sequelize} = require("sequelize")

const db = new Sequelize(process.env.DB_CONNECTION_STRING, {
    dialect: 'postgres',
    ssl: process.env.ENVIRONMENT === 'production'
});

module.exports = db;