const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');
const bodyParser = require('body-parser');
const booksRouter = require('./routes/books.router');
const usersRouter = require('./routes/users.router');
const transRouter = require('./routes/trans.router');
// mô hình mvc sẽ tách rieng file router và các hàm xử lý ra 1 controller riêng các hàm function callback xử lý sẽ được tách riêng ra file controller
app.set('view engine','pug');
app.set('views','./views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend :true}));
app.listen(port,function () {
    console.log('Sever is running on port'+port)
});
app.get('/',function (req,res) {
    res.send('<a href="/books">BooksList</a>'+'    |     '+'<a href="/users">UsersList</a>'+'      |       '+'<a href="/trans">Transactions List</a>');
});
app.get('/books',function (req,res) {
    res.render('books/index',{
        books : db.get('books').value()
    });
});
app.get('/users',function (req,res) {
    res.render('users/index',{
        users : db.get('users').value()
    });
});
app.get('/trans',function (req,res) {
    res.render('trans/index',{
        trans : db.get('trans').value()
    })
});
app.use('/books',booksRouter);
app.use('/users',usersRouter);
app.use('/trans',transRouter);
app.use(express.static('public')); // khai bao de access cac file trong thu muc public