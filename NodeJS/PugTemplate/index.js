// single page khi sever nhận quest từ clien sẽ trả về toàn bộ html và sẽ không reload lại trang khi thay đổi dữ liệu kiểu multipage là kiểu truyền thống
// template engine gồm các lọa như pug template ens
// đâu tiên phải cài thư viện pug vào và sau đó gọi method của pug vào set 2 thứ là views engine và thư mục chứa views
var express = require('express');
var app = express();
var port = 3000;
app.set('view engine', 'pug'); // set views engine
// tao thu muc views
app.set('views', './views');
// co the viet tat lai respose va request la req va res
// su dung method render de render ra file html
app.get('/todos',function (req,res) {
    res.render('index',{
        name : 'AAA'
    }); // su dung render de render file index.pug // tham so thu 1 truyen vao se la path tham so thu 2 la truyen vao 1 object gom cac key va value
});
app.get('/users',function (req,res) { // tổ chức lại đường dẫn có thể  có nhiều thư mục con
    res.render('users/index',{
        users : [
            {id : 1, name : 'thang'},
            {id : 2, name : 'thang2'}
        ]
    }); //  có thể truyền vào danh sách các users là 1 object
    // su dung vong lap cua template pug den render
});
app.listen(port,function () {
    console.log('sever is running');
});