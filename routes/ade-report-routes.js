const express=require('express');
const router=express.Router();
const {
    GetReports,
    GetReportName,
    CreateReport,
    EndReport
}=require('../controllers/adeReportController.js');
router.route('/home/:iduser/:unite').get(GetReports);
router.route('/createReport/:iduser/:unite').get(GetReportName);
router.route('/create/:iduser/:unite').post(CreateReport);
router.route('/end-report/:iduser/:unite').post(EndReport);
module.exports=router;