const db = require('../database/db');
const User = require('../models/users');

checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        where: {
            Email: req.body.Email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }
        next();
    }).catch(err => {
        res.send('error:' + err)
    })

};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;