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

module.exports = router;

