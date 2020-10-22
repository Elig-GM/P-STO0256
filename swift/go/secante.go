package main

import (
	"fmt"
	"math"
)

func f(x float64) float64 {
    return (math.Exp(-math.Pow(x, 2) + 1) - 4 * math.Pow(x, 3) + 25)
} 


func main() {
    var x0, x1, xa, fx1, den, tol float64 = 1, 2, 0, 0, 0, 0.0005
    fx0 := f(x0) 
    e := tol + 1
    var iter, n, error int = 100, 0, 0;

    fmt.Printf("%4s %13s %13s %13s\n", "n", "xn", "f(x)", "Error");

    if ( fx0 == 0) {
        fmt.Printf("\nX0 = %f es una Raíz\n", x0);
    } else { 
        fx1 = f(x1);
        den = fx1 - fx0; 
        fmt.Printf("|%4d| %13E| %13E| %13s|\n", n, x0, fx0, "");
        n++;
        fmt.Printf("|%4d| %13E| %13E| %13s|\n", n, x1, fx1, "");
        for (e > tol && fx1 != 0 && den != 0 && n < iter - 1) {
            xa = x1 - fx1 * (x1 - x0) / den;
            e = (xa - x1); 
            if(error == 1) {
                e /= x1
            }
            e = math.Abs(e); 
            x0 = x1;
            fx0 = fx1;
            x1 = xa;
            fx1 = f(x1);
            den = fx1 - fx0;
            n++;
            fmt.Printf("|%4d| %13E| %13E| %13E|\n", n, x1, fx1, e);
        }
    }

    fmt.Printf("\nLa raiz es de f(x) = exp(-x^2+1) - 4x^3 + 25; es: %f\n", x1);

}