var math = require("mathjs");

const busquedas_incrementales = {
    evaluate: (f, x, delta, iter) => {
        let table = [];
        let n = 0, xa = x, xb = x + delta,
            fxa = math.evaluate(f, { x: xa }),
            fxb = math.evaluate(f, { x: xb });

        while (n < iter) {
            if (fxa * fxb < 0 || fxa * fxb === 0)
            table.push("Hay una raiz de f en [" + xa + ", " + xb + "]");

            xa = xb;
            fxa = fxb;
            xb = xb + delta;
            fxb = math.evaluate(f, {x: xb});
            n++;
        }
        
        return table;
    }
}

let a = busquedas_incrementales.evaluate("log(sin(x)^2 + 1) - 1/2", -3, 0.5, 100)
