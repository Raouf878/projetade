const express=require('express');
const router=express.Router();
const {
    LoginUser,
    RegisterUser,
}=require("../controllers/loginController");
router.route("/signin").post(LoginUser);
router.route("/NewAccount").post(RegisterUser);
module.exports=router;

