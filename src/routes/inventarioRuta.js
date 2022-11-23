const express = require('express');
const router = express.Router();
const conexion = require('../connection/conexion');

/**
 * @swagger
 * components:
 *  schemas:
 *      Inventario:
 *          type: object
 *          properties:
 *              idProducto:
 *                  type: integer
 *                  description: ID del producto
 *              description:
 *                  type: string
 *                  description: Descripcion del producto
 *              almacen:
 *                  type: string
 *                  description: Almacen del producto
 *              stock: 
 *                  type: integer
 *                  description: Stock actual del producto
 *              cantidadProducto:
 *                  type: integer
 *                  description: Total cantidad de productos por salida
 *              subtotal:
 *                  type: float
 *                  description: Total ingresos
 *              totalEgresos:
 *                  type: float
 *                  description: Total Egresos
 *              
 */

//------------------------------------------------------------ Obtener inventario ----------------------------------------------------------------

/**
 * @swagger
 * /api/inventario:
 *  get:
 *      summary: informe de inventario
 *      tags: [Inventario]
 *      responses:
 *          200:
 *              description: Informe
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref : '#/components/schemas/Inventario'
 */

router.get('/inventario', async (req, res) => {
    try {
        var sql = "SELECT idProducto, descripcion, almacen, stock, SUM(cantidadProducto) AS 'salidas', SUM(subtotal) AS 'subtotal', precioVenta*stock AS 'totalEgresos'"
        + "FROM producto NATURAL JOIN salida WHERE estado = 'Activo' ORDER BY idProducto"
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

module.exports = router