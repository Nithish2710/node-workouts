const express = require('express');
const {userCreate, userDelete, userIndex, userUpdate, leaveType, leaveTypeCreate,leaveTypeUpdate, leaveTypeDelete, leaveApply, viewAllleaveApplications, viewLeaveForUser, logout, login, approveLeave, rejectLeave} = require('../controllers/leave_controllers.js');
const router = express.Router();

router.get('/', userIndex);

router.post('/users', userCreate);

router.put('/users/:id', userUpdate);

router.delete('/users', userDelete);

router.get('/leave-types', leaveType);

router.post('/leave-type-create', leaveTypeCreate);

router.put('/leave-type-update/:id', leaveTypeUpdate);

router.delete('/leave-type-delete', leaveTypeDelete);

//crete leave application
router.post('/leave-application',leaveApply);

router.get('/view-all-leave-applications', viewAllleaveApplications);

router.get('/view-leave-for-user/:userId', viewLeaveForUser);

router.post('/login',login);

router.get('/logout', logout);

router.put('/admin/approve/:id', approveLeave);

router.put('/admin/reject/:id', rejectLeave);

module.exports = router;