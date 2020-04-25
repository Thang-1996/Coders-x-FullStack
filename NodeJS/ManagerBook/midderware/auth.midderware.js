const db =require('../db');
module.exports.requireAuth = function (req,res,next) {
    if(!req.cookies.userId){ // khi khong co cooikie id khong duoc gui len se redirect lai ve trang login
        res.redirect('/auth/login');
        return;
    }
    var user = db.get('users').find({id: req.cookies.userId}).value(); //  so sanh id vs req.cookies.userId tren browser
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    next(); //  se chay middleware tiep theo trong route check xem coookies co duoc gui len hay khong login thanh cong thi se midderware user
};