import sqlite3
from requests import get
import re

DBNAME = "wordle.db" 

def _select(requete, params=None):
    """ Exécute une requête type select"""
    with sqlite3.connect(DBNAME) as db:
        c = db.cursor()
        if params is None:
            c.execute(requete)
        else:
            c.execute(requete, params)
        res = c.fetchall()
    return res


def get_all_wordles():
    """Renvoie (avec une limite de 100) les jeux sans les trier et les filtrer"""
    requete = """select nomJeu,idJeu,prix,image,uScore,date,achievements,developpeur.nomDev,editeur.nomEditeur,jeu.idPlat,platformes.nomPlat,description from jeu
                 inner join developpeur on developpeur.idDev = jeu.idDev
                 inner join editeur on editeur.idEditeur = jeu.idEditeur
                 inner join platformes on platformes.idPlat = jeu.idPlat
                 limit 100""" # on y ajoute aussi le nom du développeur et celui de l'éditeur, avec les platformes sur lesquelles le jeu est disponible
    return _select(requete)