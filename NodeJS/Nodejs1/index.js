// Express JS là 1 công cụ framweworld để làm sever ngôn ngữ sử dụng là javascript nền tảng chạy là nodejs
// gom get post put delete
var express = require('express');
var app = express();
var port = 3000;
app.get('/todos',function (request,response) { // function call back nhận vào 2 tham số request : những thứ mà người dùng gửi response người dùng trả về
    response.send('<ul>' +
        '<li>Đi chợ</li>' +
        '<li>Nấu cơm</li>' +
        '<li>Rửa bát</li>' +
        '<li>Học code tại CodersX</li>' +
        '</ul>');
});
app.listen(port,function () {
    console.log('Sever listening on port'+port);
});