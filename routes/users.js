const express =require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/user_controller');
router.get('/profile',usersController.profile);
//now we need to connect it to index.js root
router.get('/sign-up',usersController.signup);
router.get('/sign-in',usersController.signin);
router.post('/create',usersController.create);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);
module.exports=router; // router is constant in respected file therefore we used in injex.js and here .

 