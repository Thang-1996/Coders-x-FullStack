module.exports.postCreate = function (req,res,next) {
    var errors = [];
    if(!req.body.name){
        errors.push('Title is required');
    }
    if(req.body.name > 30){
        errors.push('User is out of range');
    }
    // neu co loi~ thi se khong thuc hien ben duoi ma render lai trang va return
    if(errors.length){
        res.render('users/create',{
            errors : errors,
            // truyen them vao bien de luu lai du lieu nguoi dung nhap len
            values: req.body // la tat ca gia tri cua nguoi dung nhap vao
        });
        return;
    }
    res.locals.success = true;
    next(); // can next de neu khong loi thi lam tiep chuong trinh khong co se loi mai mai
};