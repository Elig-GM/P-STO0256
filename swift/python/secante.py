import math

def f(x) : return math.exp(-math.pow(x, 2) + 1) - 4 * math.pow(x, 3) + 25

if __name__ == "__main__":
    x0, x1, tol = 1.0, 2.0,0.0005
    fx0, e = f(x0), tol + 1.0
    fx1, xa, den = None, None, None

    iter, n, error = 100, 0, 0

    print("\n{:^5}{:^18}{:^15}{:^15}\n".format("n", "xn", "f(x)", "Error"))
    if fx0 == 0.0 :
        print("\nX0 = {:.15f} es una Raíz\n".format(x0))
    else :
        fx1 = f(x1);
        den = fx1 - fx0;
        print("|{:^4}|{:^15E}|{:^15E}|{:^15}|".format(n, x0, fx0, ""))
        n += 1
        print("|{:^4}|{:^15E}|{:^15E}|{:^15}|".format(n, x1, fx1, ""))
        while e > tol and fx1 != 0.0 and den != 0.0 and n < iter - 1 :
            xa = x1 - fx1 * (x1 - x0) / den
            e = xa - x1
            if error == 1 :
                e /= x1
            e = abs(e) 
            x0 = x1
            fx0 = fx1
            x1 = xa
            fx1 = f(x1)
            den = fx1 - fx0
            n += 1
            print("|{:^4}|{:^15E}|{:^15E}|{:^15E}|".format(n, x1, fx1, e));

    print("\nLa raiz es de f(x) = exp(-x^2+1) - 4x^3 + 25; es: {:.20f}\n".format(x1))
