const { response } = require('express');
const express = require('express');
const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
//Llamado de la conexion exportada desde database.js
const mysqlConnection = require('../database');

//Login de generación de token
router.post('/login/', (req, res) => {
    const user = {
            id: 1,
            nombre: "eric",
            email: "eric@hot.com"
        }
        //Se crea un token basandose en el usuario especificado, una cadena, y un tiempo de expiración
    jwt.sign({ user: user }, 'secretkey', { expiresIn: "60m" }, (err, token) => {
        res.json({
            token: token
        })
    });
})

//list demo with petition get 
router.get('/demo/', validationToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            mysqlConnection.query('SELECT * FROM DEMO', (err, rows, fields) => {
                if (!err) {
                    res.json(rows);
                } else {
                    console.log(err);
                }
            })
        }
    })

})

//list demo by id with petition get and params in the request
router.get('/demo/:id', validationToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            const { id } = req.params;
            mysqlConnection.query('SELECT * FROM DEMO WHERE ID_DEM = ?', [id], (err, rows, fields) => {
                if (!err) {
                    res.json(rows[0]);
                } else {
                    console.log(err);
                }
            })
        }
    })
})

//list demo by artist_name with petition get and params in the request
router.get('/demo/search/:art_name', validationToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            const { art_name } = req.params;
            mysqlConnection.query('SELECT * FROM DEMO WHERE NICKNAME_ART = ?', [art_name], (err, rows, fields) => {
                if (!err) {
                    res.json(rows);
                } else {
                    console.log(err);
                }
            })
        }
    })
})

//list demo by artist_name with petition get and params in the request
router.get('/demo/search/:art_name/:demo', validationToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            const { art_name } = req.params;
            const { demo } = req.params;
            mysqlConnection.query('SELECT * FROM DEMO WHERE NICKNAME_ART = ? AND NOMBRE_DEM = ?', [art_name, demo], (err, rows, fields) => {
                if (!err) {
                    res.json(rows);
                } else {
                    console.log(err);
                }
            })
        }
    })
})

//Creación de demo con un body enviado
router.post('/demo/', validationToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            //Se almacenan los datos enviados en el body en constantes
            const { ID_DEM, NOMBRE_DEM, LINK_DEM, DESCRIPCION_DEM, NOMBRE_GEN, NICKNAME_ART, NOMBRE_SUB } = req.body;
            //Se crea base del query a ejecutarse
            const query = `
                    SET @ID_DEM = ?; 
                    SET @NOMBRE_DEM = ?;
                    SET @LINK_DEM = ?;
                    SET @DESCRIPCION_DEM = ?;
                    SET @NOMBRE_GEN= ?;
                    SET @NICKNAME_ART = ?;
                    SET @NOMBRE_SUB = ?;
                    CALL demoAddOrEdit(@ID_DEM, @NOMBRE_DEM, @LINK_DEM, @DESCRIPCION_DEM, @NOMBRE_GEN, @NICKNAME_ART, @NOMBRE_SUB)`;

            // A la conexion mysql se envia el query con las variables constantes concatenadas
            mysqlConnection.query(query, [ID_DEM, NOMBRE_DEM, LINK_DEM, DESCRIPCION_DEM, NOMBRE_GEN, NICKNAME_ART, NOMBRE_SUB],
                (err, rows, fields) => {
                    if (!err) {
                        res.json({ Status: 'Demo saved' });
                    } else {
                        console.log(err);
                    }
                })
        }
    })



})

//Actualización de demo con un parametro enviado y un body con la información a actualizar
router.put('/demo/:id', validationToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            const { NOMBRE_DEM, LINK_DEM, DESCRIPCION_DEM, NOMBRE_GEN, NICKNAME_ART, NOMBRE_SUB } = req.body;
            const { id } = req.params;
            //Almacenamiento del query del procedimiento almacenado
            const query = `
                CALL demoAddOrEdit(?, ?, ?, ?, ?, ?, ?)`;
            mysqlConnection.query(query, [id, NOMBRE_DEM, LINK_DEM, DESCRIPCION_DEM, NOMBRE_GEN, NICKNAME_ART, NOMBRE_SUB],
                (err, rows, fields) => {
                    if (!err) {
                        res.json({ Status: 'Demo Updated' });
                    } else {
                        console.log(err);
                    }
                })

        }
    })


})

//Eliminacion del demo con un id enviado en el parametro
router.delete('/demo/:id', validationToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            const { id } = req.params;
            mysqlConnection.query('DELETE FROM DEMO WHERE ID_DEM= ?', [id], (err, rows, fields) => {
                if (!err) {
                    res.json({ Status: 'Demo Deleted' });
                } else {
                    console.log(err);
                }
            })
        }
    })

})

//Authorization: Bearer <token> => Se adquiere el token del req
function validationToken(req, res, next) {
    //se adquiere el token del header
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

//Exportamos constante router
module.exports = router;