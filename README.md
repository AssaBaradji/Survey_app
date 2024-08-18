# Survey App

## Description

Survey App est une application JavaScript permettant de gérer des enquêtes de satisfaction des clients. Elle utilise MongoDB pour stocker les données et permet d'effectuer des opérations CRUD (Create, Read, Update, Delete) sur les enquêtes, les questions, et les réponses.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version 12 ou supérieure)
- [MongoDB](https://www.mongodb.com/try/download/community) (version 4.0 ou supérieure)

## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :

1. **Clonez le repository :**

   ```bash
   git clone https://github.com/AssaBaradji/Survey_app1.git

   ```

2. **Accédez au dossier du projet :**

   ```bash
   cd survey_app1
   ```

3. **Installez les dépendances :**

   ```bash
   npm install
   ```

4. **Configurez la base de données :**

## Configuration de la Base de Données

- Assurez-vous que MongoDB est en cours d'exécution sur votre machine locale.
- Configurez les paramètres de connexion dans `config/database.js` pour correspondre à votre configuration MongoDB.

- Les collections nécessaires (surveys, questions, answers) seront automatiquement créées lors de l'exécution de l'application si elles n'existent pas déjà.

## Documentation des Fonctions

### Enquêtes

- **`addSurvey(survey)`** : Ajoute une nouvelle enquête à la base de données.

  - _Paramètre :_ `{ name: string, description: string, createdAt: date}, createdBy:{employeeName: string, employeeRole: string}`

- **`getSurveyByName()`** : liste les détails des tous les enquêtes.

- **`updateSurvey(id, updatedSurvey)`** : Met à jour les informations d'une enquête existante.

  - _Paramètre :_ `( id: string, updatedSurvey: {surveyId: int, name: string, description: string, createdAt: date}, createdBy:{employeeName: string, employeeRole: string} )`

- **`deleteSurvey(id)`** : Supprime une enquête de la base de données par son ID.
  - _Paramètre :_ `{ id: string }`

### Questions

- **`addQuestion(question)`** : Ajoute une nouvelle question à la base de données.

  - _Paramètre :_ `{ title: string, type: string, surveyId: string }`

- **`getQuestionById()`** : Récupère les détails de toutes les questions.

- **`updateQuestion(id, updatedQuestion)`** : Met à jour les informations d'une question existante.

  - _Paramètre :_ `( id: string, updatedQuestion: { title: string, type: string, surveyId: string })`

- **`deleteQuestion(id)`** : Supprime une question de la base de données par son ID.
  - _Paramètre :_ `{ id: string }`

### Réponses

- **`addAnswer(answer)`** : Ajoute une nouvelle réponse à la base de données.

  - _Paramètre :_ `{ title: string  idQuestion: string}`

- **`getAnswerById()`** : Récupère les détails de toutes les réponse.

- **`updateAnswer(id, updatedAnswer)`** : Met à jour les informations d'une réponse existante.

  - _Paramètre :_ `( id: string, updatedAnswer: { title: string, idQueston: string })`

- **`deleteAnswer(id)`** : Supprime une réponse de la base de données par son ID.
  - _Paramètre :_ `{ id: string }`

## Utilisation

Pour démarrer l'application, exécutez la commande suivante :

```bash
npm start
```

## Auteur

- (Assa Baradji)[https://github.com/AssaBaradji/Survey_app.git].
