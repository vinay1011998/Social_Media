const passport = require('passport');

const LocalStrategy= require('passport-local').Strategy;

const User = require('../models/user');
//Authentication using passport
passport.use(new LocalStrategy({

    usernameField:'email',
    passReqToCallback: true
    
},
    function(req,email,password,done)
    {
        //find user and establish identity
        User.findOne({email:email},function(err,user)
        {
            if(err)
            {
                //console.log('Error in finding user --> Passport');
                req.flash('error',err);
                return done(err);

            }
            if(!user||user.password !=password)
            {
               //console.log('Invalid Username/Password');
               req.flash('error','Invalid Username and Password');
                return done(null,false);
            }
            return done(null,user);
        });
    }
));

//Serialize the user to decide which key is to be kept in cookie

passport.serializeUser(function(user,done)
{
  done(null,user.id);
});
//deserialize the user from the key int the cookie

passport.deserializeUser(function(id,done)
{
    User.findById(id,function(err,user)
    {
        if(err)
        {
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null,user);
    });
});


//check user if authenticated
passport.checkAuthentication= function(req,res,next)
{
    //if user is signed in then pass on the req to the next function which is my controllers action
    if(req.isAuthenticated())
    {
        return next();
    }
    //if user is not signed in 
    return  res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        //req.user contains current signed in user in session cookie and we are just sending this to the locals for views

        res.locals.user=req.user;

    }
    next();
}