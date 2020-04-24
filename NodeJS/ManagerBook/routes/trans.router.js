const express =require('express');
const router = express.Router();
const controller = require('../controllers/trans.controller');
module.exports = router;
router.get('/create',controller.create); // thay controller vao lam callback function
router.post('/create',controller.postCreate);
router.get('/:id/isComplete',controller.getComplete);

