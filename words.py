from flask import render_template, request, Flask, session, redirect, url_for
import database as db

app = Flask(__name__)
app.secret_key = 'BAD_SECRET_KEY'


@app.route('/')
def start():
    return render_template("words.html")
@app.route('/logout')
def logout():
    session.pop('username', default=None)
    return '<h1>Session deleted!</h1>'


@app.route('/admins')
def admins():
    accounts = db.get_all_accounts()
    print(accounts)
    return render_template("admin.html", accounts=accounts)

@app.route('/insert', methods=['GET', 'POST'])
def create_account():
    print("insert")
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        account = data
        db.add_account(account['username'], account['name'], account['password'])
        return str(db._select(f"select id from accounts where username = '{account['username']}'")[0][0])
    else:
        return render_template("insert.html")
@app.route('/login', methods=['GET', 'POST'])
def login():
    print("login")
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        account = data
        print(db.login(account['username'], account['password']))
        if db.login(account['username'], account['password']):
            session['username'] = account['username']
            return str(db._select(f"select id from accounts where username = '{account['username']}'")[0][0])
        else:
            return "Login failed"
    else:
        return render_template("login.html")
@app.route('/wordle')
def wordle():
    return render_template("wordle.html")
# @app.route('/about')
# def about():
#     return render_template("about.html")

# @app.route('/library')
# def library():
#     jeux = db.get_all_jeux()
#     print(jeux)
#     return render_template("list_games.html", jeux=jeux)

if __name__ == "__main__":
    app.run(debug=True)
