const express = require('express');
const router = express.Router();
const conexion = require('../connection/conexion');

/**
 * @swagger
 * components:
 *  schemas:
 *      Salida:
 *          type: object
 *          properties:
 *              idCliente:
 *                  type: integer
 *                  description: ID del Cliente
 *              idProducto:
 *                  type: integer
 *                  description: ID del producto
 *              subtotal:
 *                  type: float
 *                  description: Subtotal calculado
 *              cantidadProducto:
 *                  type: integer
 *                  description: Cantidad de producto por salir
 *              estado:
 *                  type: string
 *                  description: Estado del producto
 *          required:
 *              - idCliente
 *              - idProducto
 *              - subtotal
 *              - cantidadProducto
 *              - estado
 *          example:
 *              idCliente: 1
 *              idProducto: 1
 *              subtotal: 0
 *              cantidadProducto: 10
 *              estado: Activo
 *              
 */

//------------------------------------------------------------ Obtener salidas ----------------------------------------------------------------

/**
 * @swagger
 * /api/salida:
 *  get:
 *      summary: retorna todas las salidas
 *      tags: [Entrada]
 *      responses:
 *          200:
 *              description: Todos las salidas
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref : '#/components/schemas/Salida'
 */

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

/**
 * @swagger
 * /api/salida:
 *  post:
 *      summary: crear una nueva salida
 *      tags: [Salida]
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref : '#/components/schemas/Salida'
 *      responses:
 *          200:
 *              description: La salida ha sido creada
 *              
 */

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

/**
 * @swagger
 * /api/salida/{id}:
 *  get:
 *      summary: retorna una salida por ID
 *      tags: [Salida]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Ingrese ID de la salida
 *      responses:
 *          200:
 *              description: Salida
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref : '#/components/schemas/Salida'
 *          404:
 *              description: Salida no encontrada
 */

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

/**
 * @swagger
 * /api/salida/{id}:
 *  put:
 *      summary: actualizar una salida por id
 *      tags: [Salida]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Ingrese ID de una salida existente
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref : '#/components/schemas/Salida'
 *      responses:
 *          200:
 *              description: La salida ha sido editado correctamente
 *          404:
 *              description: Salida no encontrada
 */

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

