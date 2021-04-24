const express = require('express');
const app =express();
const port = 8000;


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