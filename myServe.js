let express = require('express');

var mysql = require('mysql');

let app =express();
let frontData =''
//设置跨域访问

app.all('*', function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');

//   res.header('Access-Control-Allow-Credentials', true);

  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')

  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');

  res.header('Content-Type', 'application/json;charset=utf-8');
  frontData = req.query;
  // console.log(frontData)

  next()

});




let api = '/api/user';
app.get(api, (req, res) => {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'Ltt990806.',
        database : 'test_ltt'
      });
    connection.connect();
    // console.log(frontData.user_name,frontData.skill_name,frontData.position)
    connection.query(`SELECT
	c.*,
	we.comp_name,
	we.position,
	we.EXPLAIN,
	cs.skill_name 
FROM
	candidate c
	LEFT JOIN (
	SELECT
		cs.user_id,
		GROUP_CONCAT( s.skill_name SEPARATOR ',' ) AS skill_name 
	FROM
		candidate_skill cs
		LEFT JOIN skill s ON s.id = cs.skill_id 
	GROUP BY
		cs.user_id 
	) cs ON cs.user_id = c.id
	LEFT JOIN ( SELECT * FROM ( SELECT *, ROW_NUMBER() over ( PARTITION BY user_id ORDER BY start_date DESC ) idx FROM work_experience ) t WHERE t.idx = 1 ) we ON we.user_id = c.id 
WHERE
	locate(?, c.user_name)>0 and locate(?, cs.skill_name)>0 and locate(?, we.position)>0`, 
                    [frontData.user_name,frontData.skill_name,frontData.position],
                    function(err, rows, fields) {
    if (err) throw err;
   let data = rows;
   
    res.send(data);
    
    // console.log('The solution is: ', rows);
    }); 
    connection.end();   
});

let skillApi = '/api/skills';
app.get(skillApi, (req, res) => {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'Ltt990806.',
        database : 'test_ltt'
      });
    connection.connect();
    connection.query(`SELECT * FROM skill`,
                    function(err, rows, fields) {
    if (err) throw err;
   let data = rows;
   
    res.send(data);
    
    // console.log('The solution is: ', rows);
    }); 
    connection.end();   
});

//配置服务端口

var server = app.listen(8000, () => {

    console.log( `localhost:8000${api}`);

});
