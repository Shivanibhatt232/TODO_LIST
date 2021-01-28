const User = require("../models/users");
const config = require("../database/auth");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        Email: req.body.Email,
        Password: bcrypt.hashSync(req.body.Password, 8)
    })
    res.send({ message: "User was registered successfully!" });
}

exports.signin = (req, res) => {
    User.findOne({
        where: {
            Email: req.body.Email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.Password,
                user.Password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.User_id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
             
            res.setHeader(
                "x-access-token" , token
            );
        
            return res.send({
                id: User.User_id,
                Email: User.Email,
                accessToken: token});
            
        })
        .catch (err => {
            res.status(500).send({ message: err.message });
        });
};