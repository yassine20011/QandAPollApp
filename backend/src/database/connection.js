const mysql = require('mysql2');
require('dotenv').config()
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const SessionModel = require('../models/session');
// const QuestionModel = require('../models/question');
// const AnswerModel = require('../models/answer');

const Session = SessionModel(sequelize, Sequelize);
// const Question = QuestionModel(sequelize, Sequelize);
// const Answer = AnswerModel(sequelize, Sequelize);

// Define associations if needed

module.exports = {
  Session,
  // Question,
  // Answer
};