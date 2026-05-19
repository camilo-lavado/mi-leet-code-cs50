#ifndef CS50_H
#define CS50_H

#include <stdbool.h>

typedef char *string;

char get_char(const char *format, ...);
double get_double(const char *format, ...);
float get_float(const char *format, ...);
int get_int(const char *format, ...);
long get_long(const char *format, ...);
string get_string(const char *format, ...);

#endif
