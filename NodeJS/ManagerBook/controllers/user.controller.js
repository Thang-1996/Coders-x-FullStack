// đặt tên cho các controller là các tên root dựa theo trang hoặc điều kiện sử lý của nó
const db = require('../db');
const shortid = require('shortid');
module.exports.create = function (req,res) {
    res.render('users/create');
};
module.exports.postCreate = function (req,res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
};
module.exports.view = function (req,res) {
    const id = req.params.id;
    const book = db.get('users').find({id:id}).value();
    res.render('users/view',{
        book:book
    });
};
module.exports.delete = function (req,res) {
    const id = req.params.id;
    db.get('users').remove({id:id}).write();
    res.redirect('/users');
};
module.exports.edit = function (req,res) {
    const id = req.params.id;
    const name = req.body.name;
    db.get('users').find({id:id}).assign({name:name}).write();
    res.redirect('/users');
};