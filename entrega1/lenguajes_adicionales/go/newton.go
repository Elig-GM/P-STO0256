package main

import (
	"fmt"
	"math"
)


func f(x float64) float64 { 
    return (math.Exp(-x) - math.Pow(x,2) * math.Cos(2*x - 4) + 6*x + 3)
}

func df(x float64) float64 {
    return (-math.Exp(-x) - (2*x * math.Cos(2*x - 4) - 2*math.Pow(x,2) * math.Sin(2*x - 4)) + 6)
}

func main() {
    var xi, dfx, tol float64 = -0.5, 0, 0.0005 
    x := xi 
    fx := f(x) 
    e := tol + 1
    var iter, n, error int = 100, 0, 0

    fmt.Printf("%4s %13s %13s %13s\n", "n", "x", "f(x)", "Error")

    fmt.Printf("|%4d| %13E| %13E| %13s|\n", n, x, fx, "")

    for (e > tol && fx != 0 && n < iter - 1) {
        dfx = df(x)
        x -= fx/dfx
        fx = f(x)
        e = (xi - x) 
        if(error == 1) {
            e /= x
        } 
        e = math.Abs(e) 
        xi = x
        n++
        fmt.Printf("|%4d| %13E| %13E| %13E|\n", n, x, fx, e)
    }

    fmt.Printf("\nLa raiz es de f(x) = x * exp(x) - x^2 - 5x - 3; es: %f\n", x)

}