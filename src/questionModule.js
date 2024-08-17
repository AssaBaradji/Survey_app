const { connectToDB, closeDB } = require("./config/database");

async function getNextId(collectionName, db) {
  const latestItem = await db
    .collection(collectionName)
    .find()
    .sort({ questionId: -1 })
    .limit(1)
    .toArray();

  return latestItem.length > 0 ? latestItem[0].questionId + 1 : 1;
}

async function getQuestions() {
  const { db } = await connectToDB();
  try {
    const questions = await db.collection("questions").find().toArray();
    console.log("Questions:", questions);
    return questions;
  } finally {
    await closeDB();
  }
}

async function getQuestionById(id) {
  const { db } = await connectToDB();
  try {
    const question = await db
      .collection("questions")
      .findOne({ questionId: id });
    if (question) {
      console.log("Question obtenue:", question);
    } else {
      console.log(`Question avec l'ID "${id}" non trouvée.`);
    }
    return question;
  } finally {
    await closeDB();
  }
}

async function addQuestion(question) {
  const { db } = await connectToDB();
  try {
    if (
      !question.surveyId ||
      !question.text ||
      !question.creationDate ||
      !question.createdBy
    ) {
      console.log(
        "Erreur: Les propriétés surveyId, text, creationDate, et createdBy sont obligatoires."
      );
      return;
    }
    question.questionId = await getNextId("questions", db);
    const result = await db.collection("questions").insertOne(question);
    console.log("Nouvelle question ajoutée avec succès");
    return result.insertedId;
  } finally {
    await closeDB();
  }
}

async function updateQuestion(id, updatedQuestion) {
  const { db } = await connectToDB();
  try {
    const existingQuestion = await db
      .collection("questions")
      .findOne({ questionId: id });
    if (!existingQuestion) {
      console.log("ID non trouvé. Erreur de mise à jour.");
      return;
    }

    const result = await db
      .collection("questions")
      .updateOne({ questionId: id }, { $set: updatedQuestion });
    if (result.modifiedCount === 0) {
      console.log(
        "Erreur de mise à jour: Aucune modification n'a été effectuée."
      );
    } else {
      console.log("Question mise à jour avec succès");
    }
  } finally {
    await closeDB();
  }
}

async function deleteQuestion(id) {
  const { db } = await connectToDB();
  try {
    const existingQuestion = await db
      .collection("questions")
      .findOne({ questionId: id });
    if (!existingQuestion) {
      console.log("ID non trouvé. Erreur de suppression.");
      return;
    }

    const result = await db
      .collection("questions")
      .deleteOne({ questionId: id });
    if (result.deletedCount === 0) {
      console.log("Erreur de suppression: Aucune suppression effectuée.");
    } else {
      console.log("Question supprimée avec succès");
    }
  } finally {
    await closeDB();
  }
}

module.exports = {
  getQuestions,
  getQuestionById,
  addQuestion,
  updateQuestion,
  deleteQuestion,
};
