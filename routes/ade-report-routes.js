const express=require('express');
const router=express.Router();
const {
    GetReports,
    GetReportName,
    CreateReport,
    EndReport,
    DeleteReport,
    GetReportForUpdate,
    ReportUpdate
}=require('../controllers/adeReportController.js');
router.route('/home/:iduser/:unite').get(GetReports);
router.route('/createReport/:iduser/:unite').get(GetReportName);
router.route('/create/:iduser/:unite').post(CreateReport);
router.route('/verify/:iduser/:unite').post(GetReportForUpdate);
router.route('/update').post(ReportUpdate);
router.route('/end-report/:iduser/:unite').post(EndReport);
router.route('/delete-report/:iduser/:unite').delete(DeleteReport);
module.exports=router;