# Shibui

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Environment 

Deux choix pour la base de données : Supabase, ou PostGres en local.
Ce qui suit suppose que la base et la table `templates` sont crées (voir `/sql`).

Les bases sont interchangeables automatiquement en modifiant l'url `DATABASE_URL` du `.env`.

Si on utilise une base PostGres, il faut, avec le serveur bdd en fonctionnement et la variable d'environnement mise en place :
```text
// Récupère le schéma directement à la base en fonctionnement et le copie en local
npx prisma db pull

// Crée le client prisma à partir du fichier `schema.prisma` généré.
npx prisma generate
```