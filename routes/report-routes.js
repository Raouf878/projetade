const express=require('express');
const router=express.Router();
const {
    GetReports,
    GetTeamName,
    CreateUser,
    DeleteUser
}=require('../controllers/ReportController');
router.route('/:iduser/:unite').get(GetReports);
router.route('/Create/:iduser/:unite').post(CreateUser);
router.route('/Delete/:iduser/:unite/:idteam').delete(DeleteUser);
router.route('/Team/:iduser/:unite').get(GetTeamName);
module.exports=router;