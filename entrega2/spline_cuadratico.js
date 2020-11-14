var math = require('mathjs');

const spline_cuadrtico = {
    evaluate: (xn, fxn) => {

        let n = xn.length;
        let m = 3 * (n - 1);
        let a = math.zeros(m, m)._data;

        let s = new Array(n - 1);

        for (let i = 0; i < n - 1; i++) {
            s[i] = new Array(3).fill(0);
        }

        let b = new Array(m);
        for (let i = 0; i < m; i++) {
            b[i] = new Array(1).fill(0);
        }

        for (let i = 0; i < n - 1; i++) {
            a[i + 1][3 * (i + 1) - 3] = Math.pow(xn[i + 1], 2);
            a[i + 1][3 * (i + 1) - 2] = xn[i + 1];
            a[i + 1][3 * (i + 1) - 1] = 1;

            b[i + 1][0] = fxn[i + 1];
        }

        a[0][0] = Math.pow(xn[0], 2);
        a[0][1] = xn[0];
        a[0][2] = 1;

        b[0][0] = fxn[0];

        for (let i = 1; i < n - 1; i++) {
            a[n - 1 + i][3 * i - 3] = Math.pow(xn[i], 2);
            a[n - 1 + i][3 * i - 2] = xn[i];
            a[n - 1 + i][3 * i - 1] = 1;
            a[n - 1 + i][3 * i] = -Math.pow(xn[i], 2);
            a[n - 1 + i][3 * i + 1] = -xn[i];
            a[n - 1 + i][3 * i + 2] = -1;

            b[n - 1 + i][0] = 0;
        }

        for (let i = 1; i < n - 1; i++) {
            a[2 * n - 3 + i][3 * i - 3] = 2 * xn[i];
            a[2 * n - 3 + i][3 * i - 2] = 1;
            a[2 * n - 3 + i][3 * i - 1] = 0;
            a[2 * n - 3 + i][3 * i] = -2 * xn[i];
            a[2 * n - 3 + i][3 * i + 1] = -1;
            a[2 * n - 3 + i][3 * i + 2] = 0;

            b[2 * n - 3 + i][0] = 0;
        }

        a[m - 1][0] = 2;
        b[m - 1][0] = 0;

        for (let i = 0; i < m; i++) {
            a[i].push(...b[i]);
        }

        let coes = spline_cuadrtico.gauss(a).x.reverse();
        const result = [];
        const t = [];
        const ct = [];
        for (var i = 0; i < coes.length/3; i++) {
            result[0] = coes[i*3] + "x^2 + " + coes[i*3+1] + "x + " + coes[i*3+2];
            result[1] = xn[i] + ' ≤ x ≤ ' + xn[i + 1];
            result[0] = math.rationalize(result[0]).toString();
            t.push([...result]);
            ct.push([coes[i*3], coes[i*3+1], coes[i*3+2]])
        }

        console.log("Trazadores Cubicos Resultados: \n\n")
        console.log("Cofecientes de los trazadores:\n");
        console.table(ct);
        console.log("\nTrazadores:\n");
        t.map((val) => console.log(val.toString()));

        return { table: coes, t: t }
    },

    gauss: (array) => {
        let Matrix = math.matrix(array);
        let matrix = Matrix._data,
            n = Matrix._size[0],
            mults;

        for (let i = 0; i < n - 1; i++) {
            let max = {
                pos: 0,
                val: 0,
            };
            for (let j = i; j < n; j++) {
                if (Math.abs(matrix[j][i]) > Math.abs(max.val)) {
                    max.val = matrix[j][i];
                    max.pos = j;
                }
            }
            if (max.pos > 0)
                [matrix[max.pos], matrix[i]] = [matrix[i], matrix[max.pos]];

            mults = [];
            for (let j = i + 1; j < n; j++) {
                if (matrix[j][i] !== 0)
                    mults.push(matrix[j][i] / matrix[i][i]);
                else
                    mults.push(0);
            }
            Matrix.subset(math.index(math.range(i, n), math.range(0, n + 1)))
                // eslint-disable-next-line no-loop-func
                .forEach(function (value, xy) {
                    if (xy[0] >= 1) {
                        matrix[xy[0] + i][xy[1]] = value - mults[xy[0] - 1] * matrix[xy[0] + (i - xy[0])][xy[1]];
                    }
                });
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

        return { matrix, x }
    }

};

spline_cuadrtico.evaluate([-1, 0, 3, 4], [15.5, 3, 8, 1]);