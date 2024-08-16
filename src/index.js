const {
  addQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} = require("./questionModule");

const {
  addAnswer,
  getAnswers,
  getAnswerById,
  updateAnswer,
  deleteAnswer,
} = require("./answerModule");

const {
  addSurvey,
  getSurveys,
  getSurveyByName,
  updateSurvey,
  deleteSurvey,
} = require("./surveyModule");

async function main() {
  try {
    await addQuestion({
      questionId: 2,
      title: "Quel est votre produit préféré ?",
      type: "singleChoice",
      answers: [],
    });

    const questions = await getQuestions();
    console.log("Questions:", questions);

    const question = await getQuestionById(2);
    if (question) {
      console.log("Question obtenue:", question);
    }

    await updateQuestion(1, {
      title: "Quel produit préférez-vous ?",
      type: "multipleChoice",
    });
    
    await deleteQuestion(2);

    await addAnswer({
      answerId: 1,
      title: "Produit A",
    });
    console.log("Nouvelle réponse ajoutée avec succée");

    const answers = await getAnswers();
    console.log("Réponses:", answers);

    const answer = await getAnswerById(1);
    if (answer) {
      console.log("Réponse obtenue:", answer);
    }

    const answerUpdated = await updateAnswer(33, {
      title: "Produit AB",
    });
    if (answerUpdated) {
      console.log("Réponse mise à jour");
    }

    await deleteAnswer(14);
    await addSurvey({
      name: "Sondage sur les préférences de produits",
      questions: [],
      createdBy: "admin",
    });
    console.log("Nouveau sondage ajouté avec succée");

    const surveys = await getSurveys();
    console.log("Sondages:", surveys);

    const survey = await getSurveyByName(
      "Sondage sur les préférences de produits"
    );
    if (survey) {
      console.log("Sondage obtenu:", survey);
    }

    const surveyUpdated = await updateSurvey(survey.surveyId, {
      name: "Sondage sur les préférences de produits (mis à jour)",
    });
    if (surveyUpdated) {
      console.log("Sondage mis à jour");
    }

    await deleteSurvey(survey.surveyId);
  } catch (error) {
    console.error("Erreur lors de l'exécution:", error);
  }
}

main();
