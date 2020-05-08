const MongoClient              = require('mongodb').MongoClient;

const SURVEYS_COLLECTION_KEY   = 'SURVEYS_COLLECTION_KEY';
const MONGO_HOST                = process.env.MONGO_HOST || 'localhost';
const MONGO_URL                = `mongodb://${MONGO_HOST}:27017`;
const MONGO_DB_NAME            = 'surveys_store';

class Datastore {

  connect() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(MONGO_URL, (err, client) => {

        if (err) {
          return reject(err);
        } else {
          this.client = client;
          return resolve(client);
        }
      })
    })
  }

  collection() {
    return this.client.db(MONGO_DB_NAME).collection(SURVEYS_COLLECTION_KEY);
  }

  getSurveys() {
    return this.collection().find({});
  }

  createSurvey(uuid, answers={}) {
    return this.collection().insertOne({ 
      uuid,
      createdAt: new Date(),
      answers: answers,
      complete: false
    })
  }

  deleteSurvey(uuid) {
    return new Promise((resolve, reject) => {
      this.collection().deleteOne({ uuid }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    })
  }

  markSurveyComplete(uuid) {
    return this.collection().updateOne({ uuid }, { $set: {
        complete: true,
        updatedAt: new Date()
    }})
  }

  updateSurvey(uuid, answers) {
    return this.collection().updateOne({ uuid }, { $set: {
        answers: answers,
        updatedAt: new Date()
    }})
  }

  findSurvey(uuid) {
    return this.collection().find({ uuid });
  }
}

module.exports = Datastore;