const conexion = require('../connection/conexion');
const settings = require('../connection/config.json')
const jwt = require("jsonwebtoken");
//const usuarioSchema = {};
const express = require('express');
const router = express.Router();

//const secret = 'login';

/*
router.get('/login', (req, res) => {
    res.render('login');
})
*/

/*
router.post('/login', async (req, res)=>{
    try {
        const correo = req.body.correo
        const contraseña = req.body.contraseña        

        if(!correo || !contraseña ){
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un correo y contraseña",
                alertIcon:'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        }else{
            conexion.query('SELECT * FROM usuario WHERE correo = ?', [correo], async (error, results)=>{
                if( results.length == 0 / ){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Correo y/o Contraseña incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'    
                    })
                }else{
                    //inicio de sesión OK
                    const idUsuario = results[0].idUsuario
                    const token = jwt.sign({idUsuario:idUsuario}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    //generamos el token SIN fecha de expiracion
                   //const token = jwt.sign({idUsuario: idUsuario}, process.env.JWT_SECRETO)
                   console.log("TOKEN: "+token+" para el USUARIO : "+correo)

                   const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                   }
                   res.cookie('jwt', token, cookiesOptions)
                   res.render('login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡LOGIN CORRECTO!",
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: ''
                   })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
})
*/

router.post('/login', async (req, res) => {
    try {
        const correo = req.body.correo;
        const contraseña = req.body.contraseña;
        console.log(correo + '-'+ contraseña);
        if (!correo || !contraseña) {
            /*
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un correo y contraseña",
                alertIcon: "info",
                showConfiguration: true,
                timer: false,
                rute: 'login'
            })
            */
        } else {
            var sql = `SELECT * FROM usuario WHERE correo = "${correo}"`;
            conexion.query(sql, (error, results) => {
                if (results.length == 0 || (contraseña != results[0].contraseña) ) {
                    res.status(400).send("Credenciales Incorrectas");
                } else {
                    //console.log(results);
                    console.log(results[0].contraseña);
                    const id = results[0].idUsuario;
                    
                    const token = jwt.sign({ id: id, email: correo }, "loginSecret", {expiresIn: "2h"});
                    let nDatos = {...results[0], token};
                    res.status(200).json(nDatos);
                    //res.json({ status: 'ok', message: 'Bienvenido', token });
                    //console.log("TOKEN: " + token + " para el Usuario: " + id);
                }

            })
        }
    } catch (error) {
        console.log(error);
    }
});

//12 - Método para controlar que está auth en todas las páginas
router.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render('index', {
            login: true,
            name: req.session.name
        });
    } else {
        res.render('index', {
            login: false,
            name: 'Debe iniciar sesión',
        });
    }
    res.end();
});

/*
//función para limpiar la caché luego del logout
router.use(function(req, res, next) {
    if (!req.correo)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidUsuarioate');
    next();
});

*/

//Logout
//Destruye la sesión.
router.get('/logout', function (req, res) {
    req.session.destroy(() => {
        res.redirect('/') // siempre se ejecutará después de que se destruya la sesión
    })
});

module.exports = router;