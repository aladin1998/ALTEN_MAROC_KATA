
```md
# Back Products

Ceci est un projet Spring Boot pour la gestion des produits dans le cadre d'un KATA à passer chez ALTEN

## Quick Start

### Prérequis

- Java 21 ou supérieur 
- Maven 3.6.3 ou supérieur

### Setup

1. Clonez le repository:

```sh
git clone <repository-url>
cd back/back-products
```

2. Buildez le projet:

```sh
./mvnw clean install
```

3. Exécutez l'application :

```sh
./mvnw spring-boot:run
```

### Utilisation de la base de données H2

Le projet est configuré pour utiliser une base de données H2 en mémoire pour le développement. La console H2 est activée pour un accès facile.

#### Accéder à la console H2

1. Démarrez l'application.
2. Ouvrez votre navigateur web et allez à `http://localhost:8080/h2-console`.
3. Utilisez les cridentials suivants pour se connecter :
   - **JDBC URL**: `jdbc:h2:mem:testdb`
   - **Username**: `sa`
   - **Password**: `password`

### Swagger UI

Le projet inclut Swagger UI pour la documentation API. Vous pouvez y accéder à `http://localhost:8080/swagger-ui/index.html#/`.