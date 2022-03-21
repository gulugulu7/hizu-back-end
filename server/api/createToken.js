const jwt = require('jsonwebtoken');
module.exports = function(user_id) {
    const token = jwt.sign({ user_id: user_id }, 'hizu', {
        expiresIn: '720000s'
    });
    return token;
};