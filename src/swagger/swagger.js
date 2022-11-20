const path = require("path");
const baseUrl = 'http://localhost:5000';

const swaggerSpec = {
    definition: {
    openapi: "3.0.0",
    info: {
        title: "Api Inventario (Productos)",
        version: "1.0.0"
    },
    servers: [
        {
            url: baseUrl
        }
    ]},
    apis: [`${path.join(__dirname, "../routes/*.js")}`]
}




module.exports = swaggerSpec;