// import { Util } from './util.js'
var math = require("mathjs");

const gauss = {
    evaluate: (array) => {
        let Matrix = math.matrix(array);
        let matrix = Matrix._data,
            n = Matrix._size[0],
            mult;

        for (let i = 0; i < n-1; i++) {
            mult = [];
            for (let j = i + 1; j < n; j++) {
                mult.push(matrix[j][i] / matrix[i][i]);
            }
            Matrix.subset(math.index(math.range(i, n), math.range(0, n+1)))
                // eslint-disable-next-line no-loop-func
                .forEach(function (value, xy) {
                    if (xy[0] >= 1) {
                        matrix[ xy[0] + i ][ xy[1] ] = value - mult[ xy[0]-1 ] * matrix[ xy[0] + ( i - xy[0] ) ][ xy[1] ];
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
        return { matrix, x }
    }
};
