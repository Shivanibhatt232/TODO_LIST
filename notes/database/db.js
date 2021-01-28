const Sequelize = require('sequelize');

module.exports = new Sequelize('notes','root','',{
    host: 'localhost',
   dialect: 'mysql',
   define: {
        timestamps: false
    }
});

