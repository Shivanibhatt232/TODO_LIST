const Sequelize = require('sequelize');
const db = require('../database/db');

const todo_list = db.define('todo_list',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        User_id:  {
            type: Sequelize.INTEGER,
            references: 'users', 
            referencesKey: 'User_id'
        }
    },
    {
        freezeTableName: true,
    },
    {
        timestamps: false
    }
)
module.exports = todo_list;