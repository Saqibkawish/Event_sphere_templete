const express = require("express");

const router = express.Router();

const authControllers = require("../controllers/auth-controller");

const {signupSchema,loginSchema} = require("../validators/auth-validator.js");

const validate = require("../middlewares/validate-middleware.js");
const isAdmin = require('../middlewares/isAdmin-middleware');

router.route("/").get(authControllers.home);

// router.route("/register").post(authControllers.register);

// router.route("/login").post(authControllers.login);

router.route("/register").post(validate(signupSchema),authControllers.register);

router.route("/login").post(validate(loginSchema),authControllers.login);
router.post('/forgot-password', authControllers.forgotPassword);
router.post("/reset-password", authControllers.resetPassword);
router.get('/users', authControllers.getAllUsers); 
router.put('/users/:id', authControllers.updateUser ); // Update user route
router.delete('/users/:id', authControllers.deleteUser ); 
module.exports = router;