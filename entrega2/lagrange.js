var math = require("mathjs");

const Util = {
    zero: (r) => {
        if (r === 0)
            throw new Error("División por cero");
        return r
    }
}

const lagrange = {

    // export const lagrange = {
    evaluate: (xn, fxn, x) => {
        let px = 0, n = xn.length, p = [], temp, a, polis = [], poli = "";

        for (let i = 0; i < n; i++) {
            temp = ""
            a = 1;
            for (let j = 0; j < n; j++)
                if (j !== i) {
                    if (!Number.isNaN(x)) a = a * (x - xn[j]) / Util.zero(xn[i] - xn[j]);
                    temp += "((x - " + xn[j] + ") / (" + xn[i] + " - " + xn[j] + "))";
                }
            if (!Number.isNaN(x)) px += a * fxn[i];
            polis.push(math.rationalize(temp).toString());
            poli += (i !== 0 && "+ ") + fxn[i] + " * " + "L" + i;
            // p.push( (i !== 0 && "+ " ) + fxn[i] + " * " + temp);
        }

        console.log("Lagrange Resultados: \n\nPolinomios interpolantes de Lagrange:\n")
        polis.map((v, i) => console.log(v + "  //L" + i));
        console.log("\nPolinomio:\n");
        console.log(poli)

        return { polis, poli, px: px }
    }
};

lagrange.evaluate([-1, 0, 3, 4], [15.5, 3, 8, 1], 2.5);