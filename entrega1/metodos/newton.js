var math = require("mathjs");

const newton = {
    evaluate: (f, df, xi, iter, tol, error) => {
        const _f = math.parser(), _df = math.parser();
        _f.evaluate("f(x)=" + f);
        _df.evaluate("df(x)=" + df);
        var table = [], msg, dfx,
            x = xi,
            fx = _f.evaluate("f(" + x + ")"),
            dfx = _df.evaluate("df(" + x + ")"),
            n = 0, e = tol + 1;
        table.push([n, x, fx, dfx, ""])
        while (e > tol && 0 !== fx && n < iter - 1) {
            x -= fx / dfx;
            fx = _f.evaluate("f(" + x + ")");
            e = Math.abs(xi - x);
            if (error === "1") e /= x;
            xi = x;
            n += 1;
            table.push([n, x, fx, dfx, e]);
            dfx = _df.evaluate("df(" + x + ")");
        }
        0 === fx
            ? msg = "Aproximación a la raíz $x_m=" + x + "$ donde f(Xm)=0$"
            : e < tol
                ? msg = "Aproximación a la raíz $x_m=" + x + "$ con $Error=" + e + "$"
                : msg = "Fracaso en " + iter + " iteraciones, hasta el momento $x_m=" + x + "$"

        return { table, msg }
    }

}