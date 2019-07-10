DROP TABLE IF EXISTS `votos`;
CREATE TABLE `votos` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pelicula_id` int(11) unsigned NOT NULL,
  `competencia_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT FOREIGN KEY (`pelicula_id`) REFERENCES `pelicula` (`id`),
  CONSTRAINT FOREIGN KEY (`competencia_id`) REFERENCES `competencia` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


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