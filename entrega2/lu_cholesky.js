var math = require('mathjs');

const lu_cholesky = {
    evaluate: (array) => {

        let matrix = math.matrix(array)._data, n = matrix.length;
        let l = math.zeros(n, n)._data, u = math.zeros(n, n)._data;

        console.log("\nCrout Resultados: \n");
        console.log("\nEtapa 0\n");
        console.table(matrix);

        for (let i = 0; i < n; i++) {
            l[i][i] = matrix[i][i];
            for (let j = 0; j < i; j++) {
                l[i][i] = math.subtract(l[i][i], math.multiply(l[i][j], u[j][i]));
            }
            l[i][i] = math.sqrt(l[i][i] );
            u[i][i] = l[i][i];

            for (let j = i + 1; j < n; j++) {
                l[j][i] = matrix[j][i];
                for (let k = 0; k < i; k++) {
                    l[j][i] = math.subtract(l[j][i], math.multiply(l[j][k], u[k][i]));
                }
                l[j][i] = math.divide(l[j][i], l[i][i]);
                if( j < 4){
                    u[i][j] = matrix[i][j]
                    for (let k = 0; k < i; k++) {
                        u[i][j] = math.subtract(u[i][j], math.multiply(l[i][k], u[k][j]));
                    }
                    u[i][j] = math.divide(u[i][j], l[i][i]);
                }
            }

            console.log("\nEtapa %i\n", (i+1));
            console.log("\nL:\n");
            console.table(l);
            console.log("\nU:\n");
            console.table(u);

        }

        matrix[0][n] = math.divide(matrix[0][n], l[0][0]);
        for (let i = 1; i < n; i++) {
            for (let j = 0; j < i; j++) {
                matrix[i][n] = math.subtract(matrix[i][n], math.multiply(l[i][j], matrix[j][n]));
            }
            matrix[i][n] = math.divide(matrix[i][n], l[i][i]);
        }

        let x = [];
        let temp = 0;
        x.push(math.divide(matrix[n - 1][n], u[n - 1][n-1]));
        for (let i = n - 2; i > -1; i--) {
            temp = matrix[i][n];
            for (let j = n - 1, k = 0; j > i; j--, k++) {
                temp = math.subtract(temp, math.multiply(u[i][j], x[k]));
            }
            x.push(math.divide(temp, u[i][i]));
        }

        console.log("\nx:");
        x.reverse().map((val) => console.log(val.toString()));

        return { matrix, l, u, x }
    }
};

lu_cholesky.evaluate([[4, -1, 0, 3, 1], [1, 15.5, 3, 8, 1], [0, -1.3, -4, 1.1, 1], [14, 5, -2, 30, 1]]);
