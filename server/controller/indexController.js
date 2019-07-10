var con = require("../lib/conexionbd");

// GET ALL
function getAll(req, res) {
  console.log("estoy en controller");
  res.send("Hola todos");
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

function guardarVoto(req,res){
  let idPelicula = parseInt(req.body.idPelicula);
  let idCompetencia = parseInt(req.params.idCompetencia);

  const sql = "INSERT INTO votos (pelicula_id, competencia_id) values ("+idPelicula+","+idCompetencia+");";
  con.query(sql, (error, resultado, fields) => {
    if (error) return res.status(404).send("Hubo un error al guardar voto");
    res.send(resultado);
  });
}

function reiniciarVotos(req,res){
  console.log("voy a reiniciar votos")
 
}

function verResultados(req, res, error){
  let idCompetencia = parseInt(req.params.idCompetencia);
  
  let sql = 'SELECT v.pelicula_id as pelicula, COUNT(*) AS votos, v.competencia_id, c.nombre AS competencia, p.poster AS poster, p.titulo AS titulo FROM votos V JOIN competencia C ON V.competencia_id = C.id JOIN pelicula P ON V.pelicula_id = P.id WHERE v.competencia_id = '+idCompetencia+' GROUP BY pelicula_id, competencia_id ORDER BY pelicula_id DESC LIMIT 3;'
  con.query(sql, (error, resultado, fields) => {
    if (error) return res.status(404).send('Hubo un error en la consulta de votos');
    if(resultado.length > 0){
      let competencia = resultado[0].competencia;
      let resultados = resultado;
      return res.send(JSON.stringify({competencia: competencia, resultados: resultados}));
    } 
    if(resultado.length == 0) {
      return res.send(resultado);
    }
  })
};

function getGeneros(req, res, error){
  let sql = 'SELECT * FROM genero;'
  con.query(sql, (error, resultado, fields) => {
    if (error) return res.status(404).send("Hubo un error al cargar generos");
    res.send(resultado);
  });
}

function getDirectores(req, res, error){
  let sql = 'SELECT * FROM director;'
  con.query(sql, (error, resultado, fields) => {
    if (error) return res.status(404).send("Hubo un error al cargar directores");
    res.send(resultado);
  });
}


function getActores(req, res, error){
  let sql = 'SELECT * FROM actor;'
  con.query(sql, (error, resultado, fields) => {
    if (error) return res.status(404).send("Hubo un error al cargar actores");
    res.send(resultado);
  });
}

function crearCompetencia(req, res){
  let nombre = req.body.nombre;
  let queryParametros;
  
  //Consulto si ya existe el nombre de la competencia
  let sqlNom = 'SELECT COUNT(*) as cantidad FROM competencia WHERE nombre ="' + nombre + '";'
  
  con.query(sqlNom, (error, resultado, fields) => {
    if(error) return res.status(404).send("Hubo un error en la consulta");

    //SI existe el nombre de la competencia no lo guarda
    if(resultado[0].cantidad > 0){
      return res.status(422).send("UPS! El nombre de la competencia ya existe");
    }

    //SI no existe el nombre de la competencia
    if (resultado !== undefined){
      queryParametros = crearParamentros(req.body);
    }
  

    // NO hay más parametros
    if(queryParametros.queryCheck.length == 0){
      let sqlNombre = 'INSERT INTO competencia (nombre, genero_id, director_id, actor_id) values ("' + nombre + '", 0,0,0);';
      con.query(sqlNombre, (error, resultado, fields) => {
        if (error) return res.status(404).send("Hubo un error al guardar competencia");
        res.send(resultado).status(200);
      })
    };

    // SI hay más parametros
    if(queryParametros.queryCheck.length > 0){
      let sqlParams = 'INSERT INTO competencia (nombre, genero_id, director_id, actor_id) values ("'+ nombre + '",' + queryParametros.query + ');';
      con.query(sqlParams, (error, resultado, fields) => {
        if (error) return res.status(404).send("Hubo un error al guardar competencia");
        res.send(resultado).status(200);
      });
    };
  });
};

function crearParamentros(params) {
  let queryCheck = [];
  let queryParam = [params.genero,params.director,params.actor];
  
  if (params.genero > 0 ) {
    queryCheck.push(params.genero);
  }

   if (params.director > 0) {
    queryCheck.push(params.director);
  }

  if (params.actor > 0) {
    queryCheck.push(params.actor);
  }

  // DEVUELVE segun pedido
  return {
    queryCheck: queryCheck,
    query: queryParam,
  }

}

function obtenerCompetencia(req, res){
  let idCompetencia = req.params.idCompetencia;
  let sql = 'SELECT c.nombre AS nombre, d.nombre AS director_nombre, a.nombre AS actor_nombre, g.nombre AS genero_nombre FROM competencia c LEFT JOIN genero g ON c.genero_id =  g.id LEFT JOIN director d ON c.director_id = d.id LEFT JOIN actor a ON c.actor_id = a.id WHERE c.id = ' + idCompetencia +';';

  con.query(sql, (error, resultado, fields) => {
    if (error) return res.status(404).send("Hubo un error al cargar competencia");
    res.send(resultado[0]);
  });

}


module.exports = {
  getAll: getAll,
  cargarCompetencias: cargarCompetencias,
  cargarPeliculas:cargarPeliculas,
  guardarVoto:guardarVoto,
  reiniciarVotos:reiniciarVotos,
  verResultados:verResultados,
  getDirectores:getDirectores,
  getGeneros:getGeneros,
  getActores:getActores,
  crearCompetencia:crearCompetencia,
  obtenerCompetencia:obtenerCompetencia,
};
