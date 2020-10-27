// import { Util } from './util.js'
var math = require("mathjs");

const gauss_pparcial = {
    evaluate: (array) => {
        let Matrix = math.matrix(array);
        let matrix = Matrix._data,
            n = Matrix._size[0],
            mults,
            max = {
                pos: 0,
                val: 0,
            };
        
        for (let i = 0; i < n; i++) {
            if ( matrix[i][0] > max.val ) {
                max.val = matrix[i][0];
                max.pos = i;
            }
        }

        if (max.pos > 0) {
            [matrix[max.pos], matrix[0]] = [matrix[0], matrix[max.pos]];
        }

        for (let i = 0; i < n-1; i++) {
            console.log("Etapa " + i);
            console.log(matrix);
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
        }
        
        let x = [];
        let temp = 0;
        x.push(matrix[n-1][n]/matrix[n-1][n-1]);
        for (let i = n - 2; i > -1; i--) {
            temp = matrix[i][n];
            for (let j = i+1, k = x.length-1; j < n; j++, k --) {
                temp -=  matrix[i][j] * x[k];
            }
            x.push( temp / matrix[i][i] );
        }
        x.reverse().map((v, i) => console.log("x"+i+": "+v));
        return { matrix, x }
    }
};

let a = gauss_pparcial.evaluate([
    [2, -1, 0, 3, 1],
    [1, 0.5, 3, 8, 1],
    [0, 13, -2, 11, 1],
    [14, 5, -2, 3, 1]
])

