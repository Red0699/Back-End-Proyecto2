const express = require('express');
const router = express.Router();
const conexion = require('../connection/conexion');

/**
 * @swagger
 * components:
 *  schemas:
 *      Entrada:
 *          type: object
 *          properties:
 *              idProveedor:
 *                  type: integer
 *                  description: ID del Proveedor
 *              idProducto:
 *                  type: integer
 *                  description: ID del producto
 *              estado:
 *                  type: string
 *                  description: Estado del producto
 *          required:
 *              - idProveedor
 *              - idProducto
 *              - estado
 *          example:
 *              idProveedor: 1
 *              idProducto: 1
 *              estado: Activo
 *              
 */

// ------------------------------------ Ruta obtener todos los productos ---------------------------------------------

/**
 * @swagger
 * /api/entrada:
 *  get:
 *      summary: retorna todas las entradas
 *      tags: [Entrada]
 *      responses:
 *          200:
 *              description: Todos las entradas
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref : '#/components/schemas/Entrada'
 */

//------------------------------------------------------------ Obtener entradas ----------------------------------------------------------------

router.get('/entrada', async (req, res) => {
    try {
        var sql = "SELECT * FROM entrada NATURAL JOIN producto WHERE estadoEntrada = 'Activo' AND estado = 'Activo'"
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

/**
 * @swagger
 * /api/entrada:
 *  post:
 *      summary: crear una nueva entrada
 *      tags: [Entrada]
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref : '#/components/schemas/Entrada'
 *      responses:
 *          200:
 *              description: La entrada ha sido creada
 *              
 */

router.post('/entrada', async (req, res) => {
    try {
        const idProveedor = req.body.idProveedor;
        const idProducto = req.body.idProducto;
        const estado = 'Activo'
        //const montoTotal = req.body.montoTotal;
        const data = {
            idProveedor: idProveedor,
            idProducto: idProducto,
            estado: estado
            //montoTotal: montoTotal,
        }

        var sql = 'INSERT INTO entrada SET ?'
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

//------------------------------------------------------------ Consultar entrada ----------------------------------------------------------------

/**
 * @swagger
 * /api/entrada/{id}:
 *  get:
 *      summary: retorna una entrada por ID
 *      tags: [Entrada]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Ingrese ID de la entrada
 *      responses:
 *          200:
 *              description: Entrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref : '#/components/schemas/Entrada'
 *          404:
 *              description: Entrada no encontrada
 */

router.get('/entrada/:id', async (req, res) => {
    try{
        const id = req.params.id;
        if (!isNaN(id)){
            var sql = `SELECT * FROM entrada NATURAL JOIN producto NATURAL JOIN proveedor WHERE idEntrada = ${id}`;
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

//------------------------------------------------------------ Actualizar entrada ----------------------------------------------------------------

/**
 * @swagger
 * /api/entrada/{id}:
 *  put:
 *      summary: actualizar una entrada por id
 *      tags: [Entrada]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Ingrese ID de una entrada existente
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref : '#/components/schemas/Entrada'
 *      responses:
 *          200:
 *              description: La entrada ha sido editado correctamente
 *          404:
 *              description: Entrada no encontrada
 */

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

