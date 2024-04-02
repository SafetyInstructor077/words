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
            print(f"Error during insert operation: {e}")
            #s'il y a erreur, 'roll back' tout les changements 
            db.rollback()
        finally:
            #ferme cursor pour liberer les ressources
            c.close()

def get_max_id_account():
    requete = """select max(id) from accounts;"""
    result= _select(requete)
    return result[0][0] if result and result[0] else 0

def add_account(account):
    requete = f"""insert into Accounts (id, username, name, password) values (?, ?, ?, ?)"""
    id = get_max_id_account()+1
    return _select(requete, (id, username, name, password))
