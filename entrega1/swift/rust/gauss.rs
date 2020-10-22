fn main() {
    let mut a: [[f64; 5]; 4] = [
        [20.0, -1.0, 3.0, 4.0, 30.0],
        [6.0, 23.0, 4.0, 3.0, -10.0],
        [7.0, 21.0, 46.0, 9.0, 20.0],
        [-3.0, -9.0, 12.0, 38.0, -14.0]
    ];
    let mut x: [f64; 4] = [0.0;4];
    let mut ratio;
    let n = 4;

    for i in 0..n {
        for j in i+1..n {
            ratio = a[j][i]/a[i][i];
            for k in 0..n+1 {
                a[j][k] = a[j][k] - ratio * a[i][k];
            }
        }
    }

    print!("Solucion\n\n");
    for i in 0..n {
        print!("| ");
        for j in 0..n+1 {
            if j != n {
                print!("{:^8.1}", a[i][j]);
            } else {
                print!("|{:^8.1}|\n", a[i][j]);
            }
        }
    }

    x[n-1] = a[n-1][n]/a[n-1][n-1];
    for i in (0..n-1).rev() {
        x[i] = a[i][n];
        for j in i+1..n {
            x[i] = x[i] - a[i][j]*x[j];
        }
        x[i] = x[i]/a[i][i];
    }
    for i in 0..n {
        print!("\nX{:} = {:>}", (i+1), x[i]);
    }
}