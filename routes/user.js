const express = require("express")
const router = express.Router();

const {Signup,login}  = require('../Controllers/auth')

const {auth,Isadmin,IsUser,IsManager} = require("../middlewares/mid");
  


const {createTask,Updatetasks,DeleteTasks,getAllTasks} = require("../Controllers/taskController");



router.post('/login',login);
router.post('/Signup',Signup); 
router.get()

router.post('/tasks',createTask);
router.get('/tasks',getAllTasks);
router.put('/tasks/:id', Updatetasks);
router.delete('/tasks/:id', DeleteTasks);






// Protected route

router.get("/test",auth,(req,res) => {
  res.json({
    success:true,
    message:"Welcome to the  Protected route for  Tests"
  })
})

router.get('/manager',auth, IsManager, (req,res) => {
  res.json({
    success:true,
    message:"Hello Manager"
  })  

})

router.get('/admin',auth, Isadmin, (req,res) => {
  res.json({
    success:true,
    message:"Hello Admin"
  })  

})

router.get('/user',auth, IsUser, (req,res) => {
  res.json({
    success:true,
    message:"Hello User"
  })  

})

module.exports =  router;

