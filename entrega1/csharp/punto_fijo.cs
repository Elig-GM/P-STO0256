using System;

public class Punto_Fijo
{
    public static double f(double x) {
        return Math.Exp(-x) - Math.Pow(x,2) * Math.Cos(2*x - 4) + 6*x + 3;
    }

    public static double df(double x) {
        return -Math.Exp(-x) - (2*x * Math.Cos(2*x - 4) - 2*Math.Pow(x,2) * Math.Sin(2*x - 4)) + 6;
    }

    public static void Main() {
        double xi = -0.5, x = xi, fx = f(x), dfx, tol = 0.0005, e = tol + 1;
        int iter = 100, n = 0, error = 0;
        Console.WriteLine(String.Format("{0,4:} {1,12:} {2,15:} {3,17:}\n", "n", "x", "f(x)", "Error"));

        Console.WriteLine(String.Format("|{0,4:}| {1,15:E}| {2,15:E}| {3,15:}|", n, x, fx, ""));

        while (e > tol && fx != 0 && n < iter - 1) {
            dfx = df(x);
            x -= fx/dfx;
            fx = f(x);
            e = (xi - x); 
            if(error == 1) e /= x;
            e = Math.Abs(e); 
            xi = x;
            n++;
            Console.WriteLine(String.Format("|{0,4:}| {1,15:E}| {2,15:E}| {3,15:E}|", n, x, fx, e));
        }

        Console.WriteLine("\nLa raiz es de f(x) = x * exp(x) - x^2 - 5x - 3; es: {0:}\n", x);
    }
}