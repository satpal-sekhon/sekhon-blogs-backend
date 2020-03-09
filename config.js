const mysql = require('mysql');
const conn = mysql.createConnection({
	host: 'sql12.freesqldatabase.com',
	user: 'sql12326999',
	password: 'MV9QZ19ZZH',
	database: 'sql12326999'
});

conn.connect((err) => {
	if (err) { console.log(err) }
});

module.exports = conn;
