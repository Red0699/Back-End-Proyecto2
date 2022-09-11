const express = require('express');
const router = express.Router();

const productoSchema = require('../models/productoModel');

/**
 * @swagger
 * components:
 *  schemas:
 *      Producto:
 *          type: object
 *          properties:
 *              descripcion:
 *                  type: string
 *                  description: descripcion del producto
 *              almacen:
 *                  type: string
 *                  description: almacen del producto
 *              idCategoria:
 *                  type: integer
 *                  description: categoria del producto
 *          required:
 *              - descripcion
 *              - almacen
 *              - idCategoria
 *          example:
 *              descripcion: Huawei Y7 Prime
 *              almacen: alm001
 *              idCategoria: 1
 */

// ------------------------------------ Ruta obtener todos los proveedores ---------------------------------------------

/**
 * @swagger
 * /api/productos:
 *  get:
 *      summary: retorna todos los productos
 *      tags: [Producto]
 *      responses:
 *          200:
 *              description: Todos los productos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref : '#/components/schemas/Producto'
 */

 router.get('/productos', (req, res) => {
    productoSchema.getProductos(function (error, data) {
        res.status(200).json(data);
    });
});

//---------------------------------- Ruta insertar un nuevo producto ----------------------------------------------

/**
 * @swagger
 * /api/productos:
 *  post:
 *      summary: crear un nuevo producto
 *      tags: [Producto]
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref : '#/components/schemas/Producto'
 *      responses:
 *          200:
 *              description: El producto ha sido creado correctamente
 *              
 */


router.post('/productos', (req, res) => {
    //Objeto Json con los datos del proveedor
    const data = {
        idProducto: null,
        descripcion: req.body.descripcion,
        almacen: req.body.almacen,
        idCategoria: req.body.idCategoria
    };

    //Funcion para insertar
    productoSchema.insertProducto(data, (error, data) => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(500).send({ error: ":(" });
        }
    });
});

//------------------------------------------ Ruta obtener un producto ----------------------------------------------

/**
 * @swagger
 * /api/productos/{id}:
 *  get:
 *      summary: retorna un producto por id
 *      tags: [Producto]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Ingrese ID de un producto existente
 *      responses:
 *          200:
 *              description: Producto
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref : '#/components/schemas/Producto'
 *          404:
 *              description: Producto no encontrado
 */

router.get('/productos/:id', (req, res) => {
    const id = req.params.id;

    if (!isNaN(id)) {
        productoSchema.getProducto(id, (error, data) => {
            //Si el proveedor existe
            if (typeof data !== 'undefined' && data.length > 0) {
                res.status(200).json(data);
            } else {
                res.status(404, { "msg": "El registro no existe" });
            }
        })
    } else {
        res.status(500).json({ "msg": "Debe ser un numero" });
    }
});

//------------------------------------------ Ruta actualizar un producto ----------------------------------------------

/**
 * @swagger
 * /api/productos/{id}:
 *  put:
 *      summary: actualizar un producto por id
 *      tags: [Producto]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Ingrese ID de un producto existente
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref : '#/components/schemas/Producto'
 *      responses:
 *          200:
 *              description: El producto ha sido editado correctamente
 *          404:
 *              description: Producto no encontrado
 */

router.put("/productos/:id", (req, res) => {

    const id = req.params.id;

    const data = {
        idProducto: null,
        descripcion: req.body.descripcion,
        almacen: req.body.almacen,
        idCategoria: req.body.idCategoria
    };

    if (!isNaN(id)) {

        productoSchema.updateProducto(id, data, function (error, data) {

            if (data && data.msg) {
                res.status(200).json(data);
            } else {
                res.status(500).send({ error: ":(" });
            }

        });

    } else {
        res.status(500).json({ "msg": "Debe ingresar un numero" });
    }
});

module.exports = router;