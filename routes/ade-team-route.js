const express=require('express');
const router=express.Router();
const {
    getTeamreport,
    getMaterialInc,
    postReportStatus,
    postReportStatusEnd
}=require('../controllers/adeTeamController.js');
router.route('/home/:iduser/:unite').get(getTeamreport);
router.route('/home/start/:id').post(postReportStatus);
router.route('/home/end/:id').post(postReportStatusEnd);
router.route('/incident-material/:incident').get(getMaterialInc);

module.exports=router;