const express =require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
module.exports = router;
router.get('/login',controller.login);
router.post('/login',controller.postLogin);