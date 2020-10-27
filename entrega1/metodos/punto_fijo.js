var math = require("mathjs");

const punto_fijo = {

  evaluate: (f, g, xi, iter, tol, error) => {
    const _f = math.parser(), _g = math.parser();
    _f.evaluate("f(x)=" + f);
    _g.evaluate("g(x)=" + g);
    let table = [], msg,
      x = xi,
      fx = _f.evaluate("f(" + x + ")"),
      n = 0, e = tol + 1;
    table.push([n, x, fx, ""])
    while (e > tol && 0 !== fx && n < iter - 1) {
      x = _g.evaluate("g(" + xi + ")");
      fx = _f.evaluate("f(" + x + ")");
      e = Math.abs(x - xi);
      if (error === "1") e /= x;
      xi = x;
      n += 1;
      table.push([n, x, fx, e]);
    }
    0 === fx
      ? msg = "Aproximación a la raíz xm=" + x + " donde f(Xm)=0"
      : e < tol
        ? msg = "Aproximación a la raíz xm=" + x + " con Error=" + e
        : msg = "Fracaso en " + iter + " iteraciones, hasta el momento xm=" + x

    console.log("n    x     fx     error");
    table.map((value) => (console.log(value)))
    console.log(msg);
    return { table, msg };
  }

}