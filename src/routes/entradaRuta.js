const express = require('express');
const router = express.Router();
const conexion = require('../connection/conexion');

//------------------------------------------------------------ Obtener entradas ----------------------------------------------------------------



router.get('/entrada', async (req, res) => {
    try {
        var sql = "SELECT * FROM entrada WHERE estado = 'Activo'"
        conexion.query(sql, (err, results) => {
            if(!err){
                res.status(200).json(results)
            }else{
                res.status(400).send(err);
            }
        })
    } catch (error) {
        console.log(error)
    }
})

//------------------------------------------------------------ Insertar entrada ----------------------------------------------------------------

router.post('/entrada', async (req, res) => {
    try {
        const idProveedor = req.body.idProveedor;
        const idProducto = req.body.idProducto;
        const montoTotal = req.body.montoTotal;
        const data = {
            idProveedor: idProveedor,
            idProducto: idProducto,
            montoTotal: montoTotal,
        }

        var sql = 'INSERT INTO entrada SET ?'
        conexion.query(sql, data, (err, rows, fields) => {
            if (!err) {
                res.status(200).send('Registro insertado')
            } else {
                res.status(400).send(err);
            }
        })
    } catch (error) {
        console.log(error);
    }
})

//------------------------------------------------------------ Consultar entrada ----------------------------------------------------------------

router.get('/entrada/:id', async (req, res) => {
    try{
        const id = req.params.id;
        if (!isNaN(id)){
            var sql = `SELECT * FROM entrada WHERE idEntrada = ${id}`;
            conexion.query(sql, (err, results) => {
                if(!err){
                    res.status(200).json(results)
                }else{
                    res.status(400).send('ERROR')
                }                
            })
        }else{
            res.status(500).json({ "msg": "Debe ser un numero" });
        }
    }catch(error){
        console.log(error);
    }
})

//------------------------------------------------------------ Consultar entrada ----------------------------------------------------------------
router.put('/entrada/:id', async (req, res) => {
    try{
        const id = req.params.id;
        if(!isNaN(id)){
            var sql = `UPDATE entrada SET`
            + ` idProducto = ${req.body.idProducto}`
            + `, idProveedor = ${req.body.idProveedor}`
            + `, montoTotal = ${req.body.montoTotal}`
            + `, estado = '${req.body.estado}'`
            + ` WHERE idEntrada = ${id}`
            conexion.query(sql, (err, result) => {
                if(!err){
                    res.status(200).json(result)
                }else{
                    res.status(500).send('ERROR')
                    throw err;
                }
            })
        }
    }catch(error){  
        console.log(error);
    }
})



module.exports = router;

