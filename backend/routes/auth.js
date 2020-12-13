const express = require('express')
const router = express.Router()


//Import controllers
const {signup,accountActivation,signin,forgotPassword,resetPassword,googleLogin} = require('../controllers/auth');

//import validator
const {userSignupVal,userSigninVal,forgotPasswordVal,resetPasswordVal} = require('../validators/auth')  //used a middleware and passed in the router
const {runValidator} = require('../validators/index')  //used a middleware and passed in the router


router.post('/signup',userSignupVal,runValidator, signup)  //NOTE : second argument is the name of the controller
router.post('/account-activation', accountActivation)
router.post('/signin',userSigninVal,runValidator, signin)
//forgot and reset password route
router.put('/forgot-password', forgotPasswordVal,runValidator,forgotPassword)
router.put('/reset-password', resetPasswordVal,runValidator,resetPassword)
//social login
router.post('/google-login',googleLogin)





module.exports = router 