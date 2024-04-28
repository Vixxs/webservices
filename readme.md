# Webservice

## Prérequis

Assurez-vous d'avoir Docker installé sur votre machine.

## Lancement du projet

Pour lancer le projet, ouvrez un terminal à la racine du projet et exécutez la commande suivante :

```bash
docker-compose up -d
```

Cette commande va lancer tous les services définis dans le fichier docker-compose.yml.

## Tester l'API
Une fois que le projet est lancé, vous pouvez tester l'API en utilisant un outil comme Postman ou curl.

Voici un exemple de requête que vous pouvez faire :
```bash
curl -X GET http://localhost:3001/api/movies
```

## Documentation de l'API
Pour plus d'informations sur les points de terminaison de l'API, consultez la documentation de l'API Swagger à l'adresse suivante : 
```bash
Auth service : http://localhost:3000/api
```
```bash
Movie service : http://localhost:3001/api
```