var conn = require('../config')

exports.getCategories = async(req, res, next) =>{
  conn.query('SELECT * FROM categories ORDER BY id DESC', function (err, result, fields) {
    if (err) { console.log(err) }
    res.send(result)
  });
}

exports.getCategoriesList = async(req, res, next) =>{
  conn.query('SELECT * FROM categories WHERE status=1 ORDER BY id DESC', function (err, result, fields) {
    if (err) { console.log(err) }
    res.send(result)
  });
}

exports.addCategory = async(req, res, next) =>{
  conn.query('SELECT * FROM categories WHERE category_name = ?', [req.body.category_name], function (err, result, fields) {
    if (err) { console.log(err) }
    if(result.length>0){
      return res.status(200).json({ status:'false', err: 'Category already exists' })
    } else{
      var sql = "INSERT INTO categories (category_name) VALUES ?";
      var values = [
        [req.body.category_name],
      ];
      conn.query(sql, [values], function (err, result) {
        if (err) { console.log(err) }
        res.status(200).json({ status:'success' });
      });
    }
  });
}

exports.getCategory = async(req, res, next)=>{
  conn.query('SELECT * FROM categories WHERE category_name = ?', [req.params.category], function (err, result, fields) {
    if (err) { console.log(err) }
    return res.send(result)
  })
}

exports.updateCategory = async(req, res, next)=>{
  conn.query('SELECT * FROM categories WHERE id != ? AND category_name = ? ', [req.body.id, req.body.category_name], function (err, result, fields) {
    if (err) { console.log(err) }
    if(result.length!=0){
      res.status(200).json({ status:'false', err: 'Category already exists' });
    } else{
      conn.query('UPDATE categories SET category_name = ? Where ID = ?',[req.body.category_name, req.body.id], (err, result) => {
        if (err) {console.log(err)}
        res.status(200).json({ status:'success' });
      })
    }
  })  
}

exports.updateStatus = async(req, res, next)=>{
  conn.query(
    'UPDATE categories SET status = ? Where ID = ?',
    [req.body.status, req.body.id], (err, result) => {
      if (err) {console.log(err)}
      res.status(200).json({ status:'success' });
    }
  )
}

exports.deleteCategory = async(req, res, next)=>{
  conn.query(
    'DELETE FROM categories WHERE id = ?', [req.body.id], (err, result) => {
      if (err) { console.log(err) }
      res.status(200).json({ status:'success' });
    }
  )
}