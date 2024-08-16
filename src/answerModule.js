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
    return await db.collection("answers").find().toArray();
  } finally {
    await closeDB();
  }
}

async function getAnswerById(id) {
  const { db } = await connectToDB();
  try {
    return await db.collection("answers").findOne({ answerId: id });
  } finally {
    await closeDB();
  }
}

async function addAnswer(answer) {
  const { db } = await connectToDB();
  try {
    answer.answerId = await getNextId("answers", db);
    const result = await db.collection("answers").insertOne(answer);
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
      console.log("Reponse non trouvé.");
      return false;
    }

    const result = await db
      .collection("answers")
      .updateOne({ answerId: id }, { $set: updatedAnswer });
    if (result.modifiedCount === 0) {
      console.log("Echec de la mise à jour de la reponse.");
      return false;
    }
    return true;
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
      console.log("Reponse non trouvé.");
    } else {
      const result = await db.collection("answers").deleteOne({ answerId: id });
      console.log("");
      return result.deletedCount > 0;
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
