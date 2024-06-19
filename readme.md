# Webservice

## Prérequis

Assurez-vous d'avoir Docker installé sur votre machine.

## Lancement du projet

Pour lancer le projet, ouvrez un terminal à la racine du projet et exécutez la commande suivante :

```bash
docker-compose up -d
```

Cette commande va lancer tous les services définis dans le fichier `docker-compose.yml`.

## Tester l'API

L'API est livrée avec un ensemble de fixtures pour faciliter les tests :

### Authentification

#### Administrateur :
- **Login**: `admin`
- **Mot de passe**: `admin`

#### Utilisateur :
- **Login**: `user`
- **Mot de passe**: `user`

### Films :
- Une centaine de films avec leurs catégories respectives.

### Réservations :
- 5 cinémas avec 2 salles et 2 séances par salle.

Une fois que le projet est lancé, vous pouvez tester l'API en utilisant un outil comme Postman ou curl.

Voici un exemple de requête que vous pouvez faire :

```bash
curl -X GET http://localhost:3001/movies
```

N'oubliez pas d'utiliser le token d'authentification car la plupart des routes sont protégées.

## Documentation de l'API

Pour plus d'informations sur les points de terminaison de l'API, consultez la documentation Swagger à l'adresse suivante :

- **Service d'authentification** : [http://localhost:3000/api](http://localhost:3000/api)
- **Service de films** : [http://localhost:3001/api](http://localhost:3001/api)
- **Service de réservations** : [http://localhost:3002/api](http://localhost:3002/api)

### Notes supplémentaires

- Assurez-vous que les ports `3000`, `3001`, et `3002` sont disponibles et non utilisés par d'autres services.
- Les tokens d'authentification peuvent être obtenus via les endpoints d'authentification et doivent être inclus dans les en-têtes des requêtes pour accéder aux routes protégées.
- Consultez les fichiers `docker-compose.yml` et les fichiers de configuration des services pour plus de détails sur les paramètres et les configurations spécifiques.
