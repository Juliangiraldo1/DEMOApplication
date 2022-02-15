const mysql = require('mysql');

//crear conexion base de datos
const mysqlConnection= mysql.createConnection({
    host: 'bd-disquera.cvdspie2maso.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'D1squ3r4.BD',
    database: 'dbdisquera',
    port: "3306",
    multipleStatements: true
})
//conectar base de datos
mysqlConnection.connect(function(err){
    if(err){
        console.log(err)
        return;
    } else{
        console.log('Conexion exitosa')
    }
});

//exportar constante mysqlConnection
module.exports =mysqlConnection;
