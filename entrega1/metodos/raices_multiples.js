var math = require("mathjs");

const raices_multiples = {
    evaluate: (f, df, df2, xi, iter, tol, error) => {

        const _f = math.parser(), _df = math.parser(), _df2 = math.parser();
        _f.evaluate("f(x)=" + f);
        _df.evaluate("df(x)=" + df);
        _df2.evaluate("df2(x)=" + df2);

        let table = [], msg, fx = _f.evaluate("f(" + xi + ")");

        if (0 === fx)
            msg = "X = " + x + " es una raíz";

        let xn, dfx = _df.evaluate("df(" + xi + ")"),
            dfx2 = _df2.evaluate("df2(" + xi + ")"),
            d = pow(dfx, 2) - fx * dfx2,
            n = 0, e = tol + 1;

        table.push([n, x, fx, ""]);

        while (e > tol && d !== 0 && n < iter - 1) {
            xn = xi - (fx * dfx) / d;
            fx = _f.evaluate("f(" + x + ")");
            dfx = _df.evaluate("df(" + xn + ")");
            dfx2 = _df2.evaluate("df2(" + xn + ")")
            e = abs(xn - x);
            if (error === "1") e /= xn;
            xi = xn;
            d = pow(dfx, 2) - fx * dfx2
            n++;
            table.push([n, x, fx, e]);
        }
        0 === fx
            ? msg = "Aproximación a la raíz $x_m=" + xn + "$ donde f(Xm)=0$"
            : e < tol
                ? msg = "Aproximación a la raíz $x_m=" + xn + "$ con $Error=" + e + "$"
                : msg = "Fracaso en " + iter + " iteraciones, hasta el momento $x_m=" + xn + "$"

        return { table, msg }
    }
}

let a = raices_multiples.evaluate("exp(x) - x -1", "exp(x) -1", "exp(x)", 1, 100, 1e-7, 0);