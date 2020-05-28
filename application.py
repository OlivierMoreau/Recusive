import copy
from flask import Flask, flash, jsonify, redirect, render_template, request


app = Flask(__name__, static_url_path='/static')

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/hanoi')
def hanoi():
    return render_template('hanoi.html')

@app.route('/fibonacci')
def fibonnaci():
    return render_template('fibonacci.html', fib="")

cache = {}

@app.route('/fibonacci_calc', methods=["GET","POST"])
def fibonnaci_calc():

    if request.form.get("n") != None:
        n = int(request.form.get("n"))
        try:
            return render_template('fibonacci.html', fib=f"The {n}th number of the fibonacci sequence is: {fibonacci(n)}")
        except RecursionError:
            return render_template('fibonacci.html', fib=f"Recursion error: maximum recursion depth exceeded in comparison. Try going up the sequence in smaller increments (~900).")
        except:
            return render_template('fibonacci.html', fib=f"Something went wrong.")

    if request.args.get("n") != None:
        cache.clear()
        n = int(request.args.get("n"))
        fibonacci(n + 2)
        return jsonify(cache)

    return render_template('fibonacci.html', fib="")

@app.route('/matrix_determinant')
def matrix_determinant():

    def determinant(matrix):

        if len(matrix[0]) == 1:
            return matrix[0][0]
        elif len(matrix[0]) == 2:
            return matrix[0][0] * matrix[1][1]  - matrix[0][1] * matrix[1][0]
        else:

            new_mat = matrix[1:]
            res = []
            for i in range(len(matrix)):

                detmin = copy.deepcopy(new_mat)

                for x in detmin:
                    del x[i]

                res.append(detmin)

            final = 0
            for y in range(len(matrix)):
                if y % 2 == 0 :
                    final += matrix[0][y] * determinant(res[y])
                else:
                    final -= matrix[0][y] * determinant(res[y])
            return final


def fibonacci(n):
    if n in [0, 1]:
        cache[n] = n
        return n
    if cache.get(n - 1) != None:
        cache[n] = cache[n - 1] + cache[n - 2]
        return cache[n - 1] + cache[n - 2]
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)