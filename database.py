import sqlite3
from requests import get
import re

def add_account(account):
    requete = f"""insert into Account (id, username, name, password) values (?, ?, ?, ?)"""
    id = get_max_id_nom()+1
    return _select(requete, (id, username, name, password))
