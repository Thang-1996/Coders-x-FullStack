const db = require('../db');
const shortid = require('shortid');
module.exports.create = function (req,res) {
    res.render('trans/create',{
        users: db.get('users').value(),
        books: db.get('books').value()
    })
};
module.exports.postCreate = function (req,res) {
    req.body.id = shortid.generate();
    db.get('trans').push(req.body).write();
    res.redirect('/trans');
};
module.exports.getComplete = function(req,res) {
    const id = req.params.id;
    db.get('trans').find({id:id}).assign({isComplete:true}).write();
    res.redirect('/trans');
};