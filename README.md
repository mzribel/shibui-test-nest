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

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

## Environment 

Deux choix pour la base de données : Supabase, ou PostGres en local.
Ce qui suit suppose que la base et la table `templates` sont crées (voir `/sql`).

Les bases sont interchangeables automatiquement en changeant le paramètre `DATABASE_PROVIDER` du `.env`.

Si on utilise une base PostGres, il faut, avec le serveur en fonctionnement et la variable d'environnement mise en place :
```text
// Récupère le schéma directement à la base en fonctionnement
npx prisma db pull

// Crée le client prisma à partir du fichier `schema.prisma` généré.
npx prisma generate
```