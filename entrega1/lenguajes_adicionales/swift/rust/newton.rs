fn f(x: f64) -> f64{
    return (-x).exp() - (x).powi(2) * (2.0*x - 4.0).cos() +  6.0 * x + 3.0
}

fn df(x: f64) -> f64{
    return -(-x).exp() -(2.0*x * (2.0*x - 4.0).cos() - 2.0 * (x).powi(2) * (2.0*x - 4.0).sin()) + 6.0
}


fn main() {
    let (mut xi, tol ) = (-0.5f64, 0.0005f64);
    let (mut x, mut e) = (xi, tol + 1.0);
    let mut fx = f(x);
    let mut dfx;

    let  (iter, mut n, error) = (100i32, 0i32, 0i32);

    println!("\n{:^5}{:^24}{:^24}{:^24}\n", "n", "xn", "f(x)", "Error");
    print!("|{:^4}|{:^23E}|{:^23E}|{:^23}|\n", n, x, fx, "");
    while e > tol && fx != 0.0 && n < iter - 1 {
        dfx = df(x);
        x -= fx/dfx;
        fx = f(x);
        e = xi - x; 
        if error == 1 {
            e /= x;
        } 
        e = e.abs(); 
        xi = x;
        n += 1;
        print!("|{:^4}|{:^23E}|{:^23E}|{:^23E}|\n", n, x, fx, e);
    }
    println!("\nLa raiz es de f(x) = exp(-x) - x^2*cos(2x-4) + 6x + 3; es: {:}\n", x)
}
