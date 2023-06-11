const express=require('express');
const router=express.Router();
const {
    GetInfo,
}=require('../controllers/HomeController');
router.route('/:iduser/:unite').get(GetInfo);
module.exports=router;