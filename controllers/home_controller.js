const Post = require('../models/post');
module.exports.home =function(req,res)
{
    //res.end('<h1>Express is up for CODEIAL!!</h1>');
    // Post.find({},function(err,posts){
      
    //     return res.render('home',{
    //         title:"Codeial | Home",
    //         posts: posts
    //  });
    // });

    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts)
    {
        return res.render('home',{
            title:"Codeial | Home",
            posts: posts
    });
});

  
}