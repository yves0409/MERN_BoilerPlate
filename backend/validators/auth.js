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