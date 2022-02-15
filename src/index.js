const express = require('express');
const app= express();
const morgan = require('morgan');

//config
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//middlewares
//especificación de morgan para captura de solicitudes
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
//El modulo express estendera fragementos json
app.use(express.json());

//llamado a routes
app.use(require('./routes/demo'));

// iniciando server
app.listen(app.get('port'), ()=> {
    console.log(`Server on port ${app.get('port')}`)

})