import math

def f(x): return math.exp(3*x - 12) + x * math.cos(3*x) - math.pow(x, 2) + 4

if __name__ == "__main__" :

    xi, xs, tol  = 2.0, 3.0, 0.0005
    fxi, fxs, e = f(xi), f(xs), tol + 1.0
    xa, fxm, xm = None, None, None

    iter, n, error = 100, 0, 0

    print("\n{:^5}{:^18}{:^15}{:^15}{:^16}{:^16}\n".format(
        "n", "xi", "xs", "xm", "f(xm)", "Error"))

    if fxi == 0.0:
        print("\nXi = {:f} es una Raíz\n", xi)
    elif fxs == 0.0:
        print("\nXs = {:f} es una Raíz\n", xs)
    elif fxi * fxs < 0.0:
        xm = (xi + xs) / 2.0
        fxm = f(xm)
        print("|{:^4}|{:^15E}|{:^15E}|{:^15E}|{:^15E}|{:^15}|".format(
              n, xi, xs, xm, fxm, ""))
        while e > tol and fxm != 0.0 and n < iter - 1:
            if fxi * fxm < 0.0:
                xs = xm
            else:
                xi = xm

            xa = xm
            xm = (xi + xs) / 2.0
            fxm = f(xm)
            e = xm - xa
            if error == 1:
                e /= xm
            e = abs(e)
            n += 1
            print("|{:^4}|{:^15E}|{:^15E}|{:^15E}|{:^15E}|{:^15E}|".format(
                n, xi, xs, xm, fxm, e))

    print(
        "\nLa raiz es de f(x) = exp(3x-12) + x*cos(3x) - x^2 + 4; es: {:.20f}\n".format(xm))
