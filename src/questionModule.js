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
    return await db.collection("questions").find().toArray();
  } finally {
    await closeDB();
  }
}

async function getQuestionById(id) {
  const { db } = await connectToDB();
  try {
    if (!id) {
      return await db.collection("questions").findOne({ questionId: id });
    } else {
      console.log("id n'existe pas");
    }
  } finally {
    await closeDB();
  }
}

async function addQuestion(question) {
  const { db } = await connectToDB();
  try {
    question.questionId = await getNextId("questions", db);
    const result = await db.collection("questions").insertOne(question);
    console.log("'Nouvelle question ajoutée avec succées'");
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
      console.log("Question non trouvé.");
      return false;
    }

    const result = await db
      .collection("questions")
      .updateOne({ questionId: id }, { $set: updatedQuestion });
    if (result.modifiedCount === 0) {
      console.log("Echec de la mis à jour de la question.");
      return false;
    }
    return true;
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
      console.log("Question non trouvé.");
    } else {
      const result = await db
        .collection("questions")
        .deleteOne({ questionId: id });
      console.log("Question supprimée avec succès");
      return result.deletedCount > 0;
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
