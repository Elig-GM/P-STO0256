import { Util } from './util.js'
import * as math from 'mathjs'

export const punto_fijo = {

    evaluate: (f, g, xi, iter, tol, error) => {
        const _f = math.parser(), _g = math.parser();
        _f.evaluate("f(x)=" + f);
        _g.evaluate("g(x)=" + g);
        let table = [], msg,
          x = xi,
          fx = _f.evaluate("f(" + x + ")"),
          n = 0, e = tol + 1;
          table.push([
            n,
            Util.fixed(x),
            Util.fixed(fx),
            ""
          ])
          while (e > tol && 0 !== fx && n < iter - 1) {
            x = _g.evaluate("g("+ xi +")");
            fx = _f.evaluate("f(" + x + ")");
            e = Math.abs(x - xi);
            if (error === "1") e /= x;
            xi = x;
            n += 1;
            table.push([
              n,
              Util.fixed(x),
              Util.fixedExp(fx),
              Util.fixedExp(e)
            ]);
          }
          0 === fx
            ? msg = "Aproximación a la raíz $x_m=" + x + "$ donde $f(Xm)=0$"
            : e < tol
              ? msg = "Aproximación a la raíz $x_m=" + x + "$ con $Error=" + e + "$"
              : msg = "Fracaso en " + iter + " iteraciones, hasta el momento $x_m=" + x + "$"
    
        return { table, msg };
    }
    
}