using System;

public class Regla_Falsa
{
    public static double f(double x) {
        return Math.Exp(3*x - 12) + x * Math.Cos(3*x) - Math.Pow(x, 2) + 4;
    }

    public static void Main() {
        double xi = 2, xs = 3, xa, xm = 0.0, fxi = f(xi), fxs = f(xs), fxm, tol = 0.0005, e = tol + 1;
        int iter = 100, n = 0, error = 0;

        Console.WriteLine(String.Format("{0,4:} {1,12:} {2,15:} {3,15:} {4,18:} {5,15:}\n", "n", "xi", "xs", "xm", "f(xm)", "Error"));

        if ( fxi == 0) {
            Console.WriteLine("\nXi = %15.f es una Raíz\n", xi);
        } else if (fxs == 0) {
            Console.WriteLine("\nXs = %.15f es una Raíz\n", xs);
        } else if ((fxi * fxs) < 0) { 
            xm = xi - fxi * (xs - xi) / (fxs - fxi);
            fxm = f(xm); 
            Console.WriteLine(String.Format("|{0,4:}| {1,15:E}| {2,15:E}| {3,15:E}| {4,15:E}| {5,15:}|", n, xi, xs, xm, fxm, ""));
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
                e = Math.Abs(e); 
                n++;
                Console.WriteLine(String.Format("|{0,4:}| {1,15:E}| {2,15:E}| {3,15:E}| {4,15:E}| {5,15:E}|", n, xi, xs, xm, fxm, e));
            }
        }

        Console.WriteLine("\nLa raiz es de f(x) = exp(3x-12) + x*cos(3x) - x^2 + 4; es: {0:}\n", xm);

    }
}