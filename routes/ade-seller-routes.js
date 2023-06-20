const express=require('express');
const router=express.Router();
const {
    CreateProduct,
    GetProduct
}=require('../controllers/adeSellerController.js');
router.route('/create/').post(CreateProduct);
router.route('/seller').get(GetProduct);

module.exports=router;