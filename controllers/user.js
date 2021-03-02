const _ = require('lodash');
const formidable = require('formidable')
const  fs = require('fs')
const User = require("../models/user");


exports.userById= (req,res,next, id)=>{
    User.findById(id)
    //populate followers and following users array
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec((err, user)=>{
        if( err || !user){
            return res.status(400).json({
                    error:"User not found"
            })
        }

        req.profile = user;//adds 
      //  console.log(req);
        console.log(req.profile);
        next();

    })
}

exports.hasAuthorization= (req,res,next)=>{
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id

    if(!authorized){
        return res.status(403).json({
            error:"User is not authorized to perform this action"
        })
    }
  next();
}

exports.allUsers= (req,res)=>{
    User.find((err,users)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
            
        res.json(users)

    }).select("name email updated created")
}


exports.getUser = (req,res) =>{
    req.profile.hashed_password= undefined;
    req.profile.salt = undefined;


    return res.json(req.profile);   
}


// exports.updateUser = (req,res,next) =>{
//     let user = req.profile
//     user = _.extend(user,req.body)  //

//     user.updated = Date.now()

//     user.save((err)=>{
//         if(err){
                
//             return res.status(400).json({
//                 error: "You are not authorized to perform this action"
//             })

//         }
//         user.hashed_password = undefined;
//         user.salt = undefined;
//         res.json({user})

//         })


// }

exports.updateUser = (req,res,next)=>{

    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err, fields,files)=>{
        if(err){
            return res.status(400).json({
                error:"Photo could not be uploaded"
            })
        }
        //save the user
        let user = req.profile 
        user = _.extend(user,fields)
        user.updated = Date.now()

        if(files.photo){
            user.photo.data = fs.readFileSync(files.photo.path)
            user.photo.contentType =  files.photo.type
        }

        user.save((err, result)=>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            user.hashed_password = undefined
            user.salt = undefined
            res.json(user)

        })


    })

}


exports.userPhoto =(req,res,next)=>{
    if(req.profile.photo.data){
        res.set("Content-Type",req.profile.photo.contentType);
        return res.send(req.profile.photo.data);

    }
    next();
}

exports.deleteUser = (req,res,next)=>{
    let user = req.profile;

    user.remove((err,user)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({message: "User deleted successfully"});

    });
}


//follow unfollow

exports.addFollowing = (req,res,next)=>{
    User.findByIdAndUpdate(req.body.user_Id, {
        $push:{following: req.body.follow_Id}
    },
    (err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        next();
    }

    )
}



// exports.addFollower= (req,res )=>{
//     User.findByIdAndUpdate(req.body.followId, {
//         $push:{followers: req.body.user_Id}
//     },
//              {new : true}
//     )
//     .populate('following', '_id name')
//     .populate('followers', '_id name')
//     .exec((err,result)=>{
//         if(err){
//             return res.status(400).json({
//                 error:"This is an error "
//             })
//         }
//         result.hashed_password= undefined;
//         result.salt = undefined;
//         res.json(result)


//     })

// }
//Remove following

exports.addFollower = (req, res) => {
    User.findByIdAndUpdate(req.body.follow_Id, { $push: { followers: req.body.user_Id } }, { new: true })
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec((err, result) => {
            console.log("result " , result);
            console.log(" req.params.follow_id " , req.params.follow_Id);
            console.log(" req.body.user_Id " , req.body.user_Id);
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            res.json(result);
        });
};






exports.removeFollowing = (req,res,next)=>{
    User.findByIdAndUpdate(req.body.userId, {
        $pull:{following: req.body.unfollowId}
    },
    (err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        next();
    }

    )
}


//remove follower

exports.removeFollower= (req,res )=>{
    User.findByIdAndUpdate(req.body.unfollow_Id, {
        $pull:{followers: req.body.user_Id}
        //{new:true}
    },
             {new : true}
    )
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec((err,result)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        result.hashed_password= undefined
        result.salt = undefined;
        res.json(result)
        

    })

}
