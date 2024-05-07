from flask import render_template, request, Flask, session, redirect, url_for
import database as db

app = Flask(__name__)
app.secret_key = 'BAD_SECRET_KEY'


@app.route('/')
def start():
    user = session.get('username')
    if user is None:
        return redirect('/login')
    uname= db._select(f"""select name from accounts where username='{user}'""")[0][0]
    wordn=db.get_word()
    print(wordn)
    return render_template("words.html", wordn=wordn, uname=uname)

@app.route('/com')
def com():
    activity=[]
    user = session.get('username')
    uid= db._select(f"""select id from accounts where username='{user}'""")[0][0]
    print(uid)
    friend = db._select(f"""select distinct accounts.id from accounts, amities where (accounts.id=id1 or accounts.id=id2) and (id1={uid} or id2={uid}) """)
    print(friend)
    for i in range(len(friend)):
        print(friend[i][0])
        activity.append(db.get_entries_by(friend[i][0]))
        print('act',activity)
    activity.pop(0)
    print(activity)
    return render_template("community.html", activity=activity)

@app.route('/friend')
def friend():
    accounts = db.get_all_accounts()
    print(accounts)
    user = session.get('username')
    uid= db._select(f"""select id from accounts where username='{user}'""")[0][0]
    if request.method=='POST':
        friende = request.json['friende']
        db.friend(uid, friende)

    return render_template("list.html", accounts=accounts)

@app.route('/journal', methods=['GET','POST'])
def journal():
    user = session.get('username')
    print(user)
    entries=db.entries_by(user)
    uid= db._select(f"""select id from accounts where username='{user}'""")[0][0]
    user = [entries, user, uid]
    print(user)
    if request.method == 'POST':
        #try:
            entry = request.json['entry']
            print(entry)
            # stat = request.form['stat']

            db.add_entry(entry, uid)

            return "yo" #redirect(url_for('journal'))  # Redirect to the same page after submission
            #return "Missing 'entry' or 'stat' field in the form data", 400  # Return a 400 Bad Request error
    return render_template("journal.html", user=user)


@app.route('/logout')
def logout():
    session.pop('username', default=None)
    return redirect('/')


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

@app.route('/wordsjson')
def wordsjson():
    return open("sgb-words.json", "r").read()

if __name__ == "__main__":
    app.run(debug=True)

