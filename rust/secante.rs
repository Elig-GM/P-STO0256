fn f(x: f64) -> f64{
    return (-x.powi(2) + 1.0).exp() - 4.0 * x.powi(3) + 25.0
}

fn main() {
    let (mut x0, mut x1, tol ) = (1.0f64, 2.0f64,0.0005f64);
    let (mut fx0, mut e) = (f(x0), tol + 1.0);
    let (mut fx1, mut xa, mut den);

    let  (iter, mut n, error) = (100i32, 0i32, 0i32);

    println!("\n{:^5}{:^24}{:^24}{:^24}\n", "n", "xn", "f(x)", "Error");
    if fx0 == 0.0 {
        print!("\nX0 = {:} es una Raíz\n", x0);
    } else {
        fx1 = f(x1);
        den = fx1 - fx0;
        print!("|{:^4}|{:^23E}|{:^23E}|{:^23}|\n", n, x0, fx0, "");
        n += 1;
        print!("|{:^4}|{:^23E}|{:^23E}|{:^23}|\n", n, x1, fx1, "");
        while e > tol && fx1 != 0.0 && den != 0.0 && n < iter - 1{
            xa = x1 - fx1 * (x1 - x0) / den;
            e = xa - x1; 
            if error == 1 {
                e /= x1
            }
            e = e.abs(); 
            x0 = x1;
            fx0 = fx1;
            x1 = xa;
            fx1 = f(x1);
            den = fx1 - fx0;
            n += 1;
            print!("|{:^4}|{:^23E}|{:^23E}|{:^23E}|\n", n, x1, fx1, e);
        }
    }
    println!("\nLa raiz es de f(x) = exp(-x^2+1) - 4x^3 + 25; es: {:}\n", x1)
}
