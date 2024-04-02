from flask import render_template, request, Flask
# import database as db

app = Flask(__name__)

@app.route('/')
def store():
    # jeux = db.get_featured()
    # print(jeux)
    return render_template("words.html")

@app.route('/insert', methods=['GET', 'POST'])
def create_account():
    print("insert")
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        account = data
        db.add_account(account["name"], account["username"], account["password"])
        return str(db._select(f"select id from accounts where username = '{account['username']}'")[0][0])
    else:
        return render_template("insert.html")

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
