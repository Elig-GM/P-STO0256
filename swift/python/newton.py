import math

def f(x): return math.exp(-x) - math.pow(x, 2) * math.cos(2*x - 4) + 6*x + 3

def df(x): return -math.exp(-x) - (2*x * math.cos(2*x - 4) -
                                   2*math.pow(x, 2) * math.sin(2*x - 4)) + 6

if __name__ == "__main__":
    xi, tol = -0.5, 0.0005
    x, e = xi, tol + 1.0
    fx = f(x)
    dfx = None

    iter, n, error = 100, 0, 0

    print("\n{:^5}{:^18}{:^15}{:^15}\n".format("n", "xn", "f(x)", "Error"))
    print("|{:^4}|{:^15E}|{:^15E}|{:^15}|".format(n, x, fx, ""))
    while e > tol and fx != 0.0 and n < iter - 1:
        dfx = df(x)
        x -= fx/dfx
        fx = f(x)
        e = xi - x
        if error == 1:
            e /= x
        e = abs(e)
        xi = x
        n += 1
        print("|{:^4}|{:^15E}|{:^15E}|{:^15E}|".format(n, x, fx, e))

    print(
        "\nLa raiz es de f(x) = exp(-x) - x^2*cos(2x-4) + 6x + 3; es: {:.20f}\n".format(x))
