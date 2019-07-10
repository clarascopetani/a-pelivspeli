DROP TABLE IF EXISTS `competencia`;
CREATE TABLE `competencia` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(95) NOT NULL,
  `genero_id` int(11) unsigned NOT NULL,
  `director_id` int(11) unsigned NOT NULL,
  `actor_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
   CONSTRAINT FOREIGN KEY (`genero_id`) REFERENCES `genero` (`id`),
  CONSTRAINT FOREIGN KEY (`director_id`) REFERENCES `director` (`id`),
  CONSTRAINT FOREIGN KEY (`actor_id`) REFERENCES `actor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/* BUSCAR COMPETENCIAS */

SELECT c.nombre AS nombre_competencia, d.nombre AS nombre_director, a.nombre AS nombre_actor, g.nombre AS genero 
FROM competencia c 
LEFT JOIN genero g ON c.genero_id =  g.id 
LEFT JOIN director d ON c.director_id = d.id 
LEFT JOIN actor a ON c.actor_id = a.id
WHERE c.id = 12;