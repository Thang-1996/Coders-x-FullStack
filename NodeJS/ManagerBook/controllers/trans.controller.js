const db = require('../db');
const shortid = require('shortid');
module.exports.index = function (req,res) {
    res.render('trans/index',{
        trans : db.get('trans').value()
    })
};
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
    var errors = [];
    if(!req.params.id){
        errors.push('ID khong ton tai');
    }
    if(errors.length){
        res.render('trans/create',{
            errors : errors
        });
        return;
    }
    const id = req.params.id;
    db.get('trans').find({id:id}).assign({isComplete:true}).write();
    res.redirect('/trans');
};
module.exports.delete = function(req,res){
    const id = req.params.id;
    db.get('trans').remove({id:id}).write();
    res.redirect('/trans');
};