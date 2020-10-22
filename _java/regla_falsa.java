package _java;

public class regla_falsa {
    public static double f(double x) {
        return Math.exp(3*x - 12) + x * Math.cos(3*x) - Math.pow(x, 2) + 4;
    }

    public static void main(String[] args) {
        double xi = 2, xs = 3, xa, xm = 0.0, fxi = f(xi), fxs = f(xs), fxm, tol = 0.0005, e = tol + 1;
        int iter = 100, n = 0, error = 0;

        System.out.printf("\n%4s %10s %10s %10s %12s %12s\n\n", "n", "xi", "xs", "xm", "f(xm)", "Error");

        if ( fxi == 0) {
            System.out.printf("\nXi = %15.f es una Raíz\n", xi);
        } else if (fxs == 0) {
            System.out.printf("\nXs = %.15f es una Raíz\n", xs);
        } else if ((fxi * fxs) < 0) { 
            xm = xi - fxi * (xs - xi) / (fxs - fxi);
            fxm = f(xm); 
            System.out.printf("|%4d| %10f| %10f| %10f| %10f| %10s|\n", n, xi, xs, xm, fxm, "");
            while (e > tol && fxm != 0 && n < iter - 1) {
                if (fxi * fxm < 0) {
                    xs = xm;
                    fxs = fxm;
                } else {
                    xi = xm;
                    fxi = fxm;
                }
                xa = xm;
                xm = xi - fxi * (xs - xi) / (fxs - fxi);
                fxm = f(xm);
                e = (xm - xa); 
                if(error == 1) e /= xm;
                e = Math.abs(e); 
                n++;
                System.out.printf("|%4d| %10f| %10f| %10f| %10f| %10f|\n", n, xi, xs, xm, fxm, e);
            }
        }

        System.out.printf("\nLa raiz es de f(x) = exp(3x-12) + x*cos(3x) - x^2 + 4; es: %.15f\n", xm);

    }
}
