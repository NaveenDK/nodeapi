const User = require("../models/user");

exports.userById= (req,res,next, id)=>{
    User.findbyId(id).exec((err, user)=>{
        if( err || !user){
            return res.status(400).json({
                    error:"User not found"
            })
        }

        req.profile = user//adds 
        next()

    })
}

exports.hasAuthorization= (req,res,next)=>{
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id

    if(!authorized){
        return res.status(403).json({
            error:"User is not authorized to perform this action"
        })
    }

}

exports.allUsers= (req,res)=>{
    User.find((err,users)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }

        res.json({ users: users})

    }).select("name email updated created")
}