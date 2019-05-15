const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '03248235405',
    database: 'eventia'
});

connection.connect((err) => {
    if (err) {
        throw(err)
    }
    
    console.log('Server Connected')
});

module.exports = connection
