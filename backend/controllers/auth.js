const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//sendgrid
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//signup without email confirmation 
// exports.signup = (req,res) => {
//    // console.log('REQ.BODY ON SIGNUP',req.body);
     
//    const {name,email,password} = req.body;

//    //email here is req.body.email but we destructured up here, so it is User.findOne({email: req.body.email})
//    User.findOne({email}).exec((err,user)=> {
//        if(user){
//            res.status(400).json({error:'Email is already taken'})
//        }
//    }) 
   
//    const newUser = new User({name,email,password})

//    newUser.save((err,succes)=> {
//       if(err){
//          console.log('SignUp failed',err)
//          return res.status(400).json({
//              error: err
//          })
//       }
//       res.json({
//           message: 'SignUp succesfull , please login'
//       })
//    })
// }\



// exports.signup = (req,res) => {
//     const {name,email,password} = req.body;

//     User.findOne({email}).exec((err,user)=> {
//                 if(user){
//                     res.status(400).json({error:'Email is already taken'})
//                }
//                const token = ({name,email,password},process.env.JWT_ACCOUNT_ACTIVATION,{expiresAt:'10m'})   
               
//                const emailData ={
//                    from:process.env.EMAIL_FROM,
//                    to:email,
//                    subject:`Account activation link`,
//                    html: `<p>Please use the following link to activate your account</p>
//                           <p>${process.env.CLIENT_URL}/auth/activate</p>
//                           <hr/>
//                           <p>${process.env.CLIENT_URL}</p>`

//                }
//                sgmail.send(emailData).then(sent => {
//                    console.log('SIGNUP EMAIL SENT',sent);
//                    return res.json({
//                         message: `Email has been sent to ${email}, Please follow instructions to activate your account`
//                    })
//                })
//            }) 

           
// }

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
