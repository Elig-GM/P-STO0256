
#include <iostream>
using namespace std;

int n = 4;
double a[4][5] = {
        {20, -1, 3, 4, 30},
        {6, 23, 4, 3, -10},
        {7, 21, 46, 9, 20},
        {-3, -9, 12, 38, -14}
    };

void print(){
    for (int i = 0; i < n; i++){
        cout<<"|";
        for (int j = 0; j <= n; j++){
            if(j != n) 
                printf(" %5.1f ", a[i][j]);
            else
                printf("| %5.1f |\n", a[i][j]);
        }
    }
}

int main()
{
    double b, x[4], temp;
    int i, j, k, cont = 1; 
    
    // pivoting(0,0);
    for (j = 0; j <= n - 1; j++){
        for (i = j + 1; i <= n - 1; i++){
            b = a[i][j] / a[j][j];
            for (k = 0; k <= n; k++){
                a[i][k] = a[i][k] - b * a[j][k];
            }
        }
    }
    
    cout << "\nSolution:\n\n";
    print();

    x[0] = a[n - 1][n] / a[n - 1][n - 1];
    printf("\nX4: %.11f ", x[0]);

    for (i = n - 2; i > -1; i--){
        temp = a[i][n];
        for (j = i + 1, k = cont - 1; j < n; j++, k--){
            temp -= a[i][j] * x[k];
        }
        x[cont] = temp / a[i][i];
        printf("\nX%d: %.11f ", 4-cont,x[cont]);

        cont++;
    }

    return 0;
}