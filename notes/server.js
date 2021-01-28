const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tasks = require('./routes/tasks');
const auth = require('./routes/auth.routes');
const todo_list = require('./models/Task');
const users = require('./models/users');
const db = require('./database/db');


//connect to db
db.authenticate().then(()=>{console.log('database connected')}).catch(err => {console.log("database connection failed")});

//syncing table with database
//todo_list.sync();
//users.sync();

var SERVER_PORT = 5000;

var app = express();

// adding middlewares
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Adding routes
app.use('/api',tasks);
app.use('/api',auth);

app.listen(SERVER_PORT, function(req,res){
   console.log(`Server successfully started at port ${SERVER_PORT}`);
})
