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
    const surveys = await db.collection("surveys").find().toArray();
    console.log("Sondages:", surveys);
  } finally {
    await closeDB();
  }
}

async function getSurveyById(id) {
  const { db } = await connectToDB();
  try {
    const survey = await db.collection("surveys").findOne({ surveyId: id });
    if (survey) {
      console.log("Sondage obtenu:", survey);
    } else {
      console.log(`Sondage avec l'Id "${id}" non trouvé.`);
    }
  } finally {
    await closeDB();
  }
}

async function addSurvey(survey) {
  const { db } = await connectToDB();
  try {
    if (
      !survey.name ||
      !survey.description ||
      !survey.createdAt ||
      !survey.createdBy
    ) {
      console.log(
        "Erreur: Les propriétés name, description, createdAt, et createdBy sont obligatoires."
      );
      return;
    }
    survey.surveyId = await getNextId("surveys", db);
    const result = await db.collection("surveys").insertOne(survey);
    console.log("Nouveau sondage ajouté avec succès");
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
      console.log(`ID ${id} non trouvé. Erreur de mise à jour.`);
      return;
    }

    const result = await db
      .collection("surveys")
      .updateOne({ surveyId: id }, { $set: updatedSurvey });

    console.log(`Sondage avec l'ID ${id} mis à jour avec succès.`);
  } catch (error) {
    console.error(
      `Erreur lors de la mise à jour du sondage avec l'ID ${id}: ${error.message}`
    );
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
      console.log("ID non trouvé. Erreur de suppression.");
      return;
    }

    const result = await db.collection("surveys").deleteOne({ surveyId: id });
    if (result.deletedCount === 0) {
      console.log("Erreur de suppression: Aucune suppression effectuée.");
    } else {
      console.log("Sondage supprimé avec succès");
    }
  } finally {
    await closeDB();
  }
}

module.exports = {
  getSurveys,
  getSurveyById,
  addSurvey,
  updateSurvey,
  deleteSurvey,
};
