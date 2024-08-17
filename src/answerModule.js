const { connectToDB, closeDB } = require("./config/database");

async function getNextId(collectionName, db) {
  const latestItem = await db
    .collection(collectionName)
    .find()
    .sort({ answerId: -1 })
    .limit(1)
    .toArray();

  return latestItem.length > 0 ? latestItem[0].answerId + 1 : 1;
}

async function getAnswers() {
  const { db } = await connectToDB();
  try {
    const answers = await db.collection("answers").find().toArray();
    console.log("Réponses:", answers);
    return answers;
  } finally {
    await closeDB();
  }
}

async function getAnswerById(id) {
  const { db } = await connectToDB();
  try {
    const answer = await db.collection("answers").findOne({ answerId: id });
    if (answer) {
      console.log("Réponse obtenue:", answer);
    } else {
      console.log(`Réponse avec l'ID "${id}" non trouvée.`);
    }
    return answer;
  } finally {
    await closeDB();
  }
}

async function addAnswer(answer) {
  const { db } = await connectToDB();
  try {
    if (
      !answer.questionId ||
      !answer.text ||
      !answer.creationDate ||
      !answer.createdBy
    ) {
      console.log(
        "Erreur: Les propriétés questionId, text, creationDate, et createdBy sont obligatoires."
      );
      return;
    }
    answer.answerId = await getNextId("answers", db);
    const result = await db.collection("answers").insertOne(answer);
    console.log("Nouvelle réponse ajoutée avec succès");
    return result.insertedId;
  } finally {
    await closeDB();
  }
}

async function updateAnswer(id, updatedAnswer) {
  const { db } = await connectToDB();
  try {
    const existingAnswer = await db
      .collection("answers")
      .findOne({ answerId: id });
    if (!existingAnswer) {
      console.log("ID non trouvé. Erreur de mise à jour.");
      return;
    }

    const result = await db
      .collection("answers")
      .updateOne({ answerId: id }, { $set: updatedAnswer });
    if (result.modifiedCount === 0) {
      console.log(
        "Erreur de mise à jour: Aucune modification n'a été effectuée."
      );
    } else {
      console.log("Réponse mise à jour avec succès");
    }
  } finally {
    await closeDB();
  }
}

async function deleteAnswer(id) {
  const { db } = await connectToDB();
  try {
    const existingAnswer = await db
      .collection("answers")
      .findOne({ answerId: id });
    if (!existingAnswer) {
      console.log("ID non trouvé. Erreur de suppression.");
      return;
    }

    const result = await db.collection("answers").deleteOne({ answerId: id });
    if (result.deletedCount === 0) {
      console.log("Erreur de suppression: Aucune suppression effectuée.");
    } else {
      console.log("Réponse supprimée avec succès");
    }
  } finally {
    await closeDB();
  }
}

module.exports = {
  getAnswers,
  getAnswerById,
  addAnswer,
  updateAnswer,
  deleteAnswer,
};
