var conn = require('../config')

exports.addBlog = async(req, res, next) =>{
    var blog_title          = req.body.blog_title.replace("'",'&apos');
    var blog_description    = req.body.blog_description.replace("'",'&apos');
    
    var sql = "INSERT INTO blogs (category_id, blog_title, blog_description) VALUES ("+req.body.category_id+", '"+blog_title+"', '"+blog_description+"')";
    conn.query(sql, function (err, result) {
        if (err) { console.log(err) }
        res.status(200).json({ status:'success' });
    })
}

exports.getBlogs = async(req, res, next)=>{
    conn.query('SELECT blogs.id, blogs.category_id, categories.category_name, blogs.blog_title, blogs.blog_description FROM blogs INNER JOIN categories ON blogs.category_id=categories.id ORDER BY blogs.id DESC', function (err, result, fields) {
        if (err) { console.log(err) }
        res.send(result)
    });
}

exports.deleteBlog = async(req, res, next)=>{
    conn.query(
        'DELETE FROM blogs WHERE id = ?', [req.body.id], (err, result) => {
          if (err) { console.log(err) }
          res.status(200).json({ status:'success' });
        }
    )
}

exports.getBlog = async(req, res, next)=>{
    conn.query('SELECT blogs.id, blogs.category_id, categories.category_name, blogs.blog_title, blogs.blog_description FROM blogs INNER JOIN categories ON blogs.category_id=categories.id WHERE blogs.id = ?', [req.params.id], function (err, result, fields) {
        if (err) { console.log(err) }
        return res.send(result)
    })
}

exports.updateBlog = (req, res, next)=>{
    conn.query('UPDATE blogs SET category_id = ?, blog_title = ?, blog_description = ? Where ID = ?',[req.body.category_id, req.body.blog_title, req.body.blog_description, req.body.id], (err, result) => {
        if (err) {console.log(err)}
        res.status(200).json({ status:'success' });
    }) 
}