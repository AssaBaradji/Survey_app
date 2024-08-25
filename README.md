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
   git clone https://github.com/AssaBaradji/Survey_app.git

```

2. **Accédez au dossier du projet :**
 ```bash
   cd Survey_app
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

  - _Paramètre :_ `{surveyId:int, name: string, description: string, createdAt: date}, createdBy:{employeeName: string, employeeRole: string}`

- **`getSurveys()`** : Liste les détails des tous les enquêtes.
- **`getSurveyByName(name: string)`** : Récupère  une enquête par son nom et l'affiche.

- **`updateSurvey(surveyId, updatedSurvey)`** : Met à jour les informations d'une enquête existante.

  - _Paramètre :_ `( surveyId: int, updatedSurvey: {name: string, description: string, createdAt: date}, createdBy:{employeeName: string, employeeRole: string} )`

- **`deleteSurvey(surveyId)`** : Supprime une enquête de la base de données par son ID.
  - _Paramètre :_ `{ surveyId: int }`

### Questions

- **`addQuestion(question)`** : Ajoute une nouvelle question à la base de données.

  - _Paramètre :_ `{questionId:int, title: string, type: string, options:[int], surveyId: int }`

- **`getQuestions()`** : Liste les détails des toutes les questions.
- **`getQuestionById(questionId: int)`** : Récupère  une question par son id et l'affiche.

- **`updateQuestion(questionId, updatedQuestion)`** : Met à jour les informations d'une question existante.

  - _Paramètre :_ `( questionId: int, updatedQuestion: { title: string, type: string, options:{minValue:int, maxValue: int, step: int}, surveyId: int })`

- **`deleteQuestion(questionId)`** : Supprime une question de la base de données par son ID.
  - _Paramètre :_ `{ questionId: int }`

### Réponses

- **`addAnswer(answer)`** : Ajoute une nouvelle réponse à la base de données.

  - _Paramètre :_ `{answerId:int, title: string  idQuestion: int}`

- **`getAnswers()`** :  Liste les détails des toutes les reponses.
- **`getAnswerById(answerId: int)`** : Récupère  une reponse par son id et l'affiche.

- **`updateAnswer(answerId, updatedAnswer)`** : Met à jour les informations d'une réponse existante.

  - _Paramètre :_ `( answerId: int, updatedAnswer: { title: string, idQueston: int })`

- **`deleteAnswer(answerId)`** : Supprime une réponse de la base de données par son ID.
  - _Paramètre :_ `{ answerId: int }`

## Utilisation

Pour démarrer l'application, exécutez la commande suivante :

```bash
npm start
```

## Auteur

- [Assa Baradji](https://github.com/AssaBaradji)
