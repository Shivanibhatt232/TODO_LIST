const Sequelize = require('sequelize');
const db = require('../database/db');
const todo_list = require('./Task')

const users = db.define('users',
    {
        User_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        Email: {
            type: Sequelize.STRING
        },
        Password: {
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true,
    },
    {
        timestamps: false
    }
)
module.exports = users;