# Plan de Acción: Cierre de Fase 2 e Inicio de Fase 3
## Proyecto: LocalCode — CS50 en Español

**Estado:** Planificado
**Objetivo Actual:** Finalizar el frontend (Dashboard, Progreso) y comenzar la inyección masiva de contenido de las Semanas 0 a 5.

---

### 1. Finalización de la Fase 2 (Frontend MVP)
Aunque el editor, la consola y el evaluador funcionan de maravilla de extremo a extremo, faltan algunas características clave para el aprendizaje guiado.

- [ ] **Estructura por Semanas:** Crear una vista de "Semanas" que liste la teoría y los problemas agrupados (actualmente todos los problemas aparecen en un solo catálogo plano).
- [ ] **Tracker de Progreso Visual:** Implementar iconos y barras de estado (Sin intentar ⚪, En progreso 🟡, Resuelto 🟢) basados en las Submissions guardadas en la base de datos de SQLite.
- [ ] **Módulo de Teoría:** Crear un visor de Markdown en React (usando `react-markdown` o similar) para renderizar las clases magistrales y teoría transcrita y traducida.

### 2. Inicio de la Fase 3 (Contenido Semanas 0–5 en C)
Esta fase transforma la herramienta técnica en una verdadera plataforma educativa. Todo el contenido debe ser extraído de Harvard, traducido al español, y cargado a la plataforma.

#### Tareas por Semana:
- [ ] **Semana 0 — Scratch:** 
  - Subir transcripción de la clase sobre pensamiento computacional.
  - Como Scratch no se puede evaluar por código, agregar preguntas interactivas de opción múltiple (requiere ajustar la base de datos).
- [ ] **Semana 1 — C (Básicos):**
  - Ya tenemos `Mario`.
  - Agregar `Cash` (Cálculo de monedas).
  - Agregar `Credit` (Validación de tarjetas de crédito con Algoritmo de Luhn).
- [ ] **Semana 2 — Arreglos y Cadenas:**
  - `Scrabble` (Calcular el valor de una palabra).
  - `Readability` (Índice de Coleman-Liau).
  - `Caesar` / `Substitution` (Cifrado de texto).
- [ ] **Semana 3 — Algoritmos de Ordenamiento y Búsqueda:**
  - Teoría de Big O, Bubble Sort, Merge Sort.
  - Problemas: `Plurality`, `Runoff`, `Tideman`.
- [ ] **Semana 4 — Memoria (Punteros):**
  - Teoría de Punteros y Heap vs Stack.
  - Problemas: `Volume`, `Filter` (Manipulación de imágenes BMP en C), `Recover`.
- [ ] **Semana 5 — Estructuras de Datos:**
  - Teoría de Hash Tables, Tries y Linked Lists.
  - Problema Final de C: `Speller` (Corrector ortográfico cargando un diccionario en memoria).

### 3. Ajustes de Infraestructura (Requeridos para Fase 3)
- [ ] **Manejo de Archivos Extra en Docker:** Problemas como `Filter` o `Speller` requieren proveer al estudiante de archivos auxiliares (`.bmp`, diccionarios `.txt`). Se debe ajustar el `DockerExecutor` para copiar no solo `code.c` e `input.txt`, sino todo un directorio de "assets" del problema al contenedor.
- [ ] **Evaluación de Múltiples Archivos:** Algunos problemas requieren compilar varios archivos `.c` e importar cabeceras `.h` provistas por CS50 (`cs50.h`).

---
**Nota para la IA y el Usuario:** La próxima sesión debe comenzar abordando el punto 1 (Finalización de Fase 2) o diseñando la inyección de la librería `cs50.h` en Docker para los problemas oficiales.
