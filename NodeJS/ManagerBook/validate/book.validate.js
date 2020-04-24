module.exports.postCreate = function (req,res,next) {
    var errors = [];
    if(!req.body.title){
        errors.push('Title is required');
    }
    if(!req.body.des){
        errors.push('Description is required');
    }
    // neu co loi~ thi se khong thuc hien ben duoi ma render lai trang va return
    if(errors.length){
        res.render('books/create',{
            errors : errors,
            // truyen them vao bien de luu lai du lieu nguoi dung nhap len
            values: req.body // la tat ca gia tri cua nguoi dung nhap vao
        });
        return;
    }
    res.locals.success = true;
    next(); // can next de neu khong loi thi lam tiep chuong trinh khong co se loi mai mai
};