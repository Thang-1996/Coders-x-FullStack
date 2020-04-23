
var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var shortid = require('shortid');
db = low(adapter);
db.defaults({ users: [] }).write();
app.set('view engine','pug');
app.set('views','./views');
// tao 1 array data
//use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend :true}));

// var users = [
//     {id : 1, name : 'thang'},
//     {id : 2, name : 'tuan'}
// ];
app.get('/',function (req,res) {
   res.render('index',{
       users : db.get('users').value() // get value tu user lay ra tu db.json
   })
});
app.get('/users',function (req,res) {
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
app.get('/users/create',function (req,res) {
    res.render('create');
});
app.get('/users/update',function (req,res) {
    res.render('update');
});
// su dung post de gui len
// thay doi de tao id tu dong kieu string khong can phai dung parseInt de doi sang int su dung shortid dung method generate toa ra unique id
app.post('/users/create',function (req,res) {
    req.body.id = shortid.generate(); // tao id ngau nhien de luu post vao file db.json
    // console.log(req.body); // request body de nhan duoc body request phai cai body-parser
    db.get('users').push(req.body).write(); // push object du lieu vua gui len vao users lay ra tu db.json va push len sever va ghi lai vao file
    res.redirect('/'); // quay tro lai 1 route cu the
});
// dinh nghia router de gui request so với id
app.get('/users/:id',function (req,res) { // id: la 1 dang id la tuong uong voi moi id luu vao trong bien params id cuar parammeter
    var id = req.params.id;
    var user = db.get('users').find({ id: id}).value();// tim ra element dau tien co key = id
    res.render('view',{
        user : user
    });
}); // su dung param de thay cho id = 1 bang 1 cai bien la id khi gui request len param
app.get('/users/:id/delete',function (req,res) {
    var id = req.params.id;
    db.get('users').remove({id : id}).write();
    res.redirect('/');
});
app.get('/users/:id/update',function (req,res) {
    var id = req.params.id;
    var q = req.query.q;
    db.get('users').find({id : id}).assign({name : q}).write();
    res.redirect('/');
});
app.listen(port,function () {
    console.log('sever is running');
});
