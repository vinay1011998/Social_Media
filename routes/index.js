const express = require('express');//doesnt create new instance of express,same instance is passed on 
const router = express.Router(); //route handler
const homeController = require('../controllers/home_controller');

//To check whether route was loaded or not.console.log("Router Loaded");
//console.log("Router Loaded1");
router.get('/',homeController.home);
//console.log("Router Loaded2");
module.exports=router; //to export it and make it available to root index.js file.

