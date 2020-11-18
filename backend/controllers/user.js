const User = require('../models/userModel')

exports.read = (req,res) => {
   const userId = req.params.id

   User.findById(userId).exec((err,user)=> {
       if(err || !user) {
           return res.status(400).json({
               err: 'User not found'
           })
       }
       user.hashed_password = undefined,
       user.salt = undefined
       res.json(user)
   })
}

exports.update = (req,res) => {
    //console.log('Update user,req,user', req.user, 'Update data', req.body);
    const {name,password} = req.body

    User.findOne({_id: req.user._id},(err,user)=> {
       if(err || !user){
           return res.status(400).json({
               error: 'User not found'
           })
       }
       if(!name){
           return res.status(400).json({
               error:'Name is required'
           })
       } else {
           user.name = name
       }
       if(password) {
           if(password.length < 6){
               return res.status(400).json({
                   error: 'password has to be at least 6 characters'
               })
           } else {
               user.password = password
           }
       }
      user.save((err,updatedUser)=> {
          if(err) {
              console.log('Update user error',err);
            return res.status(400).json({
                error: 'Updating User unsuccesfull'
            })
          }
          user.hashed_password = undefined,
          user.salt = undefined
          res.json(updatedUser)
      })
    })
}