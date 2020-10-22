package main

import (
	"fmt"
	"math"
)

func f(x float64) float64 {
    return (math.Exp(3*x - 12) + x * math.Cos(3*x) - math.Pow(x, 2) + 4) // Definimos la funcion de la que se busca la raiz
}


func main() {
    var xi, xs, xa, xm, fxm, tol float64 = 2, 3, 0, 0, 0, 0.0005 
    fxi := f(xi)
    fxs := f(xs) 
    e := tol + 1

    var iter, n, error int = 100, 0, 0

    fmt.Printf("%4s %13s %13s %13s %13s %13s\n", "n", "xi", "xs", "xm", "f(xm)", "Error")

    if ( fxi == 0) {
        fmt.Printf("\nXi = %f es una Raíz\n", xi)
    } else if (fxs == 0) {
        fmt.Printf("\nXs = %f es una Raíz\n", xs)
    } else if ((fxi * fxs) < 0) { 
        xm = xi - fxi * (xs - xi) / (fxs - fxi)
        fxm = f(xm) 
        fmt.Printf("|%4d| %13E| %13E| %13E| %13E| %13s|\n", n, xi, xs, xm, fxm, "")
        for (e > tol && fxm != 0 && n < iter - 1) {
            if (fxi * fxm < 0) {
                xs = xm
                fxs = fxm
            } else {
                xi = xm
                fxi = fxm
            }
            xa = xm
            xm = xi - fxi * (xs - xi) / (fxs - fxi)
            fxm = f(xm)
            e = (xm - xa) 
            if(error == 1) {
                e /= xm
            }
            e = math.Abs(e) 
            n++
            fmt.Printf("|%4d| %13E| %13E| %13E| %13E| %13E|\n", n, xi, xs, xm, fxm, e)
        }
    }

    fmt.Printf("\nLa raiz es de f(x) = exp(3x-12) + x*cos(3x) - x^2 + 4, es: %f\n", xm)

}