#include <stdio.h>
#include <math.h>

#define f(x) (exp(-pow(x, 2) + 1) - 4 * pow(x, 3) + 25) // Definimos la funcion de la que se busca la raiz


int main()
{
    double x0 = 1, x1 = 2, xa, fx0 = f(x0), fx1, den, tol = 0.0005, e = tol + 1;
    int iter = 100, n = 0, error = 0;

    printf("|%4s| %10s| %10s| %10s|\n", "n", "xn", "f(x)", "Error");

    if ( fx0 == 0) {
        printf("\nX0 = %f es una Raíz\n", x0);
    } else { 
            fx1 = f(x1);
            den = fx1 - fx0; 
        printf("|%4d| %10f| %10f| %10f|\n", n, x0, fx0, "");
        n++;
        printf("|%4d| %10f| %10f| %10f|\n", n, x1, fx1, "");
        while (e > tol && fx1 != 0 && den != 0 && n < iter - 1) {
            xa = x1 - fx1 * (x1 - x0) / den;
            e = (xa - x1); 
            if(error == 1) e /= x1;
            e = fabs(e); 
            x0 = x1;
            fx0 = fx1;
            x1 = xa;
            fx1 = f(x1);
            den = fx1 - fx0;
            n++;
            printf("|%4d| %10f| %10f| %10f|\n", n, x1, fx1, e);
        }
    }

    printf("\nLa raiz es de f(x) = exp(-x^2+1) - 4x^3 + 25; es: %f\n", x1);

    return 0;
}