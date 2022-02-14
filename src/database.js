const mysql = require('mysql');

const mysqlConnection= mysql.createConnection({
    host:'db-disquera.cvdspie2maso.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin1234',
    database: 'dbdisquera',
    port: "3306",
    multipleStatements: true
})

mysqlConnection.connect(function(err){
    if(err){
        console.log(err)
        return;
    } else{
        console.log('Conexion exitosa')
    }
});

module.exports =mysqlConnection;
