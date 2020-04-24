
var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var userRouter = require('./routes/user.route');
app.set('view engine','pug');
app.set('views','./views');
// tao 1 array data
//use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend :true}));
app.get('/',function (req,res) {
   res.render('index',{
       users : db.get('users').value() // get value tu user lay ra tu db.json
   })
});
// su dung app.use de paste router vao la bat dau bang user hay la cai gi do
app.use('/users',userRouter);
app.listen(port,function () {
    console.log('sever is running');
});
