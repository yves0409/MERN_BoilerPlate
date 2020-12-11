const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const _ =require('lodash')

//sendgrid
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)



exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }

        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m' });
     

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Account activation link`,
            html: `
                <h1>Please use the following link to activate your account</h1>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
        };

        sgMail
            .send(emailData)
            .then(sent => {
                // console.log('SIGNUP EMAIL SENT', sent)
                return res.json({
                    message: `Email has been sent to ${email}. Follow the instruction to activate your account`
                });
            })
            .catch(err => {
                // console.log('SIGNUP EMAIL SENT ERROR', err,email)
                return res.json({
                    message: err.message
                });
            });
    });
};

exports.accountActivation = (req, res) => {
    const { token } = req.body;

    if(token) {
        jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION,function(err,decoded){
        if(err){
             console.log('JWT VERIFY account activation error',err)
             return res.status(401).json({
                 error: 'Expired link ,signup again'
             })
        }
        const {name,email,password} = jwt.decode(token)

        const user = new User({name,email,password})

        user.save((err,user)=> {
            if(err) {
                console.log('Save user in account activation failed ',err)
                return res.status(401).json({
                    error:'Error saving user,try signup again'
                })
            }
            return res.json({
                message:'SignUp succes! Please Signin'
            })

        })
    })
} else {
    return res.json({
        message:'Error occured. Please try again'
})
}
}



exports.signin =(req,res)=> {
    const {email,password} =req.body;

    //Check if user exists
    User.findOne({email}).exec((err,user)=> {
       if(err || !user){
           return res.status(400).json({
               error: 'Email does not exist! Please Signup'
           })
       }
       //Autheticate, authenticate method from the user model will compare
       if(!user.authenticate(password)){
        return res.status(400).json({
            error: 'Email and password do not match, pleae try again'
        })
       }
       //Generate a token and send to client
       const token =jwt.sign({_id : user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
       const {_id,name,email,role} = user;

       return res.json({token,user:{_id,name,email,role}})
    })
}

//middleware (included in the express package)
//It will compare the token and if it is valid it will provide us the req.user (all userunfo)
//The token is generated using the userid , secret and expiry
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
})

exports.adminMiddleware = (req,res,next) => {
    User.findById({_id:req.user._id}).exec((err,user)=> {
        if(err || !user){
            res.status(400).json({
                error: 'User not found'
            })
        }
        if(user.role !== 'admin'){
            res.status(400).json({
                error: 'No admin access'
            }) 
        }
        req.profile = user;
        next();
    })
}



exports.forgotPassword = (req,res) => {
    const {email} = req.body;

    User.findOne({email},(err,user)=> {
        if(err || !user){
            return res.status(400).json({
                error: 'No User with this email'
            })
        }
        const token = jwt.sign({_id : user._id}, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' });
     

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Password reset link`,
            html: `
                <h1>Please use the following link to reset your password</h1>
                <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
        };

        return user.updateOne({resetPasswordLink: token},(err,succes)=> {
            if(err){
                console.log('RESET PASSWORD LINK ERROR',err);
                return res.status(400).json({
                    error: 'Database connection error on request to forgot password'
                })
            }else {
                sgMail
                .send(emailData)
                .then(sent => {
                    // console.log('SIGNUP EMAIL SENT', sent)
                    return res.json({
                        message: `Email has been sent to ${email}. Follow the instruction to activate your account`
                    });
                })
                .catch(err => {
                    // console.log('SIGNUP EMAIL SENT ERROR', err,email)
                    return res.json({
                        message: err.message
                    });
                });
            }
        })
    })
}

exports.resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err, decoded) {
            if (err) {
                return res.status(400).json({
                    error: 'Expired link. Try again'
                });
            }

            User.findOne({ resetPasswordLink }, (err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        error: 'Something went wrong. Try later'
                    });
                }

                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: ''
                };

                user = _.extend(user, updatedFields);

                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'Error resetting user password'
                        });
                    }
                    res.json({
                        message: `Great! Now you can login with your new password`
                    });
                });
            });
        });
    }
};
