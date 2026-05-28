# Material Complementario: Curiosidades y Ejercicios de Representación

Ya viste la teoría de cómo las computadoras representan información. Aquí exploramos casos curiosos y ejercicios mentales para afianzar esos conceptos.

---

## 1. La Tabla ASCII en la práctica

Una forma concreta de entender `ASCII` es decodificar un mensaje manualmente. Si recibes los bytes `72 101 108 108 111`, ¿qué palabra ocultan?

| Decimal | Binario      | Carácter |
|---------|--------------|----------|
| 72      | `01001000`   | `H`      |
| 101     | `01100101`   | `e`      |
| 108     | `01101100`   | `l`      |
| 108     | `01101100`   | `l`      |
| 111     | `01101111`   | `o`      |

El mensaje es: **Hello**. Así es exactamente como tu computadora lee archivos de texto: como secuencias de números enteros interpretados según la tabla `ASCII` o `Unicode`.

Intenta decodificar este mensaje tú mismo: `87 111 114 108 100`

> **Respuesta:** World

---

## 2. El truco de las mayúsculas y minúsculas

Fíjate en un patrón escondido en la tabla `ASCII`: `A` = 65 y `a` = 97. La diferencia es **32**.

En binario:

```
A = 01000001
a = 01100001
    ^--- solo cambia el bit en la posición 5
```

Solo cambia un bit: el de la posición 5 (contando desde 0 por la derecha). Esto significa que convertir entre mayúsculas y minúsculas es una operación de un solo bit, lo que la hace extremadamente eficiente en hardware.

Esta no es una coincidencia: fue una decisión de diseño deliberada de los creadores de `ASCII` para simplificar el procesamiento de texto.

---

## 3. Emojis: más complejos de lo que parecen

Los emojis de familia como 👨‍👩‍👧‍👦 no son un solo carácter: son una composición de múltiples puntos de código `Unicode` unidos por el carácter especial `ZWJ` (*Zero Width Joiner*, `U+200D`):

```
👨 + ZWJ + 👩 + ZWJ + 👧 + ZWJ + 👦
= 4 emojis + 3 caracteres ZWJ = 7 puntos de código
```

Esto tiene implicaciones prácticas reales. Si en distintos lenguajes preguntas `len("👨‍👩‍👧‍👦")`, obtienes respuestas muy diferentes:

| Lenguaje   | Resultado | ¿Qué está contando?               |
|------------|-----------|-----------------------------------|
| Python 3   | 8         | Puntos de código Unicode          |
| JavaScript | 11        | Unidades de codificación UTF-16   |
| C          | 25        | Bytes en UTF-8                    |
| Swift      | 1         | Caracteres percibidos visualmente |

¿Cuál es la "correcta"? Depende del contexto. Por eso en programación siempre hay que ser explícito sobre qué se entiende por "longitud" de una cadena de texto.

---

## 4. Conversión decimal → binario: paso a paso

El algoritmo para convertir un número decimal a binario es dividir repetidamente por 2 y anotar los restos. Al final, se leen de abajo hacia arriba.

**Ejemplo: convertir 42 a binario**

```
42 ÷ 2 = 21, resto 0  ← bit menos significativo
21 ÷ 2 = 10, resto 1
10 ÷ 2 =  5, resto 0
 5 ÷ 2 =  2, resto 1
 2 ÷ 2 =  1, resto 0
 1 ÷ 2 =  0, resto 1  ← bit más significativo

Leer restos de abajo hacia arriba: 101010
```

Verificación: 32 + 8 + 2 = **42** ✓

**Practica con estos números:**

| Decimal | Binario (respuesta) |
|---------|---------------------|
| 13      | `1101`              |
| 100     | `1100100`           |
| 128     | `10000000`          |
| 255     | `11111111`          |

Nota: 255 en binario es 8 unos (`11111111`). Es el valor máximo de un `byte` y la razón por la que los colores RGB van de 0 a 255 por canal.
