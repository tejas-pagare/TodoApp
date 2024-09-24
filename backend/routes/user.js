const express = require('express');
const router = express.Router();

const { userLoginController, userSignUpController, getUserDetails } = require('../controllers/userController');

router.get("/userInfo",getUserDetails);
router.post('/signup',userSignUpController)
router.post('/login',userLoginController)

module.exports = router;