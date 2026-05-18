# Estrategia de Contenido
## Proyecto: LocalCode — CS50 en Español

### 1. Filosofía Pedagógica

El contenido de LocalCode no es solo una traducción literal. Es una **adaptación pedagógica interactiva** para hispanohablantes, que combina:

1. **Transcripción del CS50 original** — La clase de David Malan traducida al español, preservando la secuencia lógica y los ejemplos.
2. **Material complementario propio** — Explicaciones adicionales, analogías en contexto latinoamericano, y ejercicios extra para reforzar conceptos difíciles.
3. **Active Recall (Recordación Activa)** — En lugar de solo leer, el usuario debe responder pequeños quizes intermedios ("Flashcards") antes de avanzar al código. Esto fuerza al cerebro a recuperar la información en lugar de solo reconocerla.
4. **Técnica de Feynman** — Antes de enviar la solución de un problema complejo, la plataforma pedirá al usuario que explique con sus propias palabras (en texto) cómo funciona su algoritmo. Explicarlo de manera sencilla expone los huecos en el conocimiento.

---

### 2. Estructura de cada Semana

Cada semana sigue esta estructura:

```
/semana-N/
  ├── lectura.md          → Transcripción traducida de la clase
  ├── complemento.md      → Material propio adicional
  ├── glosario.md         → Términos técnicos con definición en español
  └── problemas/
        ├── problema-1.md → Descripción + casos de prueba
        ├── problema-2.md
        └── ...
```

---

### 3. Plan de Contenido por Semana

#### Semana 0 — Scratch: Pensamiento Computacional
- **Conceptos:** Algoritmos, funciones, condicionales, bucles, variables, eventos.
- **Problemas:** Crear un proyecto en Scratch (evaluación manual).
- **Complemento:** ¿Qué es un algoritmo? Ejemplos de la vida cotidiana.

#### Semana 0.5 — Onboarding a LocalCode (NUEVO)
- **Conceptos:** Interfaz de usuario, editor de texto, botón Ejecutar vs Enviar, lectura de resultados.
- **Problemas:** `Hello World` (Imprimir texto en pantalla).
- **Complemento:** "Guía Definitiva de Debugging" — Cómo perder el miedo al texto rojo en la consola y entender qué significa un "Segmentation fault" o un "Syntax error".

#### Semana 1 — C: Fundamentos
- **Conceptos:** Compilación, tipos de datos, operadores, printf/scanf, condicionales, bucles.
- **Problemas:** Mario (pirámide), Cash (cambio de monedas), Credit (validación Luhn).
- **Complemento:** Cómo funciona un compilador, el camino del código fuente al ejecutable.

#### Semana 2 — Arreglos
- **Conceptos:** Arrays, strings, argumentos de línea de comandos, cifrados.
- **Problemas:** Scrabble, Readability (legibilidad), Caesar (cifrado), Substitution.
- **Complemento:** Cómo la memoria almacena un array, ASCII y su relación con los caracteres.

#### Semana 3 — Algoritmos
- **Conceptos:** Búsqueda lineal/binaria, ordenamiento (burbuja, selección, merge), notación Big-O.
- **Problemas:** Sort (identificar algoritmo), Plurality (votación), Runoff, Tideman.
- **Complemento:** Visualización gráfica de Big-O, ¿cuándo importa la eficiencia?

#### Semana 4 — Memoria
- **Conceptos:** Punteros, aritmética de punteros, malloc/free, archivos.
- **Problemas:** Volume (audio), Filter (imágenes BMP), Recover (recuperación forense).
- **Complemento:** El heap vs el stack, por qué los punteros son difíciles (y cómo dominarlos).

#### Semana 5 — Estructuras de Datos
- **Conceptos:** Listas enlazadas, árboles, tablas hash, tries.
- **Problemas:** Inheritance (herencia genética), Speller (corrector ortográfico).
- **Complemento:** Cuándo usar cada estructura, trade-offs de tiempo vs memoria.

#### Semana 6 — Python
- **Conceptos:** Sintaxis Python, tipos, funciones, archivos, excepciones, librerías.
- **Problemas:** Versiones Python de Mario, Cash, Readability + DNA.
- **Complemento:** Python vs C — qué ganamos y qué perdemos en abstracción.

#### Semana 7 — SQL
- **Conceptos:** Bases de datos relacionales, SELECT, INSERT, UPDATE, DELETE, JOIN, índices.
- **Problemas:** Songs (Spotify data), Movies (IMDB), Fiftyville (mystery).
- **Complemento:** ¿Cómo piensa una base de datos? El motor SQLite por dentro.

#### Semana 8 — HTML, CSS y JavaScript
- **Conceptos:** DOM, HTML semántico, CSS, eventos JS, fetch API.
- **Problemas:** Trivia (quiz interactivo), Homepage (sitio personal).
- **Complemento:** El navegador como runtime, diferencia entre frontend y backend.

#### Semana 9 — Flask
- **Conceptos:** Rutas, templates Jinja, formularios, sesiones, APIs REST.
- **Problemas:** Birthdays (CRUD), Finance (simulador de bolsa).
- **Complemento:** Cómo fluye una request HTTP desde el navegador hasta la DB y de vuelta.

