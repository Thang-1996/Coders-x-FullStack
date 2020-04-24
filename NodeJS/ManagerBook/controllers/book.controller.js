const db = require('../db');
const shortid = require('shortid');
module.exports.index = function (req,res) {
    res.render('books/index',{
        books : db.get('books').value()
    });
};
module.exports.create = function (req,res) {
    res.render('books/create');
};
module.exports.postCreate = function (req,res) {
    req.body.id = shortid.generate();
    // lam validate
    // tao arrray chua cac errror de push vao cac error string
    console.log(res.locals);
    db.get('books').push(req.body).write();
    res.redirect('/books');
};
module.exports.view = function (req,res) {
    const id = req.params.id;
    const book = db.get('books').find({id:id}).value();
    res.render('books/view',{
        book:book
    });
};
module.exports.delete = function (req,res) {
    const id = req.params.id;
    db.get('books').remove({id:id}).write();
    res.redirect('/books');
};
module.exports.edit = function (req,res) {
    const id = req.params.id;
    const title = req.body.title;
    db.get('books').find({id:id}).assign({title:title}).write();
    res.redirect('/books');
};