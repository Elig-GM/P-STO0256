package _java;

public class newton {

    public static double f(double x) {
        return Math.exp(-x) - Math.pow(x,2) * Math.cos(2*x - 4) + 6*x + 3;
    }

    public static double df(double x) {
        return -Math.exp(-x) - (2*x * Math.cos(2*x - 4) - 2*Math.pow(x,2) * Math.sin(2*x - 4)) + 6;
    }

    public static void main(String[] args) {
        double xi = -0.5, x = xi, fx = f(x), dfx, tol = 0.0005, e = tol + 1;
        int iter = 100, n = 0, error = 0;
        System.out.printf("\n%4s %10s %10s %12s\n\n", "n", "x", "f(x)", "Error");

        System.out.printf("|%4d| %10f| %10f| %10s|\n", n, x, fx, "");

        while (e > tol && fx != 0 && n < iter - 1) {
            dfx = df(x);
            x -= fx/dfx;
            fx = f(x);
            e = (xi - x); 
            if(error == 1) e /= x;
            e = Math.abs(e); 
            xi = x;
            n++;
            System.out.printf("|%4d| %10f| %10f| %10f|\n", n, x, fx, e);
        }

        System.out.printf("\nLa raiz es de f(x) = x * exp(x) - x^2 - 5x - 3; es: %.15f\n", x);
    }
}