#### Semana 10 — Emoji y Unicode
- **Conceptos:** Encoding, UTF-8, Unicode, representación binaria de caracteres.
- **Complemento:** Por qué los emoji son complicados para los programadores.

#### Módulo Final — Ciberseguridad
- **Conceptos:** Hashing, salting, HTTPS, SQL injection, XSS, ingeniería social.
- **Complemento:** Amenazas reales con ejemplos de noticias en español.

---

### 4. Convenciones de Escritura

- Tutear al lector ("tú escribes", "tú ejecutas").
- Usar analogías locales cuando sea posible.
- Los términos técnicos se mantienen en inglés pero se explican en español (ej: "el *heap* — la zona de memoria dinámica").
- Cada concepto difícil incluye al menos un ejemplo de código funcional comentado en español.

---

### 5. Criterios de Calidad del Contenido

- [ ] El contenido de cada semana puede leerse independientemente.
- [ ] Cada problema tiene mínimo 3 casos de prueba (al menos 1 oculto).
- [ ] El material complementario agrega valor real, no repite la transcripción.
- [ ] Un lector sin inglés puede completar la semana sin consultar fuentes externas.

---

### 6. Subtareas de producción de contenido

#### Semana 0 — Scratch (sin executor, solo lectura)
- [ ] Escribir `content/semana-0/lectura.md`
- [ ] Escribir `content/semana-0/complemento.md`
- [ ] Escribir `content/semana-0/glosario.md`

#### Semana 1 — C: Fundamentos
- [ ] Escribir `content/semana-1/lectura.md` (transcripción CS50 traducida)
- [ ] Escribir `content/semana-1/complemento.md` (cómo funciona un compilador)
- [ ] Escribir `content/semana-1/glosario.md`
- [ ] Escribir `content/semana-1/problemas/mario.md` + 3 test cases en BD
- [ ] Escribir `content/semana-1/problemas/cash.md` + 3 test cases en BD
- [ ] Escribir `content/semana-1/problemas/credit.md` + 3 test cases en BD

#### Semana 2 — Arreglos
- [ ] Escribir `content/semana-2/lectura.md` + `complemento.md` + `glosario.md`
- [ ] `content/semana-2/problemas/scrabble.md` + test cases
- [ ] `content/semana-2/problemas/readability.md` + test cases
- [ ] `content/semana-2/problemas/caesar.md` + test cases

#### Semana 3 — Algoritmos
- [ ] Escribir `content/semana-3/lectura.md` + `complemento.md` + `glosario.md`
- [ ] `content/semana-3/problemas/plurality.md` + test cases
- [ ] `content/semana-3/problemas/runoff.md` + test cases

#### Semana 4 — Memoria
- [ ] Escribir `content/semana-4/lectura.md` + `complemento.md` + `glosario.md`
- [ ] `content/semana-4/problemas/volume.md` + test cases
- [ ] `content/semana-4/problemas/filter.md` + test cases

#### Semana 5 — Estructuras de Datos
- [ ] Escribir `content/semana-5/lectura.md` + `complemento.md` + `glosario.md`
- [ ] `content/semana-5/problemas/speller.md` + test cases

#### Semana 6 — Python
- [ ] Escribir `content/semana-6/lectura.md` + `complemento.md` + `glosario.md`
- [ ] `content/semana-6/problemas/mario.md` (versión Python) + test cases
- [ ] `content/semana-6/problemas/cash.md` (versión Python) + test cases
- [ ] `content/semana-6/problemas/readability.md` (versión Python) + test cases
- [ ] `content/semana-6/problemas/dna.md` + test cases

#### Semana 7 — SQL
- [ ] Escribir `content/semana-7/lectura.md` + `complemento.md` + `glosario.md`
- [ ] `content/semana-7/problemas/songs.md` + test cases SQL
- [ ] `content/semana-7/problemas/movies.md` + test cases SQL
- [ ] `content/semana-7/problemas/fiftyville.md` + test cases SQL
- [ ] ⚠️ Requiere soporte SQL en el executor (ver 04_EXECUTION_ENGINE.md)

#### Semana 8 — HTML, CSS, JavaScript
- [ ] Escribir `content/semana-8/lectura.md` + `complemento.md` + `glosario.md`
- [ ] `content/semana-8/problemas/trivia.md` (evaluación manual o JS)
- [ ] `content/semana-8/problemas/homepage.md` (evaluación manual)
- [ ] ⚠️ Requiere soporte JavaScript en el executor

#### Semana 9 — Flask
- [ ] Escribir `content/semana-9/lectura.md` + `complemento.md` + `glosario.md`
- [ ] `content/semana-9/problemas/birthdays.md` (evaluación adaptada)
- [ ] `content/semana-9/problemas/finance.md` (evaluación adaptada)

#### Semana 10 + Ciberseguridad
- [ ] Escribir `content/semana-10/lectura.md` + `complemento.md` + `glosario.md`
- [ ] Escribir `content/ciberseguridad/lectura.md` + `complemento.md`

#### Calidad
- [ ] Revisar que cada problema tiene ≥3 test cases (≥1 oculto)
- [ ] Revisar ortografía y gramática de todo el contenido en español
- [ ] Validar que todos los test cases pasan con la solución correcta
- [ ] Validar que todos los test cases fallan con soluciones incorrectas comunes
