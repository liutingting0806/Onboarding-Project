// var getName = require('../src/js/getLoginName.js');
// var name = getName.getName();
// console.log('get' + name);
    // sql语句
var sqlMap = {
    // 用户
    user: {
        getUserList0: `SELECT
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
    c.id not in (SELECT distinct user_id FROM h_type WHERE hr_id=? and type != ?)
    and locate(?, c.user_name)>0 and locate(?, cs.skill_name)>0 and locate(?, we.position)>0`,
        getUserList1:`SELECT
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
      LEFT JOIN h_type ht on ht.user_id=c.id
        LEFT JOIN ( SELECT * FROM ( SELECT *, ROW_NUMBER() over ( PARTITION BY user_id ORDER BY start_date DESC ) idx FROM work_experience ) t WHERE t.idx = 1 ) we ON we.user_id = c.id 
    WHERE ht.hr_id=? and ht.type=?
    and locate(?, c.user_name)>0 and locate(?, cs.skill_name)>0 and locate(?, we.position)>0`,
        check: 'select user_name,user_pwd from user_info',
    },
    skills: {
        getSkillsList:`SELECT * FROM skill`
    },
    jobs: {
        getJobsList:`SELECT * FROM job`
    }
}
module.exports = sqlMap;