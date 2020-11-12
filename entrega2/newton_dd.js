// var mathjs = require("mathjs");
const Util = {
    zero: (r) => {
        if (r === 0)
            throw new Error("División por cero");
        return r
    }
}

const newton_dd = {
    // export const newtonDd = {
    evaluate: (xn, fxn, x) => {
        let table = [], px = 0, a = 1, n = xn.length, coef = "", poli = "", xp = "";

        for (let i = 0; i < n; i++)
            table[i] = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            table[i][0] = fxn[i];
            for (let j = 1; j <= i; j++) {
                table[i][j] = (table[i][j - 1] - table[i - 1][j - 1]) / Util.zero(xn[i] - xn[i - j]);
            }
            px += table[i][i] * (i > 0 ? (a *= x - xn[i - 1]) : 1);
        }
        table.map((val, i) => coef += val[i] + " ");
        table.map((val, i) => {
            poli += ((val[i] < 0 ? val[i] * -1 : val[i]) + (i !== 0 ? xp += "(x" + (xn[(i - 1)] < 0 ? "+" + (xn[(i - 1)] * - 1) : "-" + xn[(i - 1)]) + ")" : "") + (i < table.length - 1 ? (val[i] > 0 ? " - " : " + ") : ""))
        });

        console.log("Newton Resultados: \n\nTabla de diferencias divididas:\n")
        console.table(table);
        console.log("\nCofecientes del Polinomio:\n");
        console.log(coef)
        console.log("\nPolinomio:\n");
        console.log(poli)
        return { table: table, px: px }
    }
};

newton_dd.evaluate([-1, 0, 3, 4], [15.5, 3, 8, 1], 2.5);