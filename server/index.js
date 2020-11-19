let userApi = require('./api/userApi');
let express = require('express');
let bodyParser = require('body-parser');

let app =express();
// let frontData =''
//设置跨域访问

app.all('*', function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');

//   res.header('Access-Control-Allow-Credentials', true);

  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')

  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');

  res.header('Content-Type', 'application/json;charset=utf-8');
  // frontData = req.query;
  // console.log(frontData)

  next()

});
let api = '/api/user';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 后端api路由
app.use('/api/user', userApi);


// app.get(api, (req, res) => {})

//配置服务端口
app.listen(8000, () => {
  console.log( `localhost:8000${api}`);
});