from flask import render_template, request, Flask, session, redirect, url_for
import database as db

app = Flask(__name__)
app.secret_key = 'BAD_SECRET_KEY'


@app.route('/')
def start():
    return render_template("words.html")

@app.route('/com')
def com():
    users=db.oeuvres_de_type(id_type)
    return render_template("community.html", users=user)

# @app.route('/journal')
# def journal():
#     if request.method == 'POST':
#         data = request.get_json()
#         print(data)
#         entry = data
#         db.add_entry(entry['message'], entry['status'])
#         return str(db._select(f"select id from accounts where username = '{entry['username']}'")[0][0])
#     else:
#         return render_template("journal.html")

# @app.route('/journal', methods=['GET','POST'])
# def journal():
#     if request.method == 'POST':
#         entry = request.form['entry']
#         stat = request.form['stat']
#         db.add_entry(entry, stat)
#         return redirect(url_for('journal'))  # Redirect to the same page after submission
#     else:
#         return render_template("journal.html")

@app.route('/journal', methods=['GET','POST'])
def journal():
    user = session.get('username')
    entries=db.entries_by(user)
    if request.method == 'POST':
        try:
            entry = request.form['entry']
            # stat = request.form['stat']
            uid= f"""select id from accounts where username={user}"""
            print(entry, user, uid)

            db.add_entry(entry, user)
            return redirect(url_for('journal'))  # Redirect to the same page after submission
        except KeyError:
            return "Missing 'entry' or 'stat' field in the form data", 400  # Return a 400 Bad Request error
    return render_template("journal.html", user=user)


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

# @app.route('/about')
# def about():
#     return render_template("about.html")

# @app.route('/library')
# def library():
#     jeux = db.get_all_jeux()
#     print(jeux)
#     return render_template("list_games.html", jeux=jeux)

@app.route('/wordle')
def wordle():
    return render_template("wordle.html")

@app.route('/wordsjson')
def wordsjson():
    return open("sgb-words.json", "r").read()


if __name__ == "__main__":
    app.run(debug=True)

