const conn = require('../config')
const fs = require('fs')

exports.addProject = async(req, res)=>{
    const project_files = req.files.project_files;
    const file_name = new Date().getTime()+'_-_'+project_files.name;

    var sql = "INSERT INTO projects (category_id, project_title, file_name, project_description) VALUES ?";
    var values = [
        [req.body.category_id,req.body.project_title, file_name, req.body.description],
    ];
    conn.query(sql, [values], function (err, result) {
        if (err) { console.log(err) }
         project_files.mv('projects/'+file_name, function(err) {
            if (err){ console.log(err) }
            res.status(200).json({ status:'success' });
        });
        
    });
}

exports.getProjects = async(req, res)=>{
    await conn.query('SELECT projects.id, projects.category_id, categories.category_name, projects.project_title, projects.file_name FROM projects INNER JOIN categories ON projects.category_id=categories.id ORDER BY projects.id DESC', function (err, result, fields) {
        if (err) { res.send(err) }
        return res.send(result)
    })
}

exports.deleteProject = async(req, res)=>{
    if(fs.existsSync('projects/'+req.body.file_name)){
        fs.unlinkSync('projects/'+req.body.file_name)
    }

    await conn.query('DELETE FROM projects WHERE id = ?', [req.body.id], (err, result) => {
          if (err) { console.log(err) }
          res.status(200).json({ status:'success' });
        }
    )
}