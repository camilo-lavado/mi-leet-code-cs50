# Material Complementario: Compilando como un Profesional

En la clase magistral aprendiste la teoría de la compilación. Aquí veremos cómo se aplica esto en la consola real de Linux/macOS y qué hace la herramienta `make`.

---

## 1. El Comando `gcc` Directo

Cuando escribes en tu consola:
```bash
gcc -o hello hello.c
```
Estás llamando directamente al compilador **GCC** (GNU Compiler Collection). La opción `-o hello` le indica a GCC que quieres que el ejecutable final se llame `hello`. Si omites esta opción, el compilador generará un ejecutable predeterminado llamado `a.out` (que viene de *assembler output*).

### Compilar con Múltiples Archivos
Si estás usando funciones definidas en otro archivo (por ejemplo, `cs50.c` para usar `get_int`), debes decírselo al compilador al mismo tiempo:
```bash
gcc -o mi_programa mi_programa.c cs50.c
```
Esto le dice al enlazador (linker) de GCC que combine ambos códigos objeto en un único binario.

---

## 2. El comando `make` no es un compilador

Es una confusión común pensar que `make` compila tu código. En realidad, `make` es una **herramienta de automatización**.
`make` busca un archivo llamado `Makefile` en tu directorio, o usa reglas implícitas del sistema. Cuando ejecutas `make hello`, la utilidad hace lo siguiente tras bambalinas:
1. Comprueba si existe `hello.c`.
2. Ejecuta un comando largo como `clang -fsanitize=signed-integer-overflow -O0 -std=c11 -Wall -Werror -Wextra hello.c -o hello`.
3. Te ahorra tener que escribir todos esos parámetros y banderas de depuración manualmente cada vez.

---

## 3. ¿Qué son los Warnings del Compilador?

Los *Warnings* (advertencias) no impiden que tu programa compile, pero representan un código potencialmente peligroso o incorrecto.
Ejemplo común:
```c
int x;
printf("El valor es %d\n", x);
```
El compilador te dará un warning de **uninitialized variable** (variable no inicializada). Esto ocurre porque `x` contiene "basura en memoria" (el valor residual que estaba en esa celda RAM previamente), lo cual causa un comportamiento impredecible. ¡Nunca ignores un warning!
