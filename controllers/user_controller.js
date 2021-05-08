module.exports.profile=function(req,res)
{
    res.render('user_profile',{title:"User Profile"});
    //res.end('<h1>User Profile</h1>');
}

//render sign up page
module.exports.signup = function(req,res)
{
    return res.render('user_sign_up',{title:"Codeial | Sign Up"})
}
//render sign in page
module.exports.signin = function(req,res)
{
    return res.render('user_sign_in',{title:"Codeial | Sign In"})
}

//get the signup data 
module.exports.create = function(req,res)
{
    
}
//sign in and create session for user 
module.exports.createSession = function(req,res)
{

}