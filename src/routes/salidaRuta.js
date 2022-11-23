const express = require('express');
const router = express.Router();
const conexion = require('../connection/conexion');

//------------------------------------------------------------ Obtener salidas ----------------------------------------------------------------

router.get('/salida', async (req, res) => {
    try {
        var sql = "SELECT * FROM salida INNER JOIN producto ON salida.idProducto = producto.idProducto "
        + "INNER JOIN cliente ON salida.idCliente = cliente.idCliente "
        + "WHERE salida.estado = 'Activo' AND producto.estadoSalida = 'Activo' "
        + "ORDER BY salida.idSalida"
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

//------------------------------------------------------------ Insertar salida ----------------------------------------------------------------

router.post('/salida', async (req, res) => {
    try {
        const idCliente = req.body.idCliente;
        const idProducto = req.body.idProducto;
        const subtotal = req.body.subtotal;
        const cantidadProducto = req.body.cantidadProducto;
        const estado = 'Activo'
        
        const data = {
            idCliente: idCliente,
            idProducto: idProducto,
            subtotal: subtotal,
            cantidadProducto: cantidadProducto,
            estado: estado
            
        }

        var sql = 'INSERT INTO salida SET ?'
        conexion.query(sql, data, (err, rows, fields) => {
            if (!err) {
                res.status(200).json(data)
            } else {
                res.status(400).send(err);
            }
        })
    } catch (error) {
        console.log(error);
    }
})

//------------------------------------------------------------ Consultar salida ----------------------------------------------------------------

router.get('/salida/:id', async (req, res) => {
    try{
        const id = req.params.id;
        if (!isNaN(id)){
            var sql = `SELECT * FROM salida NATURAL JOIN producto NATURAL JOIN cliente WHERE idSalida = ${id}`;
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

//------------------------------------------------------------ Actualizar salida ----------------------------------------------------------------
router.put('/salida/:id', async (req, res) => {
    try{
        const id = req.params.id;
        if(!isNaN(id)){
            var sql = `UPDATE salida SET`
            + ` idProducto = ${req.body.idProducto}`
            + `, idCliente = ${req.body.idCliente}`
            + `, subtotal = ${req.body.subtotal}`
            + `, cantidadProducto = ${req.body.cantidadProducto}`
            + `, estado = '${req.body.estado}'`
            + ` WHERE idSalida = ${id}`

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

