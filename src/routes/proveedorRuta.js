const express = require('express');
const router = express.Router();

const proveedorSchema = require('../models/proveedorModel');

/**
 * @swagger
 * components:
 *  schemas:
 *      Proveedor:
 *          type: object
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: nombre del cliente
 *              apellido:
 *                  type: string
 *                  description: apellido del cliente
 *              telefono:
 *                  type: string
 *                  description: telefono del usuario
 *              correo:
 *                  type: string
 *                  description: correo del usuario
 *          required:
 *              - nombre
 *              - apellido
 *              - telefono
 *              - correo
 *          example:
 *              nombre: Yimmer
 *              apellido: Campos
 *              telefono: 3214663210
 *              correo: yimmernicolas@gmail.com
 */

// ------------------------------------ Ruta obtener todos los proveedores ---------------------------------------------

/**
 * @swagger
 * /api/proveedores:
 *  get:
 *      summary: retorna todos los proveedores
 *      tags: [Proveedor]
 *      responses:
 *          200:
 *              description: Todos los proveedores
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref : '#/components/schemas/Proveedor'
 */

 router.get('/proveedores', (req, res) => {
    proveedorSchema.getProveedores(function (error, data) {
        res.status(200).json(data);
    });
});

//---------------------------------- Ruta insertar un nuevo proveedor ----------------------------------------------

/**
 * @swagger
 * /api/proveedores:
 *  post:
 *      summary: crear un nuevo proveedor
 *      tags: [Proveedor]
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref : '#/components/schemas/Proveedor'
 *      responses:
 *          200:
 *              description: El proveedor ha sido creado correctamente
 *              
 */


router.post('/proveedores', (req, res) => {
    //Objeto Json con los datos del proveedor
    const data = {
        idProveedor: null,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        correo: req.body.correo
    };

    //Funcion para insertar
    proveedorSchema.insertProveedor(data, (error, data) => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(500).send({ error: ":(" });
        }
    });
});

//------------------------------------------ Ruta obtener un cliente ----------------------------------------------

/**
 * @swagger
 * /api/proveedores/{id}:
 *  get:
 *      summary: retorna un proveedor por id
 *      tags: [Proveedor]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Ingrese ID de un proveedor existente
 *      responses:
 *          200:
 *              description: Proveedor
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref : '#/components/schemas/Proveedor'
 *          404:
 *              description: Proveedor no encontrado
 */

router.get('/proveedores/:id', (req, res) => {
    const id = req.params.id;

    if (!isNaN(id)) {
        proveedorSchema.getProveedor(id, (error, data) => {
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

//------------------------------------------ Ruta actualizar un proveedor ----------------------------------------------

/**
 * @swagger
 * /api/proveedores/{id}:
 *  put:
 *      summary: actualizar un proveedor por id
 *      tags: [Proveedor]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Ingrese ID de un proveedor existente
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref : '#/components/schemas/Proveedor'
 *      responses:
 *          200:
 *              description: El proveedor ha sido editado correctamente
 *          404:
 *              description: Proveedor no encontrado
 */

router.put("/proveedores/:id", (req, res) => {

    const id = req.params.id;

    const data = {
        idProveedor: null,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        correo: req.body.correo
    };

    if (!isNaN(id)) {

        proveedorSchema.updateProveedor(id, data, function (error, data) {

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