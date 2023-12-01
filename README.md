Pour commencer à travailler :

La première fois, on copie .env.sample to.env et on set les variables.

Ensuite, pour lancer le projet en dev, utiliser les commandes :

docker compose up --build // ça lance le back avec l'api et la BDD

cd frontend && npm run dev // on va dans le dossier front end et on lance npm run dev

On peut si besoin de tester tout lancer en dev via docker, décommenter la partie frontend dans le fichier docker-compose.yml, et à ce moment là on a besoin que de docker compose up --build pour lancer tout le projet (frontend, backend et bdd).

On a aussi un docker-compose.prod.yml pour simuler un environnement de prod si besoin.
