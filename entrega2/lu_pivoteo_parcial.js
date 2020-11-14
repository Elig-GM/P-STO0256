var math = require('mathjs');

const lu_pivoteo_parcial = {
    evaluate: (array) => {
        let Matrix = math.matrix(array);
        let matrix = Matrix._data, n = Matrix._size[0], mults, max;
        let l = math.identity(n, n)._data;
        let u = math.zeros(n, n)._data;
        let p = math.identity(n, n)._data;

        console.log("\nCrout Resultados: \n");
        console.log("\nEtapa 0\n");
        console.table(matrix);

        for (let i = 0; i < n - 1; i++) {
            max = { pos: 0, val: 0 };
            for (let j = i; j < n; j++) {
                if (Math.abs(matrix[j][i]) > Math.abs(max.val)) {
                    max.val = matrix[j][i];
                    max.pos = j;
                }
            }
            if (Math.abs(max.val) > Math.abs(matrix[i][i])) {
                [matrix[max.pos], matrix[i]] = [matrix[i], matrix[max.pos]];
                [p[max.pos], p[i]] = [p[i], p[max.pos]];
                if (i > i)
                    [l[max.pos], l[i]] = [l[i], l[max.pos]];
            }


            mults = [];
            for (let j = i + 1; j < n; j++) {
                if (matrix[j][i] !== 0)
                    l[j][i] = matrix[j][i] / matrix[i][i];
            }
            Matrix.subset(math.index(math.range(i, n), math.range(0, n + 1)))
                // eslint-disable-next-line no-loop-func
                .forEach(function (value, xy) {
                    if (xy[0] >= 1) {
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
            console.log("\nP:\n");
            console.table(p);
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
        x.reverse().map((v, i) => console.log("x" + i + ": " + v));
        return { matrix, x }
    }
}

lu_pivoteo_parcial.evaluate([
    [4, -1, 0, 3, 1],
    [1, 15.5, 3, 8, 1],
    [0, -1.3, -4, 1.1, 1],
    [14, 5, -2, 30, 1]
]);