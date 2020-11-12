var math = require("mathjs");

const vandermonde = {
    evaluate: (datos) => {
        let str = [], poli = [], tabla = [], n = datos[0].length, coef, c = "", p = "";
        for (let j = 0; j < n; j++) {
            for (let i = 0; i < n; i++) {
                // str += "a"+ i + "x^" + i;
                // if (i !== 0) str += " + ";
                str.push(Math.pow(datos[0][j], (n - 1 - i)))
            }
            str.push(datos[1][j])
            // poli.push(str + " = " + datos[1][j])
            tabla.push(str);
            str = [];
        }
        coef = vandermonde.gauss_simpler(JSON.parse(JSON.stringify(tabla)));
        coef.map((val, i) => ( p += (val + (i < (coef.length - 1)? "x^" + ( coef.length - 1 - i )+ " + " : ""))));
        coef.map((val, i) => ( c += (val + (i < (coef.length - 1)? " + " : ""))));

        console.log("Vandermonde Resultados: \n\nMatriz de Vandermonde:\n")
        console.table(tabla);
        console.log("\nCofecientes del Polinomio:\n");
        console.log(c)
        console.log("\nPolinomio:\n");
        console.log(p)
    },

    gauss_simpler: (array) => {
        let Matrix = math.matrix(array);
        let matrix = Matrix._data,
            n = Matrix._size[0],
            mult;

        for (let i = 0; i < n - 1; i++) {
            if (matrix[i][i] === 0) {
                for (let j = i + 1; j < n; j++) {
                    if (matrix[j][i] !== 0) {
                        let aux = new Array(n + 1);
                        for (let k = i; k < n + 1; k++) {
                            aux[k] = matrix[j][k];
                            matrix[j][k] = matrix[i][k];
                            matrix[i][k] = aux[k];
                        }
                        break;
                    }
                }
            }
            mult = [];
            for (let j = i + 1; j < n; j++) {
                mult.push(matrix[j][i] / matrix[i][i]);
            }
            Matrix.subset(math.index(math.range(i, n), math.range(0, n + 1)))
                // eslint-disable-next-line no-loop-func
                .forEach(function (value, xy) {
                    if (xy[0] >= 1) {
                        matrix[xy[0] + i][xy[1]] = value - mult[xy[0] - 1] * matrix[xy[0] + (i - xy[0])][xy[1]];
                    }
                });
        }

        let x = [];
        let temp = 0;
        x.push(matrix[n - 1][n] / matrix[n - 1][n - 1]);
        for (let i = n - 2; i > -1; i--) {
            temp = matrix[i][n];
            for (let j = i + 1, k = x.length - 1; j < n; j++, k--) {
                temp -= matrix[i][j] * x[k];
            }
            x.push(temp / matrix[i][i]);
        }
        return x.reverse(); 
    }
}

let a = vandermonde.evaluate([[-1, 0, 3, 4], [15.5, 3, 8, 1]])
