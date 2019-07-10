/* CONTAR VOTOS */
SELECT pelicula_id as pelicula,COUNT(*) AS cantidad_votos FROM votos GROUP BY pelicula_id;

/* CONTAR VOTOS */
SELECT pelicula_id as pelicula, COUNT(*) AS cantidad_votos, competencia_id, competencia.nombre AS competencia FROM votos JOIN competencia ON votos.competencia_id = competencia.id GROUP BY pelicula_id, competencia_id ORDER BY cantidad_votos DESC LIMIT 3;

/* AGREGAR COMPETENCIA */
INSERT INTO competencia (nombre, genero_id, actor_id, director_id) values ("'+ nombre +'",' + genero + ',' + actor + ',' + director + ');';
