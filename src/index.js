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

const surveyData = {
  name: "Satisfaction client",
  description: "Évaluez notre service",
  creationDate: new Date().toISOString(),
  createdBy: "Admin",
};

const questionData = {
  surveyId: 1,
  text: "Comment évaluez-vous notre service ?",
  creationDate: new Date().toISOString(),
  createdBy: "Admin",
};

const answerData = {
  questionId: 1,
  text: "Très satisfait",
  creationDate: new Date().toISOString(),
  createdBy: "Admin",
};

async function main() {
  try {
    await addSurvey(surveyData);

    await getSurveys();

    await getSurveyByName("Satisfaction client");

    await updateSurvey(1, {
      name: "Satisfaction client - mise à jour",
      description: "Mise à jour de l'évaluation",
    });

    await deleteSurvey(1);

    await addQuestion(questionData);

    await getQuestions();

    await getQuestionById(1);

    await updateQuestion(1, {
      text: "Comment évaluez-vous notre service ? (Mise à jour)",
    });

    await deleteQuestion(1);

    await addAnswer(answerData);

    await getAnswers();

    await getAnswerById(1);

    await updateAnswer(7, {
      text: "Satisfait (Mise à jour)",
    });

    await deleteAnswer(10);
  } catch (error) {
    console.error("Erreur :", error.message);
  }
}

main();
