const express = require('express');
const app =express();
const port = 8000;

//Use express router from router folders index.js

app.use('/',require('./routes')); //middleware used when a server starts(before) it need to access this route.
app.set('view engine', 'ejs');
app.set('views','./views');


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