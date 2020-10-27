var math = require("mathjs");

const biseccion = {

    evaluate: (f, xi, xs, iter, tol, error) => {
        const _f = math.parser();
        _f.evaluate("f(x)=" + f);
        let table = [], msg = "",
            fxi = _f.evaluate("f(" + xi + ")"),
            fxs = _f.evaluate("f(" + xs + ")");
        if (0 === fxi)
            msg = "xi = " + xi + " es una raíz";
        else if (0 === fxs)
            msg = "xu = " + xs + " es una raíz";
        else if (fxi * fxs < 0) {
            let xa, xm = (xi + xs) / 2,
                fxm = _f.evaluate("f(" + xm + ")"),
                n = 0, e = tol + 1;
            table.push([n, xi, xs, xm, fxm, ""])
            while (e > tol && 0 !== fxm && n < iter - 1) {
                if (fxi * fxm < 0) {
                    xs = xm;
                    fxs = fxm;
                } else {
                    xi = xm;
                    fxi = fxm;
                }
                xa = xm;
                xm = (xi + xs) / 2;
                fxm = _f.evaluate("f(" + xm + ")");
                e = Math.abs(xm - xa);
                if (error === 1) e /= xm;
                n += 1;
                table.push([n, xi, xs, xm, fxm, e]);
            }
            0 === fxm
                ? msg = "Aproximación a la raíz xm=" + xm + " donde f(xm)=0"
                : e < tol
                    ? msg = "Aproximación a la raíz xm=" + xm + " con Error=" + e
                    : msg = "Fracaso en " + iter + " iteraciones, hasta el momento xm=" + xm
        } else {
            msg = "El intervalo es inadecuado, encuentre uno con cambio de signo en f(x)";
        }
        console.log("n    xi     xs    xm    fxm     error");
        table.map((value) => (console.log(value)))
        console.log(msg);
        return { table, msg }
    }
    
}