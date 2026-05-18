# Estrategia de Contenido
## Proyecto: LocalCode — CS50 en Español

### 1. Filosofía

El contenido de LocalCode no es solo una traducción literal. Es una **adaptación pedagógica** para hispanohablantes, que combina:

1. **Transcripción del CS50 original** — La clase de David Malan traducida al español, preservando la secuencia lógica y los ejemplos.
2. **Material complementario propio** — Explicaciones adicionales, analogías en contexto latinoamericano, y ejercicios extra para reforzar conceptos difíciles.

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
