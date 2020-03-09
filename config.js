const mysql = require('mysql');
const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'blogs'
});

conn.connect((err) => {
	if (err) { console.log(err) }
});

module.exports = conn;