#include <stdio.h>
#include <math.h>

#define f(x) (exp(3*x - 12) + x * cos(3*x) - pow(x, 2) +4) // Definimos la funcion de la que se busca la raiz

int main()
{
    double xi = 2, xs = 3, xm, xa, tol = 0.00005, e = tol + 1, fxm, fxi = f(xi), fxs = f(xs);
    int iter = 100, error = 0, n = 0;

    printf("|%4s| %10s| %10s| %10s| %10s| %10s|\n", "n", "xi", "xs", "xm", "f(xm)", "Error");

    if(fxi == 0) {
        printf("\nXi = %f es una Raíz\n", xi);
    } else if (fxs == 0) {
        printf("\nXs = %f es una Raíz\n", xs);
    } else if (fxi * fxs < 0) {
        xm = (xi + xs) / 2;
        fxm = f(xm);
        printf("|%4d| %10f| %10f| %10f| %10f| %10f|\n", n, xi, xs, xm, fxm, "");
        while (e > tol && fxm != 0 && n < iter - 1) {
            if (fxi * fxm < 0) {
                xs = xm;
                fxs = fxm;
            } else {
                xi = xm;
                fxi = fxm;
            }
            xa = xm;
            xm = (xi + xs) / 2;
            fxm = f(xm);
            e = xm - xa;
            if (error == 1) e /= xm;
            e = fabs(e);
            n++;
            printf("|%4d| %10f| %10f| %10f| %10f| %10f|\n", n, xi, xs, xm, fxm, e);
        }
    }

    printf("\nLa raiz es de f(x) = x + 2; es: %f\n", xm);

    return 0;
}