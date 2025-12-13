# Projet Développement Web - Gestion de Location de Matériel

## Membres du groupe
- Ayman Zeggane
- Manil Talamali
- Wael chatouan

## Thème choisi
Thème 3 — Location de matériel : Application permettant de gérer du matériel, des réservations et le suivi d’usage.

## Architecture
Ce projet est divisé en deux parties :
- **/frontend** : Application React (avec Vite)
- **/backend** : API NodeJS avec Express et Sequelize/SQLite.

---

##  Procédure de Lancement Complète

Le Backend et le Frontend doivent être lancés séparément.

### Pré-requis
* Avoir **Node.js**  installé.
* Avoir **Git** installé.

### Étape 1 : Cloner le Répertoire
git clone https://github.com/Aymanzegg/Projet_-Devloppement_Web.git

### Étape 2 : Lancement du Backend

L'API ici utilise une base de données locale (SQLite) et s'exécute sur le port 3000 :

1.  Installation des packages :
cd backend
npm install

2. Lancement du serveur :
npm run dev

### Étape 3 : Lancement du Frontend
1. Lancement de l'application :
npm run dev (L'application s'ouvrira via le lien affiché http://localhost:5173)



### Étape Finale : Démo rapides

si role admin : patron@kiloutou.fr (email), admin (password) [Peut Supprimer du matériel et créer des réservations.]
si role user :  vous devez créer votre compte et ainsi vous connecter à la plateforme ou vous pouvez Réserver du matériel et voir uniquement ses réservations.