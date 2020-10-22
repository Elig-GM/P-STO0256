using System;

public class Secante
{
    public static double f(double x) {
        return Math.Exp(-Math.Pow(x, 2) + 1) - 4 * Math.Pow(x, 3) + 25;
    }

    public static void Main() {
        double x0 = 1, x1 = 2, xa, fx0 = f(x0), fx1, den, tol = 0.0005, e = tol + 1;
        int iter = 100, n = 0, error = 0;

        Console.WriteLine(String.Format("{0,4:} {1,12:} {2,15:} {3,17:}\n", "n", "xn", "f(x)", "Error"));

        if ( fx0 == 0) {
            Console.WriteLine("\nX0 = %f es una Raíz\n", x0);
        } else { 
                fx1 = f(x1);
                den = fx1 - fx0; 
            Console.WriteLine(String.Format("|{0,4:}| {1,15:E}| {2,15:E}| {3,15:}|", n, x0, fx0, ""));
            n++;
            Console.WriteLine(String.Format("|{0,4:}| {1,15:E}| {2,15:E}| {3,15:}|", n, x1, fx1, ""));
            while (e > tol && fx1 != 0 && den != 0 && n < iter - 1) {
                xa = x1 - fx1 * (x1 - x0) / den;
                e = (xa - x1); 
                if(error == 1) e /= x1;
                e = Math.Abs(e); 
                x0 = x1;
                fx0 = fx1;
                x1 = xa;
                fx1 = f(x1);
                den = fx1 - fx0;
                n++;
                Console.WriteLine(String.Format("|{0,4:}| {1,15:E}| {2,15:E}| {3,15:E}|", n, x1, fx1, e));
            }
        }

        Console.WriteLine("\nLa raiz es de f(x) = exp(-x^2+1) - 4x^3 + 25; es: {0:}", x1);
    }
}