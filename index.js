const express = require('express');
const cookieParser = require('cookie-parser');
const app =express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const db =require('./config/mongoose');
//used for session cookie
const session = require('express-session');

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
   src:'./assets/scss',
   dest:'./assets/css',
   debug:true,
   outputStyle:'extended',
   prefix:'/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));


//Put it before routes bcoz in routes those views are going to be rendered for that you need to tell the all views that to be rendered belong to some sort of layout.
app.use(expressLayouts);  

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.set('view engine', 'ejs');
app.set('views','./views');
//mongo store is used to store session cookie in DB 


app.use(session({
    name:'codeial',
    secret:"blahsomething",
    saveUninitialized:false,
    resave:false,
    cookie:{maxAge:(1000 * 60 * 100)},
    store:new MongoStore(
        {
       
        mongooseConnection:db,
        autoRemove:'disabled'
        },
        function(err)
        {
            console.log(err||'connect-mongodb setup -ok');
        }
    )
}));


app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);


app.use(flash());
app.use(customMware.setFlash);

//Use express router from router folders index.js

app.use('/',require('./routes')); //middleware used when a server starts(before) it need to access this route.

app.listen(port,function(err)   //listen to requests on port 8000
{
    if(err)
    { 
        console.log(`Error:${err}`);   //Interpolation using backticks
    }
    else
    {
        console.log(`Server running on port:${port}`);

    }
});