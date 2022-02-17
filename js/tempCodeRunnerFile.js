var mysql = require('mysql');
const Connection = mysql.createConnection({
    host: 'db-disquera.cvdspie2maso.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin1234',
    database: 'dbdisquera',
    port: "3306",
    multipleStatements: true
})