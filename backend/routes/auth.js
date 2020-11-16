const express = require('express')
const router = express.Router()


//Import controllers
const {signup,accountActivation} = require('../controllers/auth');

//import validator
const {userSignupVal} = require('../validators/auth')  //used a middleware and passed in the router
const {runValidator} = require('../validators/index')  //used a middleware and passed in the router


router.post('/signup',userSignupVal,runValidator, signup)  //NOTE : second argument is the name of the controller
router.post('/account-activation', accountActivation)
module.exports = router 