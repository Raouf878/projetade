const express=require('express');
const router=express.Router();
const {
    GetInfo,
    downloadPDF
}=require('../controllers/HomeController');
router.route('/:iduser/:unite').get(GetInfo);
router.route('/download/:id').post(downloadPDF)
module.exports=router;