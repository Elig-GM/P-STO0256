
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

void pivoting(int f, int c){
    double max = 0.0, aux = 0.0;
    int posMax[2];

    cout << "\nAntes Pivo\n";
    print();
    for (int i = c; i < n; i++){
        for (int j = f; j < n; j++){
            aux = a[i][j];
            if(aux > max){
                max = aux;
                posMax[0] = i;
                posMax[1] = j;
            }
        }
    }
    cout<< "Max: "<< max << endl;
    for (int i = f; i <= n; i++){
        aux = a[f][i];
        a[f][i] = a[posMax[0]][i];
        a[posMax[0]][i] = aux;
    }
    for (int j = c; j < n; j++){
        aux = a[j][c];
        a[j][c] = a[j][posMax[1]];
        a[j][posMax[1]] = aux;
    }
    cout << "\nPivo\n";
    print();
    cout << "\n";

}

int main()
{
    double b, x[4], temp;
    int i, j, k, cont = 1; 
    
    for (j = 0; j <= n - 1; j++){
        pivoting(j,j);   
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