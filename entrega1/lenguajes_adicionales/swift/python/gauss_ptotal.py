
import numpy as np
import sys

n = 4

a = np.array([[20.0, -1.0, 3.0, 4.0, 30.0],
              [6.0, 23.0, 4.0, 3.0, -10.0],
              [7.0, 21.0, 46.0, 9.0, 20.0],
              [-3.0, -9.0, 12.0, 38.0, -14.0]])
x = np.zeros(n)
m = np.zeros(n+1)
fr = np.zeros(n+1)

def pivoting(f, c) :
    max, aux = 0.0, 0.0
    fMax, cMax = 0, 0

    for i in range(f, n) :
        for j in range(c, n) :
            aux = a[i][j]
            if aux > max:
                max = aux
                cMax = i
                fMax = j
    print("Max: %d", max)
    for i in range(f, n+1) :
        aux = a[f][i]
        a[f][i] = a[fMax][i]
        a[fMax][i] = aux
    
    for j in range(c, n) :
        aux = a[j][c]
        a[j][c] = a[j][cMax]
        a[j][cMax] = aux
    if f == 0 : m = a[0]

if __name__ == "__main__" :
    for i in range(n):
        if a[i][i] == 0.0:
            sys.exit('Divide by zero detected!')
        pivoting(i, i)
        for j in range(i+1, n):
            ratio = a[j][i]/a[i][i]
            for k in range(n+1):
                a[j][k] = a[j][k] - ratio * a[i][k]

    fr = a[0];
    x[n-1] = a[n-1][n]/a[n-1][n-1]
    for i in range(n-2, -1, -1):
        x[i] = a[i][n]
        for j in range(i+1, n):
            x[i] = x[i] - a[i][j]*x[j]
        x[i] = x[i]/a[i][i]

    print(a)

    print('\nSolucion: ')
    for i in range(n):
        print('X%d = %0.11f' % (i+1, x[i]), end='\t')
