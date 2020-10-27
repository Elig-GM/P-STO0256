var math = require("mathjs");

const secante = {

    evaluate: (f, x0, x1, iter, tol, error) => {
        const _f = math.parser();
        _f.evaluate("f(x)=" + f);
        var table = [], msg,
            // x = xi,
            fx0 = _f.evaluate("f(" + x0 + ")");
        if (fx0 === 0) {
            msg = "X0 = " + x0 + "$ es una raíz";
        } else {
            var fx1 = _f.evaluate("f(" + x1 + ")"),
                x2, den = fx1 - fx0, n = 0, e = tol + 1;
            table.push([n, x0, fx0, ""])
            n++;
            table.push([n, x1, fx1, ""])
            while (e > tol && 0 !== fx1 && 0 !== den && n < iter - 1) {
                x2 = x1 - fx1 * (x1 - x0) / den;
                e = Math.abs(x2 - x1);
                if (error === "1") e /= x1;
                x0 = x1;
                fx0 = fx1;
                x1 = x2;
                fx1 = _f.evaluate("f(" + x1 + ")");
                den = fx1 - fx0;
                n++;
                table.push([n, x1, fx1, e]);
            }
            0 === fx1
                ? msg = "Aproximación a la raíz xm=" + x1 + " donde f(Xm)=0"
                : e < tol
                    ? msg = "Aproximación a la raíz xm=" + x1 + " con $Error=" + e
                    : msg = "Fracaso en " + iter + " iteraciones, hasta el momento xm=" + x1
        }
        return { table, msg }
    }

}