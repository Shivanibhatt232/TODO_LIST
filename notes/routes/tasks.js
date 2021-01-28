const express = require('express');
const router = express.Router();
const Tasks = require('../models/users');
const Task = require('../models/Task');
const {authJwt} = require("../middlewares");


router.get('/tasks', authJwt.verifyToken,
    function(req,res){
        Task.findAll({
            where: {
                User_id: req.id
            }
        })
            .then(tasks => {
                res.json(tasks)
            })
            .catch(err => {
                res.send('error: ' + err)
            })
    }

);

router.delete('/task/:id',authJwt.verifyToken, function (req, res) {
    Task.findOne({
                where: { 
                    id: req.params.id
                    
                }
            }).then((task) => {
                console.log(task,task.id)
                if(task.id == req.params.id){
                    Task.destroy({
                        
                        where: {
                            
                            id: req.params.id
                        }
                    }).then(() => {
                            console.log("deleted");
                            res.json({ status: 'Task Deleted!' })
                    }).catch(err => {
                            res.send('error:' + err)
                    })

                }
                else{
                    res.status(403).send({"message":"Access Denied"})
                }
            }
             ).catch(err => {
                 res.json({status:'Task not found'})
             }) 
})

router.post('/task',authJwt.verifyToken, function (req, res, next) {
    
    if (!(req.body.title && req.body.description)) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    }
    else {
        
        Task.create(
            { title: req.body.title, description: req.body.description, User_id: req.id }
            
        )
            .then(() => {
                res.json({ status: 'Task Updated!' })
            })
            .catch(err => {
                res.send('error:' + err)
            })
    }
})

module.exports = router;