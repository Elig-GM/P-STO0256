#include <stdio.h>
#include <math.h>

#define f(x) (x * exp(x) - pow(x,2) - 5 * x - 3) // Definimos la funcion de la que se busca la raiz
#define g(x) ((x * exp(x) - pow(x,2) - 3)/5)

int main()
{
    double xi = -0.5, x = xi, fx = f(x), tol = 0.0005, e = tol + 1;
    int iter = 100, n = 0, error = 0;
    printf("|%4s| %10s| %10s| %10s|\n", "n", "x", "f(x)", "Error");

    printf("|%4d| %10f| %10f| %10f|\n", n, x, fx, "");

    while (e > tol && fx != 0 && n < iter - 1) {
        x = g(xi);
        fx = f(x);
        e = (x - xi); 
        if(error == 1) e /= x;
        e = fabs(e); 
        xi = x;
        n++;
        printf("|%4d| %10f| %10f| %10f|\n", n, x, fx, e);
    }

    printf("\nLa raiz es de f(x) = x * exp(x) - x^2 - 5x - 3; es: %f\n", x);

    return 0;
}