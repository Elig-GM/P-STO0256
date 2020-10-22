using System;

public class Gauss{

	public static void Main()
    {
        int n = 4, i, j, k, cont = 1; 
        double[,] a = new double [4,5] {
            {20, -1, 3, 4, 30},
            {6, 23, 4, 3, -10},
            {7, 21, 46, 9, 20},
            {-3, -9, 12, 38, -14}
        }; 
		double[] x = new double[4];
		double b, temp;
    
        for (j = 0; j <= n - 1; j++){
            for (i = j + 1; i <= n - 1; i++){
                b = a[i,j] / a[j,j];
                for (k = 0; k <= n; k++){
                    a[i,k] = a[i,k] - b * a[j,k];
                }
            }
        }
        
        Console.WriteLine("\nSolution:\n\n");
        for (i = 0; i < n; i++){
            Console.Write("|");
            for (j = 0; j <= n; j++){
                if(j != n) 
                    Console.Write(" {0,5:0.##} ", a[i,j]);
                else
                    Console.WriteLine("| {0,6:0.##} |", a[i,j]);
            }
        }

        x[0] = a[n - 1,n] / a[n - 1,n - 1];
        Console.Write("\nX4: {0,14:0.00000000000} ", x[0]);

        for (i = n - 2; i > -1; i--){
            temp = a[i,n];
            for (j = i + 1, k = cont - 1; j < n; j++, k--){
                temp -= a[i,j] * x[k];
            }
            x[cont] = temp / a[i,i];
            Console.Write("\nX{0:d}: {1,14:0.00000000000} ", 4-cont,x[cont]);

            cont++;
        }
    }
}