const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

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

        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '24h' });

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
