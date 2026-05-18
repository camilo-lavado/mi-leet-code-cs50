# Product Requirements Document (PRD)
## Proyecto: LocalCode — CS50 en Español (MVP)

### 1. Visión

LocalCode es una plataforma self-hosted diseñada para hacer accesible el curso completo **Harvard CS50 2026** a hispanohablantes. El objetivo es que una persona sin conocimiento de inglés pueda completar íntegramente el curso, leer el contenido, escribir código, ejecutarlo y validarlo — todo en español.

> **Hipótesis de éxito:** Si el autor de la plataforma logra completar el CS50 usándola exclusivamente, el producto habrá demostrado su valor.

---

### 2. Usuarios Objetivo

- Hispanohablantes con deseos de aprender programación desde cero.
- Estudiantes que intentaron el CS50 original pero encontraron la barrera del inglés.
- Ambiente: uso local/personal, sin necesidad de conexión a internet (salvo instalación inicial).

---

### 3. Funcionalidades Core (MVP)

#### 3.1 Contenido del Curso
- Semanas 0–10 + módulo de Ciberseguridad del CS50 2026.
- Cada semana contiene:
  - **Transcripción** de la clase traducida al español.
  - **Material complementario propio** que refuerza conceptos con ejemplos adicionales.
  - **Problem Sets** oficiales del CS50 adaptados al español.

#### 3.2 Catálogo de Problemas
- Lista navegable de problemas, filtrable por semana y dificultad.
- Dificultad etiquetada como: **Fácil / Media / Difícil**.
- Cada problema incluye: descripción en español, ejemplos de entrada/salida, pistas opcionales.

#### 3.3 Editor de Código Interactivo
- Editor Monaco embebido (mismo motor que VS Code).
- Soporte de lenguajes: C, Python, SQL, JavaScript.
- Syntax highlighting y autocompletado básico.

#### 3.4 Motor de Ejecución
- Ejecución segura en contenedores Docker efímeros.
- Límites de seguridad: sin red, 128MB RAM, timeout de 5 segundos.
- Captura de stdout, stderr y código de salida.

#### 3.5 Sistema de Evaluación
- Validación automática del output contra casos de prueba predefinidos.
- Respuesta: `Aceptado` / `Fallido` con detalle por caso de prueba.
- Métricas mostradas: tiempo de ejecución (ms) y memoria usada (KB).

#### 3.6 Seguimiento de Progreso
- Estado por problema: `Sin intentar` / `En progreso` / `Resuelto`.
- Vista de progreso por semana (X de Y problemas completados).
- Historial de submissions con fecha y resultado.

#### 3.7 Inclusividad y Accesibilidad Pedagógica
- **Onboarding Interactivo (Semana 0.5):** Un tutorial guiado dentro del propio editor para que el usuario pierda el miedo a la interfaz, aprendiendo a compilar y ejecutar un "Hello World" trivial antes del curso real.
- **Sistema de Pistas Socráticas:** Botones de pistas progresivas por cada problema, que no dan la respuesta, sino que guían al estudiante con preguntas (ej: *"¿Te has asegurado de que el bucle no empiece en 0 si buscas contar desde 1?"*).
- **Guías de Debugging Integradas:** Tooltips o una guía permanente sobre cómo leer errores comunes del compilador de C o de Python (ej: *"Segmentation fault (core dumped)"*).
- **Gamificación Básica (Motivación):** 
  - Rachas de estudio (Study Streaks) para fomentar constancia.
  - Pequeñas insignias (Badges) visuales al completar semanas enteras.

---

### 4. Fuera del Alcance (MVP)

- Autenticación de usuarios multiplataforma (sigue siendo ambiente mono-usuario local).
- Deployment en la nube pública.
- Foros de discusión o features sociales.
- Inteligencia Artificial Generativa para dar respuestas (nos enfocamos en el aprendizaje Socrático estático).

---

### 5. Flujo Principal del Usuario

```
1. Usuario abre la plataforma en su navegador (localhost).
2. Selecciona una semana del curso desde el sidebar.
3. Lee el contenido de la semana (teoría en español).
4. Selecciona un problema de esa semana.
5. Lee la descripción del problema y los casos de prueba.
6. Escribe su solución en el editor Monaco.
7. Hace clic en "Ejecutar Código" → Ve output en tiempo real.
8. Hace clic en "Enviar Solución" → Sistema evalúa contra todos los test cases.
9. Recibe resultado: Aceptado ✅ o Fallido ❌ con detalle.
10. Problema marcado como resuelto en el tracker de progreso.
```

---

### 6. Criterios de Éxito del MVP

- [ ] Las 12 semanas del CS50 tienen contenido en español disponible.
- [ ] Al menos 30 problemas cargados con test cases validados.
- [ ] El motor de ejecución corre código C y Python correctamente.
- [ ] El autor completa al menos las primeras 3 semanas usando la plataforma.

---

### 7. Subtareas pendientes para el MVP

#### Plataforma (frontend + backend)
- [ ] Agregar filtro por semana y dificultad en `GET /api/v1/problems`
- [ ] Implementar endpoint `GET /api/v1/progress` para tracker de progreso
- [ ] Implementar endpoint `GET /api/v1/submissions?problem_id=X` para historial
- [ ] Vista Dashboard con sidebar de semanas navegables
- [ ] Vista de contenido de semana (lectura + complemento + glosario)
- [ ] Indicadores visuales de progreso por problema (`Sin intentar` / `Resuelto`)
- [ ] Botón "Ejecutar" (run-only, sin evaluar) separado de "Enviar"

#### Contenido (ver 06_CONTENT_STRATEGY.md para detalle)
- [ ] Semana 1 completa: 3 problemas (Mario, Cash, Credit) + contenido teórico
- [ ] Semana 2 completa: 4 problemas (Scrabble, Readability, Caesar, Substitution)
- [ ] Semana 3 completa: 3 problemas (Plurality, Runoff, Tideman)

#### Motor de ejecución
- [ ] Validar que el executor funciona con los 10 problemas de semanas 1-3
- [ ] Agregar soporte para SQL (necesario para Semana 7)
- [ ] Agregar soporte para JavaScript (necesario para Semana 8)

#### Validación
- [ ] Prueba end-to-end: abrir frontend → seleccionar problema → escribir código → evaluar
- [ ] Prueba con código malicioso (fork bomb, file system access) — debe ser rechazado por Docker
- [ ] Prueba de usabilidad: una persona sin inglés completa la Semana 1 sin ayuda externa