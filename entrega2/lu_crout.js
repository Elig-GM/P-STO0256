var math = require('mathjs');

const lu_crout = {
    evaluate: (array) => {
        let Matrix = math.matrix(array);
        let matrix = Matrix._data,
            n = Matrix._size[0];
        let L = math.zeros(n, n), U = math.identity(n, n);
        let l = L._data, u = U._data;

        console.log("\nCrout Resultados: \n");
        console.log("\nEtapa 0\n");
        console.table(matrix);
        for (let i = 0; i < n; i++) {

            for (let j = i; j < n; j++) {
                l[j][i] = matrix[j][i];
                for (let k = 0; k < i; k++) {
                    l[j][i] -= l[j][k] * u[k][i];
                }
                if( j < 3){
                    u[i][j + 1] = matrix[i][j+1]
                    for (let k = 0; k < i; k++) {
                        u[i][j + 1] -= l[i][k] * u[k][j + 1];
                    }
                    u[i][j + 1] /= l[i][i];
                }
            }
            console.log("\nEtapa %i\n", (i+1));
            console.log("\nL:\n");
            console.table(l);
            console.log("\nU:\n");
            console.table(u);
        }

        matrix[0][n] /= l[0][0]
        for (let i = 1; i < n; i++) {
            for (let j = 0; j < i; j++) {
                matrix[i][n] -= l[i][j] * matrix[j][n];
            }
            matrix[i][n] /= l[i][i]
        }

        let x = [];
        let temp = 0;
        x.push(matrix[n - 1][n]);
        for (let i = n - 2; i > -1; i--) {
            temp = matrix[i][n];
            for (let j = n - 1, k = 0; j > i; j--, k++) {
                temp -= u[i][j] * x[k];
            }
            x.push(temp);
        }

        console.log("\nx:");
        x.reverse().map((val) => console.log(val));

        return { matrix, x }
    }
};

lu_crout.evaluate([[4, -1, 0, 3, 1], [1, 15.5, 3, 8, 1], [0, -1.3, -4, 1.1, 1], [14, 5, -2, 30, 1]]);