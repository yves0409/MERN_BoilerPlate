const User = require('../models/userModel')

exports.signup = (req,res) => {
   // console.log('REQ.BODY ON SIGNUP',req.body);
     
   const {name,email,password} = req.body;

   //email here is req.body.email but we destructured up here, so it is User.findOne({email: req.body.email})
   User.findOne({email}).exec((err,user)=> {
       if(user){
           res.status(400).json({error:'Email is already taken'})
       }
   }) 
   
   const newUser = new User({name,email,password})

   newUser.save((err,succes)=> {
      if(err){
         console.log('SignUp failed',err)
         return res.status(400).json({
             error: err
         })
      }
      res.json({
          message: 'SignUp succesfull , please login'
      })
   })
}