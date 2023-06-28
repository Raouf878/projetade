const express=require('express');
const router=express.Router();
const {
    CreateProduct,
    GetProduct,
    DeleteProduct,
    UpdateProduct
}=require('../controllers/adeSellerController.js');
router.route('/create/').post(CreateProduct);
router.route('/seller/:id/:unit/').get(GetProduct);
router.route('/delete/:id/').delete(DeleteProduct)
router.route('/update/:id/').post(UpdateProduct)
module.exports=router;