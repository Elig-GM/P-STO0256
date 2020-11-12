var math = require('mathjs');

const lu_doolittle = {
    evaluate: (array) => {
        
        let matrix = math.matrix(array)._data, n = Matrix._size[0];
        let l = math.identity(n, n)._data, u = math.zeros(n, n)._data;

        console.log("\nCrout Resultados: \n");
        console.log("\nEtapa 0\n");
        console.table(matrix);

        for (let i = 0; i < n; i++) {
            for (let j = i; j < n; j++) {
                
                u[i][j] = matrix[i][j]
                for (let k = 0; k < i; k++) {
                    u[i][j] -= l[i][k] * u[k][j];
                }
                if ( j < 4) {
                    l[j][i] = matrix[j][i];
                    for (let k = 0; k < i; k++) {
                        l[j][i] -= l[j][k] * u[k][i];
                    }
                }
                l[j][i] /= u[i][i];
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
        x.push(matrix[n - 1][n]/u[n - 1][n-1]);
        for (let i = n - 2; i > -1; i--) {
            temp = matrix[i][n];
            for (let j = n - 1, k = 0; j > i; j--, k++) {
                temp -= u[i][j] * x[k];
            }
            x.push(temp/u[i][i]);
        }

        console.log("\nx:");
        x.reverse().map((val) => console.log(val));

        return { matrix, l, u, x }
    }
};

lu_doolittle.evaluate([[4, -1, 0, 3, 1], [1, 15.5, 3, 8, 1], [0, -1.3, -4, 1.1, 1], [14, 5, -2, 30, 1]]);