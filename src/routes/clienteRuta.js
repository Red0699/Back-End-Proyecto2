const express = require('express');
const router = express.Router();

const clienteSchema = require('../models/clienteModel');

/**
 * @swagger
 * components:
 *  schemas:
 *      Cliente:
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

// ------------------------------------ Ruta obtener todos los clientes ---------------------------------------------

/**
 * @swagger
 * /api/clientes:
 *  get:
 *      summary: retorna todos los clientes
 *      tags: [Cliente]
 *      responses:
 *          200:
 *              description: Todos los clientes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref : '#/components/schemas/Cliente'
 */

 router.get('/clientes', (req, res) => {
    clienteSchema.getClientes(function (error, data) {
        res.status(200).json(data);
    });
});

//---------------------------------- Ruta insertar un nuevo usuario ----------------------------------------------

/**
 * @swagger
 * /api/clientes:
 *  post:
 *      summary: crear un nuevo cliente
 *      tags: [Cliente]
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref : '#/components/schemas/Cliente'
 *      responses:
 *          200:
 *              description: El cliente ha sido creado correctamente
 *              
 */


router.post('/clientes', (req, res) => {
    //Objeto Json con los datos del cliente
    const data = {
        idCliente: null,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        correo: req.body.correo
    };

    //Funcion para insertar
    clienteSchema.insertCliente(data, (error, data) => {
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
 * /api/clientes/{id}:
 *  get:
 *      summary: retorna un cliente por id
 *      tags: [Cliente]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Ingrese ID de un cliente existente
 *      responses:
 *          200:
 *              description: Todos los clientes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref : '#/components/schemas/Cliente'
 *          404:
 *              description: Cliente no encontrado
 */

router.get('/clientes/:id', (req, res) => {
    const id = req.params.id;

    if (!isNaN(id)) {
        clienteSchema.getCliente(id, (error, data) => {
            //Si el cliente existe
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

//------------------------------------------ Ruta actualizar un cliente ----------------------------------------------

/**
 * @swagger
 * /api/clientes/{id}:
 *  put:
 *      summary: actualizar un cliente por id
 *      tags: [Cliente]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Ingrese ID de un cliente existente
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref : '#/components/schemas/Cliente'
 *      responses:
 *          200:
 *              description: El cliente ha sido editado correctamente
 *          404:
 *              description: Cliente no encontrado
 */

router.put("/clientes/:id", (req, res) => {

    const id = req.params.id;

    const data = {
        idCliente: null,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        correo: req.body.correo
    };

    if (!isNaN(id)) {

        clienteSchema.updateCliente(id, data, function (error, data) {

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