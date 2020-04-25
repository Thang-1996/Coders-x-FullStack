const express =require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');
module.exports = router;
// function middleware1(req,res,next){
// //     console.log('midderware1');
// //     next(); //  se chuyen sang request tiep theo
// // }
// // function middleware2(req,res,next){
// //     console.log('midderware2');
// //     res.send('Hello'); //khi goi res.send la se ket thuc request va khong thuc hien cac middleware o sau
// // }
// // router.get('/test',middleware1, middleware2);
// test cookie
// router.get('/cookie', function (req,res,next) {
//     res.cookie('user-id',12345); // gui cookie len va brower se luu lai  se co 1 thoi gian ton tai vi dieu kien bao mat thuong se luu ve database
//     res.send('hello');
// });
router.get('/',controller.index); //  se check xem da login thanh cong hay chua cookie da duoc gui len hay chua thi moi dc vao trang user
router.get('/create',controller.create); // thay controller vao lam callback function
router.post('/create',validate.postCreate,controller.postCreate);
router.get('/:id',controller.view);
router.get('/:id/delete',controller.delete);
router.post('/:id',controller.edit);
// tao 1 router de test middelware

