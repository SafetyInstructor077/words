import sqlite3
from requests import get
import re

DBNAME = "accounts.db"

def _select(requete, params=None):
    """ Exécute une requête type select"""
    with sqlite3.connect(DBNAME) as db:
        c = db.cursor()
        try:
            #meme s'il n'y a pas de parametres, la requete s'execute
            if params is None:
                c.execute(requete)
            else:
                c.execute(requete, params)
            #prend tout les resultats de la requete
            result=c.fetchall()
            return result
        except Exception as e:
            #gere toutes les exceptions lors de l'execution de la requete
            print(f"Error during insert select operation: {e}")
            #s'il y a erreur, 'roll back' tout les changements 
            db.rollback()
        finally:
            #ferme cursor pour liberer les ressources
            c.close()

def _insert(requete, params=None):
    with sqlite3.connect(DBNAME) as db:
        c=db.cursor()
        try:
            #meme s'il n'y a pas de parametres, la requete s'execute
            if params==None:
                c.execute(requete)
            else:
                c.execute(requete, params)
            #valide les modifications dans la base de donnees 
            db.commit()
        except Exception as e:
            print(f"Error during insert insert operation: {e}")
            db.rollback()
            # re-lance l'exception pour signaler l'erreur
            raise
        finally:
            c.close()

def get_max_id_account():
    requete = """select max(id) from accounts;"""
    result= _select(requete)
    return result[0][0] if result and result[0] else 0

def add_account(username, name, password):
    requete = f"""insert into Accounts (id, username, name, password) values (?, ?, ?, ?)"""
    id = get_max_id_account()+1
    return _select(requete, (id, username, name, password))

def add_entry(entry, uid):
    print('d', entry, uid)
    requete=f"""insert into j_entries (user, entry) values ((?), ?) """
    return _select(requete, (uid, entry))

def entries_by(user):
    requete = f"select j_entries.entry from j_entries, accounts where accounts.username='{user}' and j_entries.user=accounts.id"
    return _select(requete)

def get_all_accounts():
    requete = """select id, name, username, password from accounts"""
    return _select(requete)

def get_word():
    requete="""SELECT *  FROM words ORDER BY random() LIMIT 1"""
    return _select(requete)

def login(username, password):
    ru="""select * from accounts where username=?"""
    rp="""select password from accounts where username=?"""
    rur=_select(ru, (username,))
    print("RUR")
    print(rur)
    if rur!=[]:
        rpr=_select(rp, (username,))
        print("rpr")
        print(rpr[0][0])
        if rpr[0][0]==password:
            print(f"bravo you logged in, {username, password}")
            return True
        else:
            print("wrong")
            return False
    else:
        print("wrong user")
        return False

def friend(user, friend):
    requete="""INSERT INTO amities (id1, id2) VALUES (?,?)"""
    return _select(requete, (user, friend))

def get_entries_by(user):
    print(user)
    requete="""SELECT Accounts.username, j_entries.entry FROM j_entries, Accounts WHERE j_entries.user=accounts.id and j_entries.user=? """
    return _select(requete, (str(user)))
