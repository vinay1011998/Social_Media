const express = require('express');//doesnt create new instance of express,same instance is passed on 
const router = express.Router(); //route handler
const homeController = require('../controllers/home_controller');

//To check whether route was loaded or not.console.log("Router Loaded");
//console.log("Router Loaded1");
router.get('/',homeController.home);
//console.log("Router Loaded2");
router.use('/users',require('./users')); 
//This sayd whenever routes index.js is called and it says it need users.js it directs to the user.js wen route  is /users
//any other route eg / will redirect to line 7 when req comes with users it requires users route.and redirects to users.js.
router.use('/content',require('./post'));  //http://localhost:8000/content/post
module.exports=router; //to export it and make it available to root index.js file.

