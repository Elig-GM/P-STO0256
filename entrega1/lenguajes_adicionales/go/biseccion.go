package main

import (
	"fmt"
	"math"
)

func f(x float64) float64 {
	return (math.Exp(3*x - 12) + x * math.Cos(3*x) - math.Pow(x, 2) +4)
}

func main() {

    var xi, xs, xm, xa, tol, fxm float64 = 2, 3, 0, 0, 0.00005, 0
    e := tol + 1
    fxi := f(xi)
    fxs := f(xs)

    var iter, error, n int = 100, 0, 0

    fmt.Printf("%4s %13s %13s %13s %13s %13s\n", "n", "xi", "xs", "xm", "f(xm)", "Error")

    if(fxi == 0) {
        fmt.Println("\nXi = %f es una Raíz\n", xi)
    } else if (fxs == 0) {
        fmt.Println("\nXs = %f es una Raíz\n", xs)
    } else if (fxi * fxs < 0) {
        xm = (xi + xs) / 2
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
            xm = (xi + xs) / 2
            fxm = f(xm)
            e = xm - xa
            if (error == 1) {
                e /= xm
            }
            e = math.Abs(e)
            n++
            fmt.Printf("|%4d| %13E| %13E| %13E| %13E| %13E|\n", n, xi, xs, xm, fxm, e)
        }
    }

    fmt.Printf("\nLa raiz es de f(x) = x + 2; es: %f\n", xm)

}


