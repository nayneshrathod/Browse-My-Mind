const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/emp',jwtHelper.verifyJwtToken, ctrlUser.showEmployee);
router.post('/addemp',jwtHelper.verifyJwtToken, ctrlUser.addEmployee);
router.put('/editemp/:id',jwtHelper.verifyJwtToken, ctrlUser.editEmployee);
router.delete('/delemp/:id',jwtHelper.verifyJwtToken, ctrlUser.delEmployee);

module.exports = router;



