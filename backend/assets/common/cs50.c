#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdarg.h>
#include "cs50.h"

// Helper function to print prompt
static void print_prompt(const char *format, va_list args) {
    if (format != NULL) {
        vprintf(format, args);
        fflush(stdout); // Ensure prompt is printed before input
    }
}

char get_char(const char *format, ...) {
    va_list args;
    va_start(args, format);
    print_prompt(format, args);
    va_end(args);
    
    char c = '\0';
    if (scanf(" %c", &c) != 1) return '\0';
    int ch;
    while ((ch = getchar()) != '\n' && ch != EOF);
    return c;
}

double get_double(const char *format, ...) {
    va_list args;
    va_start(args, format);
    print_prompt(format, args);
    va_end(args);

    double d = 0.0;
    if (scanf("%lf", &d) != 1) return 0.0;
    int ch;
    while ((ch = getchar()) != '\n' && ch != EOF);
    return d;
}

float get_float(const char *format, ...) {
    va_list args;
    va_start(args, format);
    print_prompt(format, args);
    va_end(args);

    float f = 0.0f;
    if (scanf("%f", &f) != 1) return 0.0f;
    int ch;
    while ((ch = getchar()) != '\n' && ch != EOF);
    return f;
}

int get_int(const char *format, ...) {
    va_list args;
    va_start(args, format);
    print_prompt(format, args);
    va_end(args);

    int i = 0;
    if (scanf("%d", &i) != 1) return 0;
    int ch;
    while ((ch = getchar()) != '\n' && ch != EOF);
    return i;
}

long get_long(const char *format, ...) {
    va_list args;
    va_start(args, format);
    print_prompt(format, args);
    va_end(args);

    long l = 0L;
    if (scanf("%ld", &l) != 1) return 0L;
    int ch;
    while ((ch = getchar()) != '\n' && ch != EOF);
    return l;
}

string get_string(const char *format, ...) {
    va_list args;
    va_start(args, format);
    print_prompt(format, args);
    va_end(args);

    char *buf = malloc(1024);
    if (!buf) return NULL;
    
    if (fgets(buf, 1024, stdin) == NULL) {
        free(buf);
        return NULL;
    }
    
    // Remove trailing newline
    size_t len = strlen(buf);
    if (len > 0 && buf[len-1] == '\n') {
        buf[len-1] = '\0';
    }
    // Handle CRLF
    len = strlen(buf);
    if (len > 0 && buf[len-1] == '\r') {
        buf[len-1] = '\0';
    }
    
    return buf;
}
