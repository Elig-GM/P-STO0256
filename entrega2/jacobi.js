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

const jacobi = {
    evaluate: (a, b, x, iter, tol) => {
        let table = [], msg = "", _x = new Array(a.length).fill(0), t, c, d, l, u, sr;
        let n = 1, error = tol + 1, temp;
        d = math.diag(math.diag(a));
        l = math.add(math.unaryMinus( util.t(a, "lt")), d);
        u = math.add(math.unaryMinus( util.t(a, "ut")), d);

        t = math.multiply(math.inv(d), math.add(l, u));
        c = math.multiply(math.inv(d), b);

        sr = math.max(math.abs(numeric.eig(t).lambda.x));
        
        table.push([x.slice(), ""]);
        while (n <= iter && error > tol) {
            error = 0;
            for (let i = 0; i < a.length; i++) {
                temp = 0;
                for (let j = 0; j < a.length; j++) {
                    i !== j && (temp -= a[i][j] * x[j]);
                }
                _x[i] = (temp + b[i]) / util.zero(a[i][i]);
                error += Math.pow(_x[i] - x[i], 2);
            }
            error = Math.sqrt(error);
            table.push([_x.slice(), error]);
            x = JSON.parse(JSON.stringify(_x))
            n++;
        }
        if (error > tol)
            msg = "Fallo en " + iter + " iteraciones con un error de: " + error;

        return { result: table, msg: msg, xs: _x, t, c }
    }
};

let a = jacobi.evaluate([[4, -1, 0, 3], [1, 15.5, 3, 8], [0, -1.3, -4, 1.1], [14, 5, -2, 30]], [1, 1, 1, 1], [0, 0, 0, 0], 100, 1e-7);
