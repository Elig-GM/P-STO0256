
import numpy as np
import sys

n = 4

a = np.array([[20.0, -1.0, 3.0, 4.0, 30.0],
              [6.0, 23.0, 4.0, 3.0, -10.0],
              [7.0, 21.0, 46.0, 9.0, 20.0],
              [-3.0, -9.0, 12.0, 38.0, -14.0]])
x = np.zeros(n)

for i in range(n):
    if a[i][i] == 0.0:
        sys.exit('Divide by zero detected!')

    for j in range(i+1, n):
        ratio = a[j][i]/a[i][i]
        for k in range(n+1):
            a[j][k] = a[j][k] - ratio * a[i][k]

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
