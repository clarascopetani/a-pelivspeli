var con = require("../lib/conexionbd");

// GET ALL
function getAll(req, res) {
  console.log("estoy en controller");
  res.send("hola todos");
}


function cargarCompetencias(req, res) {
  const sql = "SELECT * FROM competencias.competencia;";

  con.query(sql, function(error, resultado, fields) {
    if (error) return res.status(404).send("Hubo un error en la consulta");
    res.send(JSON.stringify(resultado));
  });
}

function cargarPeliculas(req,res){
  const sql = "SELECT * FROM competencias.pelicula;";
  con.query(sql, function(error,resultado, fields){
    if (error) return res.status(404).send("Hubo un error en la consulta");
     const resultadosPeliculas = {
      peliculas:resultado
    }
      res.send(JSON.stringify(resultadosPeliculas));
  });
}

module.exports = {
  getAll: getAll,
  cargarCompetencias: cargarCompetencias,
  cargarPeliculas:cargarPeliculas,
};
