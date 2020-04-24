const express =require('express');
const router = express.Router();
const controller = require('../controllers/book.controller');
const validate = require('../validate/book.validate'); // required validate vao
module.exports = router;
router.get('/',controller.index);
router.get('/create',controller.create); // thay controller vao lam callback function
router.post('/create',validate.postCreate,controller.postCreate); // chen validate vao truoc khi postcreate
router.get('/:id',controller.view);
router.get('/:id/delete',controller.delete);
router.post('/:id',controller.edit);

