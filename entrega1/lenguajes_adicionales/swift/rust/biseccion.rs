fn f(x: f64) -> f64{
    return (3.0*x - 12.0).exp() + x * (3.0*x).cos() - x.powi(2) + 4.0
}

fn main() {
    let (mut xi, mut xs, tol ) = (2.0f64, 3.0f64,0.0005f64);
    let (fxi, fxs, mut e) = (f(xi), f(xs), tol + 1.0);
    let (mut xa, mut fxm);
    let mut xm = 0.0f64;

    let  (iter, mut n, error) = (100i32, 0i32, 0i32);

    println!("\n{:^5}{:^24}{:^24}{:^24}{:^24}{:^24}\n", "n", "xi", "xs", "xm", "f(xm)", "Error");
    if fxi == 0.0 {
        print!("\nXi = {:} es una Raíz\n", xi);
    } else if fxs == 0.0 {
        print!("\nXs = {:} es una Raíz\n", xs);
    } else if fxi * fxs < 0.0 {
        xm = (xi + xs) / 2.0;
        fxm = f(xm);
        print!("|{:^4}|{:^23E}|{:^23E}|{:^23E}|{:^23E}|{:^23}|\n", n, xi, xs, xm, fxm, "");
        while e > tol && fxm != 0.0 && n < iter - 1 {
            if fxi * fxm < 0.0 {
                xs = xm;
            } else {
                xi = xm;
            }
            xa = xm;
            xm = (xi + xs) / 2.0;
            fxm = f(xm);
            e = xm - xa; 
            if error == 1 {
                e /= xm;
            }
            e = e.abs(); 
            n += 1;
            print!("|{:^4}|{:^23E}|{:^23E}|{:^23E}|{:^23E}|{:^23E}|\n", n, xi, xs, xm, fxm, e);
        }
    }
    println!("\nLa raiz es de f(x) = exp(3x-12) + x*cos(3x) - x^2 + 4; es: {:}\n", xm)
}
