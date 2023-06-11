const express=require('express');
const router=express.Router()
const {
    getMarkers
}=require('../controllers/mapController')
router.route('/:iduser/:unite').get(getMarkers)
module.exports=router;