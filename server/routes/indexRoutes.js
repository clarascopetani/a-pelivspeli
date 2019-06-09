const express = require('express');
let controller = require('../controller/indexController')
let app = express.Router(controller)

app.get('/', controller.getAll)
app.get('/competencias', controller.cargarCompetencias);
app.get('/competencias/:id/peliculas', controller.cargarPeliculas);

module.exports = app;
