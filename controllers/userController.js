const router = require("express").Router(); 
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { UserModel } = require("../models");

module.exports = router;