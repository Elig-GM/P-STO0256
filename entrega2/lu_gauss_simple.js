var math = require('mathjs');

// const gaus = {
const lu_gauss_simpler = {
    evaluate: (array) => {

        let Matrix = math.matrix(array);
        let matrix = Matrix._data, n = matrix.length;
        let l = math.identity(n, n)._data;
        let u = math.identity(n, n)._data;

        console.log("\nCrout Resultados: \n");
        console.log("\nEtapa 0\n");
        console.table(matrix);

        for (let i = 0; i < n - 1; i++) {
            for (let j = i + 1; j < n; j++) {
                l[j][i] = matrix[j][i] / matrix[i][i];
            }
            Matrix.subset(math.index(math.range(i, n), math.range(0, n + 1)))
                // eslint-disable-next-line no-loop-func
                .forEach(function (value, xy) {
                    if (xy[0] >= 1 && xy[1] !== 4) {
                        matrix[xy[0] + i][xy[1]] = value - l[xy[0] + i][i] * matrix[xy[0] + (i - xy[0])][xy[1]];
                    }
                });
            for (let j = i; j < n; j++) {
                u[i][j] = matrix[i][j];
            }
            for (let j = i + 1; j < n; j++) {
                u[i + 1][j] = matrix[i + 1][j];
            }

            console.log("\nEtapa %i\n", (i+1));
            console.table(matrix);
            console.log("\nL:\n");
            console.table(l);
            console.log("\nU:\n");
            console.table(u);

        }

        for (let i = 1; i < n; i++) {
            for (let j = 0; j < i; j++) {
                matrix[i][n] -= l[i][j] * matrix[j][n];
            }
        }

        let x = [];
        let temp = 0;
        x.push(matrix[n - 1][n] / matrix[n - 1][n - 1]);
        for (let i = n - 2; i > -1; i--) {
            temp = matrix[i][n];
            for (let j = i + 1, k = x.length - 1; j < n; j++, k--) {
                temp -= matrix[i][j] * x[k];
            }
            x.push(temp / matrix[i][i]);
        }
        return { matrix, l, u, x }
    }
};

lu_gauss_simpler.evaluate([
    [4, -1, 0, 3, 1],
    [1, 15.5, 3, 8, 1],
    [0, -1.3, -4, 1.1, 1],
    [14, 5, -2, 30, 1]
]);