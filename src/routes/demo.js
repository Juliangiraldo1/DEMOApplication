const { response } = require('express');
const {Router}= require('express');
const router = Router();
const mysqlConnection = require('../database');

router.get('/', (req, res)=>{
    mysqlConnection.query('SELECT * FROM DEMO', (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
})

router.get('/:id', (req, res)=>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM DEMO WHERE ID_DEM = ?', [id], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    })
})

router.post('/', (req, res)=>{
    const { ID_DEM, NOMBRE_DEM,LINK_DEM, DESCRIPCION_DEM, NOMBRE_GEN, NICKNAME_ART, NOMBRE_SUB }= req.body;
    const query =` 
    SET @ID_DEM = ?; 
    SET @NOMBRE_DEM = ?;
    SET @LINK_DEM = ?;
    SET @DESCRIPCION_DEM = ?;
    SET @NOMBRE_GEN= ?;
    SET @NICKNAME_ART = ?;
    SET @NOMBRE_SUB = ?;
    INSERT INTO DEMO(ID_DEM, NOMBRE_DEM,LINK_DEM, DESCRIPCION_DEM,
        NOMBRE_GEN, NICKNAME_ART, NOMBRE_SUB) VALUES(@ID_DEM, @NOMBRE_DEM, @LINK_DEM,
         @DESCRIPCION_DEM, @NOMBRE_GEN, @NICKNAME_ART, @NOMBRE_SUB);`;

    mysqlConnection.query(query, [ID_DEM, NOMBRE_DEM,LINK_DEM, DESCRIPCION_DEM, NOMBRE_GEN, NICKNAME_ART, NOMBRE_SUB],
        (err, rows, fields)=>{
            if(!err){
                res.json({Status: 'Demo saved'});
            }else{
                console.log(err);
            }
        })
})

router.put('/:id', (req, res) =>{
    const { NOMBRE_DEM,LINK_DEM, DESCRIPCION_DEM, NOMBRE_GEN, NICKNAME_ART, NOMBRE_SUB }= req.body;
    const {id}= req.params;
    const query= `
    UPDATE DEMO SET NOMBRE_DEM=? ,LINK_DEM= ?,DESCRIPCION_DEM= ?,NOMBRE_GEN =?,NICKNAME_ART = ?,NOMBRE_SUB= ? WHERE ID_DEM= ?`;
    mysqlConnection.query(query, [NOMBRE_DEM, LINK_DEM, DESCRIPCION_DEM, NOMBRE_GEN, NICKNAME_ART, NOMBRE_SUB, id],
        (err, rows, fields)=>{
            if(!err){
                res.json({Status: 'Demo Updated'});
            }else{
                console.log(err);
            }
        })
})

router.delete('/:id', (req, res) =>{
    const {id} = req.params;
    mysqlConnection.query('DELETE FROM DEMO WHERE ID_DEM= ?', [id], (err, rows, fields)=>{
        if(!err){
            res.json({Status: 'Demo Deleted'});
        }else{
            console.log(err);
        }
    })
})


module.exports= router;