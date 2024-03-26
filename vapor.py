from flask import render_template, request, Flask
# import database as db

app = Flask(__name__)

@app.route('/')
def store():
    # jeux = db.get_featured()
    # print(jeux)
    return render_template("words.html")

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
