# Notes

## TODOs

- [x] L'auth guard s'applique partout de force
- [x] Problématiques de rolesguard avant authguard

06/02 : 
- [ ] Split le SupabaseAuthGuard pour le rendre indépendant de Supabase
- [ ] Vérifier @Public() + Rôle()

## Architecture 

### Philosophie 
- Abstraction des dépendances externes (authentification, services-tiers, APIs)
- Dans un premier temps, pas d'abstraction des composants internes maîtrisés (accès base via Prisma, logique applicative) mais encapsulation maîtrisée.

### Prisma
- Prisma appelle une URL Supabase, mais n'instancie pas de client Supabase (même système d'URL que pour un serveur PostGres en local) ; 

### Abstrait ou concret ? 

- Prisma n'instancie pas de client Supabase (concret)
- L'auth instancie un client Supabase (abstrait)
- Le système de fichier instancieria un client Supabase (abstrait)
- L'authentification email/mdp peut être locale et l'OAuth distante (deux abstractions qui peuvent être implémentées par le même service)

## AuthGuards 

Deux authGuards existe, déclarés par `./app.ts` :
- SupabaseAuthGuard (qui devra être abstrait en AuthGuard)
- RoleAuthGuard

### AuthGuard 

Par défaut, l'AuthGuard (identification requise) s'applique à toutes les routes.
Les routes et contrôleurs publics peuvent être préfixés du décorateur `@Public()`.

L'AuthGuard remplit Request.user, accessible via le décorateur @User() dans les paramètres d'une méthode de contrôleur.

### RolesGuard 

Les routes réservées à des rôles doivent être préfixées de `@Rôles(<Role>)`.
Si une route est préfixée par `@Public()`, le décorateur `Rôles()` n'aura aucun effet.

## Orchestration  

Afin d'éviter des dépendances circulaires ou non-maîtrisées, des modules orchestrateurs peuvent être créés pour diriger plusieurs opérations inter-modules.

Par exemple, le module `Account` orchestre des opérations pouvant appeler successivement `UserService`, `CompanyService`, etc.

## Modules

NestJS structure l'application en modules regroupant des fonctionnalités cohérentes. Il s'agit d'une entité fonctionnelle autonome qui encapsule une partie du domaine applicatif et permet de mieux contrôler les dépendances.

Chaque module est structuré selon une architecture n-tiers classique (Controller/Service/Model).

Pour chaque module, un fichier `<nom_module>.module.ts` doit être créé et importé dans `app.ts`.

### Fichier module

Le fichier `<x>.module.ts` regroupe les composants relatifs au domaine `X`.
Il déclare les controllers chargés d'exposer les endpoints, mais aussi les composants importés et exportés.

#### Providers

Les providers déclarent les composants instanciés et injectables par NestJS dans le module (services, repositories, adapters, guards).
Ils contiennent la logique applicative, l’accès aux données ou l’intégration avec des dépendances externes.

#### Imports

Les imports listent les modules dont ce module dépend pour fonctionner.
Importer un module permet d’utiliser les providers qu’il expose, sans recréer ni coupler directement leurs implémentations.

#### Exports

Les exports définissent les providers que le module rend accessibles aux autres modules.
Ils constituent la frontière publique du module et évitent l’accès direct à ses implémentations internes.

## Prisma 

Le schema Prisma faisant office de vérité absolue est celui de `./schema.prisma`.

Aucune modification de tables ne doit être réalisée sur Supabase (ou sur un PostGres local.), mais inscrite dans `./schema.prisma` puis migré vers la base.

Afin d'éviter les incohérences, les `PrismaRepositories` ne doivent pas retourner des entités Prisma mais des `Model` métier. 

### Migration 

1. Créer et appliquer la migration 

Une fois le fichier `./schema.prisma` modifié, on peut versionner les changements et les envoyer vers la base : 

```bash 
npx prisma migrate dev --name <nom_migration>
```

2. Regénérer le client Prisma 

Regénérer le client Prisma local permet notamment de garder les entités visible par le code à jour : 

```bash
npx prisma generate
```

