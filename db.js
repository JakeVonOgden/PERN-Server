

const Sequelize = require('sequelize');
const sequelize = new Sequelize("postgres://postgres:testingtesting123@localhost:5432/PERN-Project-database")


const db = new Sequelize(process.env.DB_CONNECTION_STRING, {
    dialect: 'postgres',
    ssl: process.env.ENVIRONMENT === 'production'
});

module.exports = db;