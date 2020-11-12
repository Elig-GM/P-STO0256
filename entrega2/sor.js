var math = require('mathjs');
var numeric = require('numericjs');

const util = {
    t: (matrix, type) => {
        let rmatrix = Array(matrix.length);
        for (let i = 0; i < matrix.length; i++) {
            rmatrix[i] = new Array(matrix[0].length).fill(0);
            for (let j = 0; j < matrix[0].length; j++) {
                if (type === "lt")
                    if (i >= j) rmatrix[i][j] = matrix[i][j];
                    else rmatrix[i][j] = 0;
                if (type === "ut")
                    if (i <= j) rmatrix[i][j] = matrix[i][j];
                    else rmatrix[i][j] = 0;
            }
        }
        return rmatrix;
    },
    zero: (r) => {
        if (r === 0)
            throw new Error("División por cero");
        return r
    }
}

const sor = {
    evaluate: (a, b, x, delta, iter, tol) => {
        let table = [], msg = "", _x = new Array(a.length).fill(0), t, c, d, l, u, sr;
        let error = tol + 1, temp;

        d = math.diag(math.diag(a));
        l = math.add(math.unaryMinus(util.t(a, "lt")), d);
        u = math.add(math.unaryMinus(util.t(a, "ut")), d);

        t = math.multiply(math.inv(math.subtract(d, math.multiply(delta, l))), math.add(math.multiply(1 - delta, d), math.multiply(delta, u)));
        c = math.multiply(math.multiply(delta, math.inv(math.subtract(d, math.multiply(delta, l)))), b);

        sr = math.max(math.abs(numeric.eig(t).lambda.x));

        table.push([x.slice(), ""]);
        for (let n = 1; n <= iter && error > tol; n++) {
            error = 0;
            for (let i = 0; i < a.length; i++) {
                temp = 0;
                for (let j = 0; j < a.length; j++) {
                    i !== j && (temp += a[i][j] * x[j]);
                }
                _x[i] = (1 - delta) * _x[i] + (delta / util.zero(a[i][i])) * (b[i] - temp);
                error += Math.pow(_x[i] - x[i], 2);
                x[i] = _x[i];
            }
            error = Math.sqrt(error);
            table.push([_x.slice(), error]);
        }
        if (error > tol)
            msg = "Fallo en " + iter + " iteraciones con un error de: " + error;

        return { result: table, msg: msg, xs: _x, t, c }
    }
};

let a = sor.evaluate([[4, -1, 0, 3], [1, 15.5, 3, 8], [0, -1.3, -4, 1.1], [14, 5, -2, 30]], [1, 1, 1, 1], [0, 0, 0, 0], 1.5, 100, 1e-7);
