const User= require('../model/user')
const jwt= require('jsonwebtoken')
const cookie= require('cookie-parser')
const { transporter } = require('../nodemailerconfig')

// handle errors:
const handleErrors= (err)=>{
    console.log(err.message, err.code)
    let errors= {name:'',email:'', password: '', passwordconfirm: ''}

    // Incorrect Email:
    if(err.message=== 'Incorrect Email'){
        errors.email="That email is not registered"
    }

     // Incorrect Password:
     if(err.message=== 'Incorrect password'){
        errors.password="That password is incorrect"
    }

    // If password does not match:
    if(err.message === "Password not match!"){
        errors.passwordconfirm='Your password does not match!'
    }

    // Duplicate Error Code:
    if(err.code=== 11000){
        errors.email="This Email already exists!"
        // return errors
    }

    // validation errors:
    if(err.message.includes('user validation failed')){
        (Object.values(err.errors)).forEach(({properties})=>{
            errors[properties.path]= properties.message
        })
    }
    return errors
}

// // JWT:
//     const maxAge= 3*24*60*60 //3 Days:
//     const forgetMax=3*60*60
//     const createToken= (id)=>{
//         return jwt.sign({ id}, 'secret license', {
//             expiresIn: maxAge
//         });
//     }

//     // NB: 'secret license' is like my jwt password

// module.exports.signup_get= function(req, res){
//     res.render('signup')
// }

// module.exports.login_get= function(req, res){
//     res.render('login')
// }

// module.exports.signup_post= async function(req, res){
//     const {username, email, password} =req.body
//     try{
//        const user= await User.create({username,email, password});
//        const token= createToken(user._id)
//        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge *1000})
//        res.status(200).json({user: user._id});
//     }
//     catch(err){
//        const errors=  handleErrors(err)
//         res.status(400).json({errors})
//     }
// }

// module.exports.login_post=async function(req, res){
//     const { email, password} = req.body;
//     try {
//         const user= await User.login(email,password);
//         const token= createToken(user._id)
//         res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge *1000})
//         res.status(200).json({user: user._id})
//     } catch (err) {
//         const errors=handleErrors(err)
//         res.status(400).json({errors})
//     }
// }

// module.exports.logout_get=(req, res)=>{
//     res.cookie('jwt', '', {maxAge: 1 });
//     res.redirect('/')
// }

// module.exports.forgetpassword_get= (req, res)=>{
//     res.render('forget');
// }

// module.exports.resetpassword_post= (req, res)=>{
//     const email=req.body.email;
//     // check if the email entered is in the db
//     User.findOne({email}), (err, result)=>{
//         if(err){
//             console.log('')
//         }
//         if(result){
//             const token= jwt.sign({email}, 'secret license', {
//                 expiresIn:forgetMax
//             })
//             sendEmail(email, token)
//         }else{
//             res.status(400).send('User not found');
//         }
//     }
//     function sendEmail(email, token){
//         const mailOption={
//             from:'sikeabdulnig@gmail.com',
//             to:email,
//             subject:'Passwoerd reset Request', 
//             text: `${req.url}/resetpassword/${token}`
//         }
//         transporter.sendEmail(mailOption, (error, info)=>{
//             if(error){
//                 console.log(error);
//             }else{
//                 console.log('Email sent' + info.res)
//             }
//         })
//     }
//     res.status(200).json(token)
// }


exports.login_get= (req, res)=>{
    res.status(200).send('Hello!')
}

exports.signup_post=async (req, res)=>{
    try {
        const user= await User.create(req.body)
        res.status(201).send(user)
    } catch (err) {
        const errors=  handleErrors(err)
        res.status(400).json({errors})
    }
}