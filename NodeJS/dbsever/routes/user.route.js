var express = require('express');
var db = require('../db');
var shortid = require('shortid');
// require routes de chia nho cac routes ra
var router = express.Router();
module.exports = router;
// copy tat ca nhung router bat dau bang user router sang va thay doi router sang router tiep theo bo het cac users di cho con /
router.get('/',function (req,res) {
    var q = req.query.q; // tu khoa tim kiem se la value dung filter theo tu khoa do
    var matchedUsers = db.get('users').value().filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 // tra ve index neu nam trong string name filter // tuc la neu tim thay q la tu tim kiem trong string name thi se tra ve array moi chua thong tin user tuong ung
    });
    res.render('index',{
        users : matchedUsers
    });
    res.redirect('/');
});
//create use
router.get('/create',function (req,res) {
    res.render('create');
});
// su dung post de gui len
// thay doi de tao id tu dong kieu string khong can phai dung parseInt de doi sang int su dung shortid dung method generate toa ra unique id
router.post('/create',function (req,res) {
    req.body.id = shortid.generate(); // tao id ngau nhien de luu post vao file db.json
    // console.log(req.body); // request body de nhan duoc body request phai cai body-parser
    db.get('users').push(req.body).write(); // push object du lieu vua gui len vao users lay ra tu db.json va push len sever va ghi lai vao file
    res.redirect('/'); // quay tro lai 1 route cu the
});
// dinh nghia routes de gui request so với id
router.get('/:id',function (req,res) { // id: la 1 dang id la tuong uong voi moi id luu vao trong bien params id cuar parammeter
    var id = req.params.id;
    var user = db.get('users').find({ id: id}).value();// tim ra element dau tien co key = id
    res.render('view',{
        user : user
    });
}); // su dung param de thay cho id = 1 bang 1 cai bien la id khi gui request len param
router.get('/:id/delete',function (req,res) {
    var id = req.params.id;
    db.get('users').remove({id : id}).write();
    res.redirect('/');
});
// sua ten cua user 
router.post('/:id',function (req,res) {
    var id = req.params.id;
    var name = req.body.q;
    console.log(name);
    db.get('users').find({id : id}).assign({name : name}).write();
    res.redirect('/');
});