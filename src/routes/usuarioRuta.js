const express = require('express');
const router = express.Router();

const usuarioSchema = require('../models/usuarioModel');



/**
 * @swagger
 * components:
 *  schemas:
 *      Usuario:
 *          type: object
 *          properties:
 *              primerNombre:
 *                  type: string
 *                  description: primer nombre del usuario
 *              segundoNombre:
 *                  type: string
 *                  description: segundo nombre del usuario
 *              apellidoPaterno:
 *                  type: string
 *                  description: apellido paterno del usuario
 *              apellidoMaterno:
 *                  type: string
 *                  description: apellido materno del usuario
 *              telefono:
 *                  type: string
 *                  description: telefono del usuario
 *              correo:
 *                  type: string
 *                  description: correo del usuario
 *              contraseña:
 *                  type: string
 *                  description: contraseña del usuario
 *              idRol:
 *                  type: integer
 *                  description: Tipo rol del usuario
 *              estado:
 *                  type: string
 *                  description: Tipo rol del usuario
 *          required:
 *              - primerNombre
 *              - segundoNombre
 *              - apellidoPaterno
 *              - apellidoMaterno
 *              - telefono
 *              - correo
 *              - contraseña
 *              - idRol
 *              - estado
 *          example:
 *              primerNombre: Yimmer
 *              segundoNombre: Nicolas
 *              apellidoPaterno: Campos
 *              apellidoMaterno: Rojas
 *              telefono: 3214663210
 *              correo: yncampos@ucundinamarca.edu.co
 *              contraseña: admin123
 *              idRol: 2
 *              estado: Activo
 * 
 *           
 */


// ------------------------------------ Ruta obtener todos los usuarios ---------------------------------------------

/**
 * @swagger
 * /api/usuarios:
 *  get:
 *      summary: retorna todos los usuarios
 *      tags: [Usuario]
 *      responses:
 *          200:
 *              description: Todos los usuarios
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref : '#/components/schemas/Usuario'
 */

router.get('/usuarios', (req, res) => {
    usuarioSchema.getUsuarios(function (error, data) {
        res.status(200).json(data);
    });
});

//---------------------------------- Ruta insertar un nuevo usuario ----------------------------------------------

/**
 * @swagger
 * /api/usuarios:
 *  post:
 *      summary: crear un nuevo usuario
 *      tags: [Usuario]
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref : '#/components/schemas/Usuario'
 *      responses:
 *          200:
 *              description: El usuario ha sido creado correctamente
 *              
 */


router.post('/usuarios', (req, res) => {
    //Objeto Json con los datos del usuario
    const data = {
        idUsuario: null,
        primerNombre: req.body.primerNombre,
        segundoNombre: req.body.segundoNombre,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidoMaterno,
        telefono: req.body.telefono,
        correo: req.body.correo,
        contraseña: req.body.contraseña,
        idRol: req.body.idRol,
        estado: 'Activo'
    };

    //Funcion para insertar
    usuarioSchema.insertUsuario(data, (error, data) => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(500).send({ error: ":(" });
        }
    });
});

//------------------------------------------ Ruta obtener un usuario ----------------------------------------------

/**
 * @swagger
 * /api/usuarios/{id}:
 *  get:
 *      summary: retorna un usuario por id
 *      tags: [Usuario]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Ingrese ID de un usuario existente
 *      responses:
 *          200:
 *              description: Todos los usuarios
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref : '#/components/schemas/Usuario'
 *          404:
 *              description: Usuario no encontrado
 */

router.get('/usuarios/:id', (req, res) => {
    const id = req.params.id;

    if (!isNaN(id)) {
        usuarioSchema.getUsuario(id, (error, data) => {
            //Si el usuario existe
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

//------------------------------------------ Ruta actualizar un usuario ----------------------------------------------

/**
 * @swagger
 * /api/usuarios/{id}:
 *  put:
 *      summary: actualizar un usuario por id
 *      tags: [Usuario]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Ingrese ID de un usuario existente
 *      requestBody:
 *          required: true
 *          content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref : '#/components/schemas/Usuario'
 *      responses:
 *          200:
 *              description: El usuario ha sido editado correctamente
 *          404:
 *              description: Usuario no encontrado
 */

router.put('/usuarios/:id', (req, res) => {

    const id = req.params.id;

    const data = {
        idUsuario: null,
        primerNombre: req.body.primerNombre,
        segundoNombre: req.body.segundoNombre,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidoMaterno,
        telefono: req.body.telefono,
        correo: req.body.correo,
        contraseña: req.body.contraseña,
        idRol: req.body.idRol,
        estado: req.body.estado
    };

    if (!isNaN(id)) {

        usuarioSchema.updateUsuario(id, data, function (error, data) {

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