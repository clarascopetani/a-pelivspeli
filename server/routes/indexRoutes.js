const express = require('express');
let controller = require('../controller/indexController')
let app = express.Router(controller)

app.get('/', controller.getAll)
app.get('/competencias', controller.cargarCompetencias);
app.post('/competencias', controller.crearCompetencia);

app.get('/competencias/:id/peliculas', controller.cargarPeliculas);

app.post('/competencias/:idCompetencia/voto', controller.guardarVoto);
app.delete('/competencias/:idCompetencia/votos', controller.reiniciarVotos);

app.get('/competencias/:idCompetencia', controller.obtenerCompetencia);

app.get('/competencias/:idCompetencia/resultados', controller.verResultados);

app.get('/generos', controller.getGeneros);
app.get('/directores', controller.getDirectores);
app.get('/actores', controller.getActores);

module.exports = app;
