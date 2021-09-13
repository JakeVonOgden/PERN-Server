const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:Rocket39@localhost:5432/PERN-Project-database")

module.exports = sequelize;