# TP Centre aéré

Ci-dessous les instructions de déploiement du projet.

## Dépendences

- PHP >= 7.2
- Composer >= 1.6
- Extensions :
	- socket

## Guide de déploiement

### Installation des dépendences

Une fois le dépôt git récupéré, rendez-vous à la racine du projet, puis, dans votre terminal, installez les dépendences via `composer` :

```bash
composer install
```

**NB:** Si vous voyez ce message :

	2 node packages can be optionally installed/updated.  
		- Enter Y to install/update them automatically on composer install/update.  
		- Enter N to ignore them and not asking again.  
		- Enter M to manually decide for each package at each run. [Y/N/M]

Entrez : `N`

### Initialisation de la configuration

Renommez le fichier `env.json` situé à la racine du projet

```bash
mv env.json.example env.json
```

Une fois ceci fait, complétez les informations d'identification à MySQL par rapport à votre serveur SQL.  
Vous devriez trouver cette structure à compléter (dans le fichier `env.json`) :

```json
"mysql": {
  "host": "xxxxx",
  "port": 3306,
  "user": "xxxx",
  "password": "xxxx"
}
```

### Démarrage du serveur

Tout est prêt !  
Démarrez le serveur avec la commande suivante :

```bash
php app.php
```

Vous devriez voir un message en console du type :

> [2019-02-21 12:40:05] Server started and listening on 127.0.0.1:8000 ...

**NB :** La ressource se trouve à l'adresse : `http://localhost:<port>`