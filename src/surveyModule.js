const { connectToDB, closeDB } = require("./config/database");

async function getNextId(collectionName, db) {
  const latestItem = await db
    .collection(collectionName)
    .find()
    .sort({ surveyId: -1 })
    .limit(1)
    .toArray();

  return latestItem.length > 0 ? latestItem[0].surveyId + 1 : 1;
}

async function getSurveys() {
  const { db } = await connectToDB();
  try {
    return await db.collection("surveys").find().toArray();
  } finally {
    await closeDB();
  }
}

async function getSurveyByName(name) {
  const { db } = await connectToDB();
  try {
    return await db.collection("surveys").findOne({ name });
  } finally {
    await closeDB();
  }
}

async function addSurvey(survey) {
  const { db } = await connectToDB();
  try {
    survey.surveyId = await getNextId("surveys", db);
    const result = await db.collection("surveys").insertOne(survey);
    return result.insertedId;
  } finally {
    await closeDB();
  }
}

async function updateSurvey(id, updatedSurvey) {
  const { db } = await connectToDB();
  try {
    const existingSurvey = await db
      .collection("surveys")
      .findOne({ surveyId: id });
    if (!existingSurvey) {
      console.log("Sondage non trouvé.");
      return false;
    }
    const result = await db
      .collection("surveys")
      .updateOne({ surveyId: id }, { $set: updatedSurvey });
    if (result.modifiedCount === 0) {
      console.log("Echec de la mis à jour du sondage.");
      return false;
    }
    return true;
  } finally {
    await closeDB();
  }
}

async function deleteSurvey(id) {
  const { db } = await connectToDB();
  try {
    const existingSurvey = await db
      .collection("surveys")
      .findOne({ surveyId: id });
    if (!existingSurvey) {
      console.log("Sondage non trouvé.");
    } else {
      const result = await db.collection("surveys").deleteOne({ surveyId: id });
      console.log("Sondage supprimé avec succès");
      return result.deletedCount > 0;
    }
  } finally {
    await closeDB();
  }
}

module.exports = {
  getSurveys,
  getSurveyByName,
  addSurvey,
  updateSurvey,
  deleteSurvey,
};
