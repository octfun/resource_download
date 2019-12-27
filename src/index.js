// var http = require("http")

// http.createServer(function (request, response) {

//     // 发送 HTTP 头部 
//     // HTTP 状态值: 200 : OK
//     // 内容类型: text/plain
//     response.writeHead(200, {'Content-Type': 'text/plain'});

//     // 发送响应数据 "Hello World"
//     response.end('Hello World\n');
// }).listen(8888);

// // 终端打印如下信息
// console.log('Server running at http://127.0.0.1:8888/');

var router = require('./api').default//路由，首页
var express = require('express');
var app = express();
// var router=express.Router();
// router.route(api) 
app.use(router)

// app.get('/xmly', function (req, res) {
//    xmla.start()
//    res.send('Hello World');
// })

var server = app.listen(8082, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})