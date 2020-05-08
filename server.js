const express                  = require('express');
const app                      = express();
const bodyParser               = require('body-parser');
const SURVEY                   = require("./survey.json");
const cookieParser             = require('cookie-parser');
const uniqid                   = require('uniqid');
const SurveyStore              = require('./SurveyStore');
const surveyStore              = new SurveyStore();

const SURVEY_KEY               = 'SURVEY_ID';

app.use(cookieParser());
app.use(bodyParser());
app.use(express.static('noctem-app/dist/noctem'))

app.get("/api/questions", (req, res) => {
  res.json(SURVEY)
})

app.get("/api/surveys", (req, res) => {
  surveyStore.getSurveys().toArray((err, surveys) => {
    if (err) {
      res.status(400).json({error: err});
    } else {
      res.json(surveys);
    }
  })
})

app.delete("/api/surveys/:uuid", (req, res) => {
  surveyStore.deleteSurvey(req.params.uuid).then((err,data) => {
    res.json({success: !err})
  })
})

app.post("/api/surveys", (req, res) => {
  let surveyId = uniqid();
  surveyStore.createSurvey(surveyId).then((err, result) => {
    res.cookie(SURVEY_KEY, surveyId).json(result);
  })
})

app.get("/api/surveys/current", (req, res) => {
  let surveyId = req.cookies[SURVEY_KEY];
  if (surveyId) {
    surveyStore.findSurvey(surveyId).toArray((err, surveys) => {
      if (surveys && surveys.length > 0) {
        res.json({ survey: surveys[0] })
      } else {
        res.json({ survey: null })
      }
    })
  } else {
    res.json({ survey: null })
  }
})

app.get("/api/surveys/:uuid", (req, res) => {
  surveyStore.findSurvey(req.params.uuid).toArray((err, surveys) => {
      if (surveys && surveys.length > 0) {
        res.json({ survey: surveys[0] })
      } else {
        res.json({ survey: null })
      }
  })
})

app.put("/api/surveys/:uuid", (req, res) => {
  surveyStore.updateSurvey(req.params.uuid, req.body).then((err, result) => {
    res.json(result)
  })
})

app.post("/api/surveys/current", (req, res) => {
  let surveyId = req.cookies[SURVEY_KEY];
  if (surveyId) {
    surveyStore.updateSurvey(surveyId, req.body).then((err, result) => {
      res.json(result)
    })
  } else {
    let surveyId = uniqid();
    surveyStore.createSurvey(surveyId, req.body).then((err, result) => {
      res.cookie(SURVEY_KEY, surveyId).json(result)
    })
  }
})

app.post("/api/surveys/current/complete", (req, res) => {
  let surveyId = req.cookies[SURVEY_KEY];
  if (surveyId) {
    surveyStore.markSurveyComplete(surveyId).then((err, result) => {
      res.clearCookie(SURVEY_KEY).json(result)
    })
  } else {
    res.status(400).json({success: false});
  }
})

app.use('*', express.static('noctem-app/dist/noctem'));

// Wait for mongo to start up
setTimeout(() => {
  surveyStore.connect()
             .then(() => {
               app.listen(4000, '0.0.0.0', () => console.log('Server running...'))
             })
             .catch(err => console.log(`Failed to start server: ${err}`));
}, 12000)