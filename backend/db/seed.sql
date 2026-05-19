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

INSERT INTO flashcards (id, week, question, answer, order_index) VALUES
('fc-1-1', 1, '¿Qué hace la función `printf` en C?', 'Imprime texto formateado en la salida estándar (stdout). Acepta una cadena de formato y argumentos adicionales. Ejemplo: `printf("Hola %s, tienes %d años", nombre, edad);`', 1),
('fc-1-2', 1, '¿Cuál es la diferencia entre `int` y `float` en C?', '`int` almacena números enteros sin decimales (ej: 42). `float` almacena números con punto flotante/decimales (ej: 3.14). `int` ocupa 4 bytes y es más rápido; `float` también 4 bytes pero representa un rango diferente de valores.', 2),
('fc-1-3', 1, '¿Qué es una variable en C y cómo se declara?', 'Una variable es un espacio en memoria con un nombre y tipo. Se declara especificando el tipo y el nombre: `int altura = 5;`. En C clásico, las variables se declaran al inicio del bloque.', 3),
('fc-1-4', 1, '¿Para qué sirve el bucle `for` en C?', 'Repite un bloque de código un número determinado de veces. Tiene 3 partes: inicialización, condición y actualización. Ejemplo: `for (int i = 0; i < 10; i++) { ... }` ejecuta 10 veces.', 4),
('fc-1-5', 1, '¿Qué hace el operador `%` (módulo) en C?', 'Devuelve el **resto** de una división entera. Ejemplo: `10 % 3 = 1` porque 10 / 3 = 3 con resto 1. Es muy útil para saber si un número es par (`n % 2 == 0`) o para limitar valores a un rango.', 5),
('fc-1-6', 1, '¿Cuál es la diferencia entre `=` y `==` en C?', '`=` es el operador de **asignación**: guarda un valor en una variable (`x = 5`). `==` es el operador de **comparación**: evalúa si dos valores son iguales y devuelve 1 (verdadero) o 0 (falso). Confundirlos es un error muy común.', 6),
('fc-1-7', 1, '¿Qué es `scanf` y cuándo se usa?', '`scanf` lee datos desde la entrada estándar (stdin). Usa especificadores de formato igual que `printf`. Ejemplo: `scanf("%d", &n);` lee un entero y lo guarda en `n`. El `&` es crucial: le indica a `scanf` la **dirección de memoria** donde guardar el valor.', 7),
('fc-1-8', 1, '¿Qué significa `#include <stdio.h>` al inicio de un programa C?', 'Le indica al compilador que incluya la **librería estándar de entrada/salida**. Esta librería define funciones como `printf`, `scanf`, `puts`, etc. Sin este include, el compilador no reconocería esas funciones.', 8)
ON CONFLICT(id) DO NOTHING;
