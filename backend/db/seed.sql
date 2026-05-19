INSERT INTO problems (id, title, description, difficulty, language, week) VALUES
('p-mario-c', 'Mario', '## El reto de Mario

Implementa un programa que imprima una media pirámide alineada a la derecha, usando el caracter `#`, de una altura especificada por el usuario (entre 1 y 8).

### Ejemplo de salida para altura 4:
```
   #
  ##
 ###
####
```

### Requisitos
- Solicitar al usuario un número entre 1 y 8.
- Si el input es inválido, volver a solicitar.
- Imprimir la pirámide con los espacios y `#` correctos.', 'Fácil', 'c', 1)
ON CONFLICT(id) DO NOTHING;

INSERT INTO test_cases (id, problem_id, input_data, expected_output, is_hidden) VALUES
('tc-mario-1', 'p-mario-c', '1\n', '#\n', 0),
('tc-mario-2', 'p-mario-c', '2\n', ' #\n##\n', 0),
('tc-mario-3', 'p-mario-c', '4\n', '   #\n  ##\n ###\n####\n', 0),
('tc-mario-4', 'p-mario-c', '8\n', '       #\n      ##\n     ###\n    ####\n   #####\n  ######\n #######\n########\n', 1)
ON CONFLICT(id) DO NOTHING;

INSERT INTO hints (id, problem_id, order_index, question) VALUES
('h-mario-1', 'p-mario-c', 1, '¿Cuántas filas necesitas imprimir en total? ¿Está relacionado con la altura que ingresó el usuario?'),
('h-mario-2', 'p-mario-c', 2, 'En cada fila `i` (comenzando desde 1), ¿cuántos espacios van antes del primer `#`? ¿Y cuántos `#` van en esa fila?'),
('h-mario-3', 'p-mario-c', 3, 'Piensa en un bucle anidado: el exterior controla las filas, y los interiores imprimen primero los espacios y luego los `#`. ¿Qué condición de parada tiene cada uno?'),
('h-mario-4', 'p-mario-c', 4, '¿Qué función de C usas para validar el input? ¿Qué pasa si el usuario escribe "0" o "9"? ¿Cómo harías un bucle que siga pidiendo hasta obtener un valor válido?')
ON CONFLICT(id) DO NOTHING;
