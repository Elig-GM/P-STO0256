import math

def f(x) : return x * math.exp(x) - math.pow(x,2) - 5 * x - 3 

def g(x) : return (x * math.exp(x) - math.pow(x,2) - 3)/5

if __name__ == "__main__" :    
    xi, tol = -0.5, 0.0005 
    x, fx, e = xi, f(xi), tol + 1

    iter, n, error = 100, 0, 0

    print("\n{:^5}{:^18}{:^15}{:^15}\n".format("n", "xn", "f(x)", "Error"))
    print("|{:^4}|{:^15E}|{:^15E}|{:^15}|".format(n, x, fx, ""))

    while e > tol and fx != 0 and n < iter - 1 :
        x = g(xi)
        fx = f(x)
        e = (x - xi) 
        if error == 1 :
            e /= x
        e = abs(e) 
        xi = x
        n += 1
        print("|{:^4}|{:^15E}|{:^15E}|{:^15E}|".format(n, x, fx, e));

    print("\nLa raiz es de f(x) = x * exp(x) - x^2 - 5x - 3; es: {:.20f}\n".format(x))
