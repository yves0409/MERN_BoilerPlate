const {check } = require('express-validator')

exports.userSignupVal = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
    check('email')
    .isEmail()
    .withMessage('Provide a valid email'),
    check('password')
    .isLength({min : 6})
    .withMessage('Password must have at least 6 characters'),

]

exports.userSigninVal = [
   check('email')
    .isEmail()
    .withMessage('Provide a valid email'),
    check('password')
    .isLength({min : 6})
    .withMessage('Password must have at least 6 characters'),

]

exports.forgotPasswordVal = [
    check('email')
    .not()
    .isEmpty()
     .isEmail()
     .withMessage('Provide a valid email'),
   ]

   exports.resetPasswordVal = [
    check('newPassword')
    .not()
    .isEmpty()
     .isLength({min: 6})
     .withMessage('Password must have at least 6 characters'),
   ]