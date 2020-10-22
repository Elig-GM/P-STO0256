package main

import (
	"fmt"
	"math"
)


func f(x float64) float64 {
    return (x * math.Exp(x) - math.Pow(x,2) - 5 * x - 3) 
} 

func g(x float64) float64 {
    return ((x * math.Exp(x) - math.Pow(x,2) - 3)/5)
}

func main() {
    var xi, tol float64 = -0.5, 0.0005 
    e := tol + 1
    x := xi 
    fx := f(x)
    var iter, n, error int = 100, 0, 0
    fmt.Printf("%4s %13s %13s %13s\n", "n", "x", "f(x)", "E")

    fmt.Printf("|%4d| %13E| %13E| %13s|\n", n, x, fx, "")

    for (e > tol && fx != 0 && n < iter - 1) {
        x = g(xi)
        fx = f(x)
        e = (x - xi) 
        if(error == 1) {
            e /= x
        }
        e = math.Abs(e) 
        xi = x
        n++
    fmt.Printf("|%4d| %13E| %13E| %13E|\n", n, x, fx, e)
    }

    fmt.Printf("\nLa raiz es de f(x) = x * exp(x) - x^2 - 5x - 3, es: %f\n", x)
}