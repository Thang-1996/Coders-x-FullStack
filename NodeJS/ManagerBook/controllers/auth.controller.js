const db = require('../db');
module.exports.login = function (req,res) {
    res.render('auth/login');
};
module.exports.postLogin = function (req,res) {
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('users').find({email : email}).value();
    if(!user) {
        res.render('auth/login',{
            errors : [
                'Use does not exits.'
            ],
            values : req.body
        });
        return;
    }
    if(user.password !== password){
        res.render('auth/login',{
            errors : [
                'Wrong password.'
            ]
        });
        return;
    }
    res.cookie('userId', user.id);
    if(!user.isAdmin){
        var trans = db.get('trans').filter({userID : req.cookies.userId}).value();
        res.render("trans/index",{
            trans : trans,
            books: db.get("books").value()
        });
        res.redirect('/trans');
        return;
    }
    res.redirect('/users');
};