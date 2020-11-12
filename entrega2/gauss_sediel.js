var math = require('mathjs');

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

const gauss_sediel = {
    evaluate: (a, b, x, relaj, delta, iter, tol) => {
        let table = [], msg = "", _x = new Array(a.length).fill(0), t, c, d, l, u;
        let error = tol + 1, temp;
        d = math.diag(math.diag(a));
        l = math.add(math.unaryMinus( util.t(a, "lt")), d);
        u = math.add(math.unaryMinus( util.t(a, "ut")), d);
        t = math.multiply(math.inv(math.subtract(d, l)), u);
        c = math.multiply(math.inv(math.subtract(d, l)), b);
        for (let n = 1; n <= iter && error > tol; n++) {
            error = 0;
            for (let i = 0; i < a.length; i++) {
                temp = 0;
                for (let j = 0; j < a.length; j++) {
                    i !== j && (temp -= a[i][j] * x[j]);
                }
                _x[i] = (temp + b[i]) / util.zero(a[i][i]);
                if (relaj) _x[i] = delta * _x[i] + (1 - delta) * _x[i];
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

let a = gauss_sediel.evaluate([[4, -1, 0, 3], [1, 15.5, 3, 8], [0, -1.3, -4, 1.1], [14, 5, -2, 30]], [1, 1, 1, 1], [0, 0, 0, 0], 0, 0, 100, 1e-7);
