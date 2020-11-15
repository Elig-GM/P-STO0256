var math = require("mathjs");

let posVars = [];
const gauss_ptotal = {

    evaluate: (array) => {
        let Matrix = math.matrix(array);
        let matrix = Matrix._data, n = Matrix._size[0], mults;

        posVars = [...Array(n).keys()];

        console.log("Etapa 0");
        console.table(matrix);

        for (let i = 0; i < n - 1; i++) {
            gauss_ptotal.pivoteo(Matrix, n, i);
            mults = [];
            for (let j = i + 1; j < n; j++) {
                mults.push(math.divide(matrix[j][i], matrix[i][i]));
            }
            Matrix.subset(math.index(math.range(i, n), math.range(0, n + 1)))
                .map((value, xy) => {
                    if (xy[0] >= 1) {
                        matrix[xy[0] + i][xy[1]] = math.add(value, -math.multiply(mults[xy[0] - 1], matrix[xy[0] + (i - xy[0])][xy[1]]));
                    }
                });
            console.log("Etapa " + i + 1);
            console.table(matrix);
        }

        let x = [];
        let temp = 0; 
        posVars.reverse();
        x[posVars[0]] = matrix[n-1][n]/matrix[n-1][n-1];
        for (let i = n - 2, f = 1; i > -1; i--, f++) {
            temp = matrix[i][n];
            for (let j = i,  r = f-1 ; j < i + f; j++, r--) {
                temp -=  matrix[i][n-1-r] * x[posVars[r]];
            }
            x[posVars[f]] = temp / matrix[i][i];
        }

        x.map((v, i) => console.log("x"+i+": "+v));
        return { matrix, x }
    },

    pivoteo: (Matrix, n, j) => {
        let matrix = Matrix._data;
        let max = {
            pos: [],
            val: 0,
        };

        Matrix.subset(math.index(math.range(j, n), math.range(j, n))).forEach(function (value, xy) {
            if (Math.abs(value) > Math.abs(max.val)) {
                max.pos = xy;
                max.val = value;
            }
        });

        if (max.pos[0] + j !== j)
            [matrix[max.pos[0] + j], matrix[j]] = [matrix[j], matrix[max.pos[0] + j]];

        if (max.pos[1] + j !== j) {
            for (let i = 0; i < n; i++) {
                [matrix[i][max.pos[1] + j], matrix[i][j]] = [matrix[i][j], matrix[i][max.pos[1] + j]];
            }
            [posVars[max.pos[1] + j], posVars[j]] = [posVars[j], posVars[max.pos[1] + j]]
        }
    }

};

let a = gaus_ptotal.evaluate([
    [2, -1, 0, 3, 1],
    [1, 0.5, 3, 8, 1],
    [0, 13, -2, 11, 1],
    [14, 5, -2, 3, 1]
])


