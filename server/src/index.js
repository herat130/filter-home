const logger = require('winston');
const app = require('./app');
const port = process.env['PORT'] || app.get('port');
const server = app.listen(port);

// const conf = require('../config/default');
const mongoClient = require('mongodb').MongoClient;

const profiles = require('../config/data/profiles');
const users = require('../config/data/users');
const apartments = require('../config/data/apartments');
const locations = require('../config/data/locations');
const countries = require('../config/data/countries');

mongoClient
  .connect("mongodb://localhost:27017/assignment")
  .then(db => {
    console.log('start insert');
    return db.dropDatabase()
      .then(() => {
        return db.collection('profiles').insertMany(profiles);
      })
      .then(() => {
        return db.collection('users').insertMany(users);
      })
      .then(() => {
        return db.collection('apartments').insertMany(apartments);
      })
      .then(() => {
        return db.collection('locations').insertMany(locations);
      })
      .then(() => {
        return db.collection('countries').insertMany(countries);
      })
      .then(() => {
        return db.close();
      });
  })
  .catch(err => {
    console.log(err);
  });



process.on('unhandledRejection',  (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info(`Feathers application started on ${app.get('host')}:${port}`)
);
