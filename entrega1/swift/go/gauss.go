package main

import "fmt"

func main() {

	var a = [4][5]float64{
		{20.0, -1.0, 3.0, 4.0, 30.0}, 
		{6.0, 23.0, 4.0, 3.0, -10.0}, 
		{7.0, 21.0, 46.0, 9.0, 20.0}, 
		{-3.0, -9.0, 12.0, 38.0, -14.0}}
	var x [4]float64
	var b, temp float64
	var n, cont int = 4, 1
	var i, j, k int

	for j = 0; j <= n-1; j++ {
		for i = j + 1; i <= n-1; i++ {
			b = a[i][j] / a[j][j]
			for k = 0; k <= n; k++ {
				a[i][k] = a[i][k] - b*a[j][k]
			}
		}
	}

	fmt.Print("\nSolucion:\n\n")

	for i = 0; i < n; i++ {
		fmt.Print("|")
		for j = 0; j <= n; j++ {
			if j != n {
				fmt.Printf(" %5.1f ", a[i][j])
			} else {
				fmt.Printf("| %5.1f |\n", a[i][j])
			}
		}
	}

	x[0] = a[n-1][n] / a[n-1][n-1]
	fmt.Printf("\nX4: %.11f ", x[0])

	for i = n - 2; i > -1; i-- {
		temp = a[i][n]
		for j, k = i+1, cont-1; j < n; j, k = j+1, k-1 {
			temp -= a[i][j] * x[k]
		}
		x[cont] = temp / a[i][i]
		fmt.Printf("\nX%d: %.11f ", 4-cont, x[cont])

		cont++
	}

}
