package _java;

public class secante {
    public static double f(double x) {
        return Math.exp(-Math.pow(x, 2) + 1) - 4 * Math.pow(x, 3) + 25;
    }

    public static void main(String[] args) {
        double x0 = 1, x1 = 2, xa, fx0 = f(x0), fx1, den, tol = 0.0005, e = tol + 1;
        int iter = 100, n = 0, error = 0;

        System.out.printf("\n%4s %10s %10s %12s\n\n", "n", "xn", "f(x)", "Error");

        if ( fx0 == 0) {
            System.out.printf("\nX0 = %f es una Raíz\n", x0);
        } else { 
                fx1 = f(x1);
                den = fx1 - fx0; 
            System.out.printf("|%4d| %10f| %10f| %10s|\n", n, x0, fx0, "");
            n++;
            System.out.printf("|%4d| %10f| %10f| %10s|\n", n, x1, fx1, "");
            while (e > tol && fx1 != 0 && den != 0 && n < iter - 1) {
                xa = x1 - fx1 * (x1 - x0) / den;
                e = (xa - x1); 
                if(error == 1) e /= x1;
                e = Math.abs(e); 
                x0 = x1;
                fx0 = fx1;
                x1 = xa;
                fx1 = f(x1);
                den = fx1 - fx0;
                n++;
                System.out.printf("|%4d| %10f| %10f| %10f|\n", n, x1, fx1, e);
            }
        }

        System.out.printf("\nLa raiz es de f(x) = exp(-x^2+1) - 4x^3 + 25; es: %f\n", x1);
    }
}
