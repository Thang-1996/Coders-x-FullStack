// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend :true}));
// var todos =  ['Đi chợ','Nấu Cơm','Học Tại Codersx']
// https://expressjs.com/en/starter/basic-routing.html
app.get('/',function(req,res){
    res.render('index',{
        todos : db.get('todos').value()
    });
});

app.get('/todos',function(req,res){
    var q = req.query.q;
    var matchedTodos = db.get('todos').value().filter(function(todo){
        return todo.text.toLowerCase().indexOf(q.toLowerCase()) !== -1
    });
    res.render('index',{
        todos : matchedTodos
    });
});
app.post('/todos/create',function(req,res){
    db.get('todos').push(req.body).write();
    res.redirect('/');
});
// listen for requests :)
// app.listen(process.env.PORT, () => {
//     console.log("Server listening on port " + process.env.PORT);
// });
app.listen(port,function () {
    console.log('sever is running');
});

