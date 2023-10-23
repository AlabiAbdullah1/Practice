const {Router}= require('express')
const authController= require('../controllers/authcontroller')

const router= Router();

router.get('/login', authController.login_get)
router.post('/signup', authController.signup_post)


// router.get('/signup', authController.signup_get)
// router.post('/signup', authController.signup_post)
// router.get('/login', authController.login_get)
// router.post('/login', authController.login_post)
// router.get('/logout', authController.logout_get)
// router.get('/forgetpassword', authController.forgetpassword_get);
// router.post('/resetpassword', authController.resetpassword_post);

module.exports=  router;