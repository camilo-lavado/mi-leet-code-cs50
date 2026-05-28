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

-- Cash Problem Seed
INSERT INTO problems (id, title, description, difficulty, language, week) VALUES
('p-cash-c', 'Cash', '## El reto de Cash

Implementa un programa que calcule el número mínimo de monedas necesarias para dar un cambio especificado por el usuario (en centavos).

Las monedas disponibles son:
- **Quarters** (25¢)
- **Dimes** (10¢)
- **Nickels** (5¢)
- **Pennies** (1¢)

### Ejemplo de ejecución:
Si el usuario introduce `41` centavos, el cambio mínimo es 4 monedas (1 de 25¢, 1 de 10¢, 1 de 5¢, y 1 de 1¢).

### Requisitos:
- Solicitar al usuario un número entero no negativo de centavos.
- Si el usuario introduce un número negativo, volver a solicitar.
- Imprimir únicamente el número total de monedas necesarias seguido de un salto de línea.', 'Fácil', 'c', 1)
ON CONFLICT(id) DO NOTHING;

INSERT INTO test_cases (id, problem_id, input_data, expected_output, is_hidden) VALUES
('tc-cash-1', 'p-cash-c', '41\n', '4\n', 0),
('tc-cash-2', 'p-cash-c', '160\n', '7\n', 0),
('tc-cash-3', 'p-cash-c', '4\n', '4\n', 0),
('tc-cash-4', 'p-cash-c', '0\n', '0\n', 0),
('tc-cash-5', 'p-cash-c', '-10\n15\n', '2\n', 1)
ON CONFLICT(id) DO NOTHING;

INSERT INTO hints (id, problem_id, order_index, question) VALUES
('h-cash-1', 'p-cash-c', 1, 'Para resolver Cash, necesitas saber qué monedas tienes disponibles. ¿Cuáles son sus valores?'),
('h-cash-2', 'p-cash-c', 2, 'Siempre queremos usar la moneda más grande posible primero (un enfoque Greedy o voraz). Si el cambio es mayor o igual a 25 centavos, ¿cuántas monedas de 25 puedes usar?'),
('h-cash-3', 'p-cash-c', 3, 'Puedes restar 25 al total de forma repetida (con un bucle) o usar el operador `/` para obtener la división entera y `%` para el residuo.'),
('h-cash-4', 'p-cash-c', 4, 'Una vez que termines con las de 25, haz el mismo proceso con las de 10, luego 5 y finalmente 1 centavo. Al final, suma todas las monedas usadas y muéstralas.')
ON CONFLICT(id) DO NOTHING;

-- =============================================================
-- SEMANA 0: Pensamiento Computacional y Representación Binaria
-- =============================================================

INSERT INTO problems (id, title, description, difficulty, language, week) VALUES
('p-binary-py', 'Binary', '## El reto de Binary

Implementa un programa en Python que convierta un número entero no negativo a su representación en binario, **sin usar** la función incorporada `bin()`.

El programa debe:
1. Leer un entero `n` desde la entrada estándar
2. Imprimir su representación binaria (solo los dígitos, sin prefijos como `0b`)

### Ejemplos:

| Entrada | Salida     |
|---------|------------|
| `0`     | `0`        |
| `1`     | `1`        |
| `5`     | `101`      |
| `42`    | `101010`   |
| `255`   | `11111111` |

### Restricciones
- No puedes usar `bin()`, `format()` con `b`, ni f-strings con formato `f"{n:b}"`
- El algoritmo debe implementar divisiones sucesivas por 2', 'Fácil', 'python', 0)
ON CONFLICT(id) DO NOTHING;

INSERT INTO test_cases (id, problem_id, input_data, expected_output, is_hidden) VALUES
('tc-binary-1', 'p-binary-py', '0\n',   '0\n',          0),
('tc-binary-2', 'p-binary-py', '1\n',   '1\n',          0),
('tc-binary-3', 'p-binary-py', '42\n',  '101010\n',     0),
('tc-binary-4', 'p-binary-py', '255\n', '11111111\n',   1)
ON CONFLICT(id) DO NOTHING;

INSERT INTO hints (id, problem_id, order_index, question) VALUES
('h-binary-1', 'p-binary-py', 1, '¿Cuál es la regla para determinar el último bit (el menos significativo) de un número? Si el número es par, ese bit es 0; si es impar, es 1. ¿Qué operador de Python te da el residuo de una división?'),
('h-binary-2', 'p-binary-py', 2, 'Después de anotar el bit menos significativo (el residuo de dividir por 2), ¿cómo "eliminas" ese bit del número para seguir procesando los bits restantes? Pista: usa división entera `//`.'),
('h-binary-3', 'p-binary-py', 3, 'Los bits que obtienes por divisiones sucesivas salen en orden inverso: del menos significativo al más significativo. ¿Cómo invertirías una lista o un string en Python para presentarlos en el orden correcto?'),
('h-binary-4', 'p-binary-py', 4, '¿Qué caso especial debes manejar? Si `n = 0`, el bucle de divisiones nunca se ejecuta porque la condición `n > 0` ya es falsa. ¿Cuál debería ser la salida para ese caso?')
ON CONFLICT(id) DO NOTHING;

-- =============================================================
-- SEMANA 1 (adicional): Population
-- =============================================================

INSERT INTO problems (id, title, description, difficulty, language, week) VALUES
('p-population-c', 'Population', '## El reto de Population

Implementa un programa en C que calcule cuántos **años** tarda una población de llamas en crecer de un tamaño inicial a un tamaño objetivo.

Cada año, nacen `n/3` llamas nuevas y mueren `n/4` llamas (división entera), donde `n` es la población actual al inicio del año:

```
n = n + n/3 - n/4
```

El programa debe:
1. Solicitar un tamaño de población inicial (mínimo 9; si el usuario ingresa un valor menor, volver a preguntar)
2. Solicitar un tamaño de población objetivo (debe ser mayor o igual al inicial; si no, volver a preguntar)
3. Imprimir el número de años necesarios para alcanzar o superar la población objetivo

### Ejemplo para inicial=20, objetivo=28:

| Año | Cálculo                      | Población |
|-----|------------------------------|-----------|
| 1   | 20 + 20/3 - 20/4 = 20+6-5   | 21        |
| 2   | 21 + 21/3 - 21/4 = 21+7-5   | 23        |
| 3   | 23 + 23/3 - 23/4 = 23+7-5   | 25        |
| 4   | 25 + 25/3 - 25/4 = 25+8-6   | 27        |
| 5   | 27 + 27/3 - 27/4 = 27+9-6   | 30 ≥ 28   |

Salida: `5`', 'Fácil', 'c', 1)
ON CONFLICT(id) DO NOTHING;

INSERT INTO test_cases (id, problem_id, input_data, expected_output, is_hidden) VALUES
('tc-population-1', 'p-population-c', '20\n28\n',   '5\n', 0),
('tc-population-2', 'p-population-c', '100\n200\n', '9\n', 0),
('tc-population-3', 'p-population-c', '9\n9\n',     '0\n', 0),
('tc-population-4', 'p-population-c', '9\n18\n',    '8\n', 1)
ON CONFLICT(id) DO NOTHING;

INSERT INTO hints (id, problem_id, order_index, question) VALUES
('h-population-1', 'p-population-c', 1, '¿Qué tipo de dato usarías para la población? ¿Un `int` es suficiente para poblaciones grandes, o necesitas un `long`? Considera que el enunciado no especifica un límite superior.'),
('h-population-2', 'p-population-c', 2, 'La fórmula `n = n + n/3 - n/4` usa división entera en C (los decimales se truncan automáticamente). ¿Cómo inicializas el contador de años y en qué momento lo incrementas dentro del bucle?'),
('h-population-3', 'p-population-c', 3, 'Para validar los inputs, ¿qué tipo de bucle usarías para seguir pidiendo al usuario hasta que ingrese un valor válido? ¿`while` o `do-while`? ¿Cuál comunica mejor la intención de "pedir al menos una vez"?'),
('h-population-4', 'p-population-c', 4, '¿Cuál es la condición de parada del bucle de simulación? El enunciado dice "alcanzar o superar". Si la población inicial ya es igual al objetivo, ¿cuántos años deberías imprimir? Revisa el caso de prueba `9 → 9`.')
ON CONFLICT(id) DO NOTHING;

-- =============================================================
-- FLASHCARDS: Semana 0
-- =============================================================

INSERT INTO flashcards (id, week, question, answer, order_index) VALUES
('fc-0-1', 0, '¿Qué es un `bit` y de dónde viene ese nombre?', 'Un `bit` es la unidad mínima de información en informática: puede ser `0` o `1`. El nombre es una contracción de *binary digit* (dígito binario). Representa un transistor en estado apagado (`0`) o encendido (`1`).', 1),
('fc-0-2', 0, '¿Cuántos valores distintos puede representar un `byte`? ¿Por qué ese número?', 'Un `byte` tiene 8 bits y cada bit puede ser `0` o `1`. Esto da 2⁸ = **256** combinaciones posibles, representando valores del 0 al 255. Es la razón por la que los colores RGB van de 0 a 255 por canal.', 2),
('fc-0-3', 0, '¿Por qué las computadoras usan el sistema binario en lugar del decimal?', 'Por razones físicas: un transistor es un interruptor que solo puede estar en dos estados confiables (conduce electricidad o no). Distinguir entre 10 niveles de voltaje distintos (base 10) sería mucho más difícil de fabricar con precisión y más propenso a errores.', 3),
('fc-0-4', 0, '¿Qué es `ASCII` y cuál es su limitación principal?', '`ASCII` es un estándar de 1963 que asigna un número del 0 al 127 a cada carácter del inglés básico (letras, dígitos, puntuación). Su limitación es que solo cubre el inglés: no tiene `ñ`, `á`, caracteres chinos, árabes, emojis ni ningún otro símbolo fuera del inglés básico.', 4),
('fc-0-5', 0, '¿En qué se diferencia `Unicode` de `ASCII`?', '`Unicode` es un estándar moderno que unifica todos los sistemas de escritura del mundo en una sola tabla de más de 1.1 millones de puntos de código, incluyendo emojis. `ASCII` solo define 128 caracteres del inglés. `Unicode` con codificación `UTF-8` es compatible con `ASCII` para los primeros 128 caracteres.', 5),
('fc-0-6', 0, '¿Qué es un algoritmo? Menciona sus tres propiedades esenciales.', 'Un algoritmo es una secuencia finita, precisa y sin ambigüedad de pasos para resolver un problema. Sus tres propiedades esenciales son: (1) **Correcto** — produce la respuesta correcta para todas las entradas válidas. (2) **Finito** — siempre termina. (3) **Eficiente** — usa los recursos (tiempo, memoria) de forma razonable.', 6),
('fc-0-7', 0, '¿Por qué la búsqueda binaria es más eficiente que la búsqueda lineal? ¿Cuándo no se puede usar?', 'La búsqueda lineal revisa cada elemento uno a uno: hasta O(n) pasos. La búsqueda binaria divide el espacio a la mitad en cada paso: O(log n) pasos. Para 1,024 elementos, lineal necesita hasta 1,024 pasos; binaria solo 10. La condición: **los datos deben estar ordenados**. Si no están ordenados, no se puede aplicar.', 7),
('fc-0-8', 0, '¿Qué es el `pseudocódigo` y para qué sirve?', 'El `pseudocódigo` es una descripción informal de un algoritmo escrita en lenguaje humano estructurado, sin la sintaxis exacta de ningún lenguaje de programación. Se usa para planificar la lógica antes de codificar, facilitando la detección de errores de diseño sin preocuparse por detalles sintácticos.', 8)
ON CONFLICT(id) DO NOTHING;
