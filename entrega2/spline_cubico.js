var math = require('mathjs');

const spline_cubico = {
    evaluate: (xn, fxn) => {
        const p = [], n = xn.length - 1; 

        const h = new Array(n);                                   
        for (let i = 0; i < n; i++) {
            h[i] = xn[i + 1] - xn[i];
        }

        const mu = new Array(n), z = new Array(n + 1);
        mu[0] = 0;
        z[0] = 0;
        for (let i = 1; i < n; i++) {
            const g = 2 * (xn[i + 1] - xn[i - 1]) - h[i - 1] * mu[i - 1];
            mu[i] = h[i] / g;
            z[i] = (3 * (fxn[i + 1] * h[i - 1] - fxn[i] * (xn[i + 1] - xn[i - 1]) + fxn[i - 1] * h[i]) /
                    (h[i - 1] * h[i]) - h[i - 1] * z[i - 1]) / g;
        }

        const b = new Array(n), c = new Array(n + 1), d = new Array(n);
        z[n] = 0;
        c[n] = 0;
        for (let i = n - 1; i >= 0; i--) {
            const dx = h[i];
            const dy = fxn[i + 1] - fxn[i];
            c[i] = z[i] - mu[i] * c[i + 1];
            b[i] = dy / dx - dx * (c[i + 1] + 2 * c[i]) / 3;
            d[i] = (c[i + 1] - c[i]) / (3 * dx);
        }

        const coes = new Array(n), coe = new Array(4);
        for (let i = 0; i < n; i++) {
            coe[0] = fxn[i];
            coe[1] = b[i];
            coe[2] = c[i];
            coe[3] = d[i];
            coes[i] = [...coe];
        }

        const result = [];
        let rat;
        for(var i = 0; i < coes.length; i++) {
            result[0] = coes[i][0];
            result[0] += ' + ' + coes[i][1] + '(x - ' + xn[i] + ')';
            result[0] += ' + ' + coes[i][2] + '(x - ' + xn[i] + ')^2';
            result[0] += ' + ' + coes[i][3] + '(x - ' + xn[i] + ')^3';
            result[1] = xn[i] + ' ≤ x ≤ ' + xn[i + 1];
            rat = math.rationalize(result[0],{},true);
            result[0] = rat.expression.toString();
            p.push([...result]);
            coes[i] = rat.coefficients.reverse();
        }

        console.log("Trazadores Cubicos Resultados: \n\n")
        console.log("Cofecientes de los trazadores:\n");
        console.table(coes);
        console.log("\nTrazadores:\n");
        p.map((val) => console.log(val.toString()));

        return { table: coes, p: p}
    }
};

spline_cubico.evaluate([-1, 0, 3, 4], [15.5, 3, 8, 1]);