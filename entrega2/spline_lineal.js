
const spline_lineal = {
    evaluate: (xn, fxn) => {
        const table = [], p = []; 

        for (let i = 0; i < xn.length-1; i++) {
            const dx = xn[i + 1] - xn[i];
            const dy = fxn[i + 1] - fxn[i];
            const m = dy / dx;                                           
            table[i] = [m, (fxn[i + 1] + (-xn[i + 1]*m))];
            p.push(m+"x + " + (m > 0 ? "(": "")  + (fxn[i + 1] + (-xn[i + 1]*m)) + (m > 0 ? ")": ""));
        }

        console.log("Trazadores lineales Resultados: \n\n")
        console.log("\nCofecientes de los trazadores:\n");
        console.table(table);
        console.log("\nTrazadores:\n");
        p.map((val) => console.log(val));

        return { table: table, p: p}
    },
    
};

spline_lineal.evaluate([-1, 0, 3, 4], [15.5, 3, 8, 1]);