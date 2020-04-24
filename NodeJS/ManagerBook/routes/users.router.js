const express =require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
module.exports = router;
router.get('/create',controller.create); // thay controller vao lam callback function
router.post('/create',controller.postCreate);
router.get('/:id',controller.view);
router.get('/:id/delete',controller.delete);
router.post('/:id',controller.edit);

