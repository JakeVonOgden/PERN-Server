const validateJwt = require("./validate-jwt");

module.exports = {
    CORS: require("./headers"),
    validateSession: require("./validate-jwt")
}