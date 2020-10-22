// // import * as math from "mathjs";
var math = require("mathjs");

let numMaxRow = [];
const gaus = {
    
    evaluate: (array) => {
        let Matrix = math.matrix(array);
        let matrix = Matrix._data,
            n = Matrix._size[0],
            mults;
            
        gaus.pivoteo(Matrix, n, 0);
        for (let i = 0; i < n-1; i++) {
            mults = [];
            for (let j = i + 1; j < n; j++) {
                mults.push(matrix[j][i] / matrix[i][i]);
            }
            Matrix.subset(math.index(math.range(i, n), math.range(0, n+1)))
                // eslint-disable-next-line no-loop-func
                .forEach(function (value, xy) {
                    if (xy[0] >= 1) {
                        matrix[ xy[0] + i ][ xy[1] ] = value - mults[ xy[0]-1 ] * matrix[ xy[0] + ( i - xy[0] ) ][ xy[1] ];
                    }
                });
            gaus.pivoteo(Matrix, n, i+1);
        }
        
        let x = new Array(4).fill(0);
        let temp = 0; 
        let firtsRow = math.row(matrix, 0)[0];
        x[firtsRow.findIndex(e => (e === numMaxRow[0]))] = matrix[n-1][n]/matrix[n-1][n-1];
        for (let i = n - 2, f = 1; i > -1; i--, f++) {
            temp = matrix[i][n];
            for (let j = i,  r = f-1 ; j < i + f; j++, r--) {
                temp -=  matrix[i][n-1-r] * x[firtsRow.findIndex(e => (e === numMaxRow[r]))];
            }
            x[firtsRow.findIndex(e => (e === numMaxRow[f]))] = temp / matrix[i][i];
        }

        return { matrix, x }
    },

    pivoteo: (Matrix, x, j) => {
        let max = {
            pos: [],
            val: 0,
        };
        let matrix = Matrix._data;

        Matrix.subset(math.index(math.range(0, x), math.range(j, x))).forEach(function (value, xy) {
            if ( value > max.val ) {
                max.pos = xy;
                max.val = value;
            }
        });
        
        if (max.pos[0] > 0) {
            [matrix[max.pos[0]], matrix[j]] = [matrix[j], matrix[max.pos[0]]];
            if (j === 0)
                numMaxRow = [...math.row(matrix, 0)[0]];
            max.col = math.column(matrix, max.pos[1]+j);
            if (max.pos[1] > 0) {
                for (let i = 0; i < x; i++) {
                    [matrix[i][max.pos[1] + j], matrix[i][j]] = [matrix[i][j], matrix[i][max.pos[1] + j]];
                }
            }
        }
    }

};

let a = gaus.evaluate([
    [20, -1, 3, 4, 30],
    [6, 23, 4, 3, -10],
    [7, 21, 46, 9, 20],
    [-3, -9, 12, 38, -14]
])
let b = gaus.evaluate([
    [2, -3, 4, 1, 10],
    [-4, 2, 1, -2, -10],
    [1, 3, -5, 3, 32],
    [-3, -1, 1, -1, -21]
])

