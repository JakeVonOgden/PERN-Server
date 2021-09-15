const Sequelize = require('sequelize');
const sequelize = new Sequelize("postgres://postgres:testingtesting123@localhost:5432/PERN-Project-database")

module.exports = sequelize;