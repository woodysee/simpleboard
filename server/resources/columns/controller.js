const meta = {};
meta.resource = {};
meta.resource.singular = `column`;
meta.resource.plural = `columns`;
meta.resource.controller = `columnsController`;
meta.prefix = `->->`;

console.info(`${meta.prefix} Initialising RESTful resources...`);
const firebaseAdmin = require("../../db/firebase")("for ColumnsController.");

// console.log('As a Google Firebase admin, the app has access to read and write all data, regardless of Google\'s Security Rules. For more, refer to https://firebase.google.com/docs/firestore/quickstart?authuser=0.');
const db = firebaseAdmin.firestore();
const FirestoreFieldPath = firebaseAdmin.firestore.FieldPath; // https://firebase.google.com/docs/reference/js/firebase.firestore.FieldPath

const uuidv4 = require("uuid/v4");

exports.create = {};
exports.read = {};
exports.update = {};
exports.delete = {};

exports.create.one = (req, res, next) => {
  // console.info(`${meta.resource.controller}.create.one(): Create a ${meta.resource.singular}. Invoked...`);
  // console.log(req.body);
  const id = uuidv4();
  const newColumn = {
    data: {
      type: meta.resource.plural,
      id: id,
      attributes: {
        title: req.body.title,
        description: req.body.description
      }
    }
  };
  db.collection('columns').doc(id).set(newColumn);
  res.status(201).send(newColumn);
};

exports.read.one = (req, res, next) => {
  // console.info(`${meta.resource.controller}.read.one(): Show ${meta.resource.singular} details. Invoked...`);
  const id = req.query.id;
  const docRef = db.collection('columns').doc(id);
  docRef.get().then(doc => {
    if (!doc.exists) {
      res.status(404).send({
        errors: [
          {
            title: 'Column not found',
            detail: 'Unable to find column',
            meta: {
              params: req.query
            }
          }
        ]
      });
    } else {
      const queriedColumn = doc.data();
      res.status(200).send(queriedColumn);
    }
  }).catch(err => {
    res.status(500).send({
      errors: [
        {
          title: 'Invalid query',
          detail: 'Unable to access database',
          meta: err
        }
      ]
    });
  });
};

exports.read.all = (req, res) => {
  // console.info(`${meta.resource.controller}.read.all(): Show all ${meta.resource.plural} and their details. Invoked...`);
  let docRef = db.collection('columns');
  if (req.query.orderBy) {
    let dir = req.query.order ? req.query.order : 'desc';
    let param = req.query.orderBy !== 'id' ? new FirestoreFieldPath('data', 'attributes', req.query.orderBy) : new FirestoreFieldPath('data', 'id');
    docRef = docRef.orderBy(param, dir);
    // See https://firebase.google.com/docs/database/rest/retrieve-data#filtering-by-a-specified-child-key for more info on querying nested keys
  }
  if (req.query.limit) {
    let limit = parseInt(req.query.limit);
    docRef = docRef.limit(limit);
  }
  docRef.get().then(snapshot => {
    let allColumns = [];
    snapshot.forEach(doc => {
      allColumns.push(doc.data());
    });
    res.status(200).send(allColumns);
  }).catch(err => {
    res.status(500).send({
      errors: [{
        title: 'Invalid query',
        detail: 'Unable to query database',
        meta: err
      }]
    });
  });
};

exports.update.one = (req, res, next) => {
  // console.info(`${meta.resource.controller}.update.one(): Update details of a ${meta.resource.singular}. Invoked...`);
  const id = req.query.id;
  const docRef = db.collection('columns').doc(id);
  docRef.get().then(doc => {
    if (!doc.exists) {
      res.status(404).send({
        errors: [{
          title: 'Column not found',
          detail: 'Unable to find column',
          meta: {
            params: req.query
          }
        }]
      });
    } else {
      const queriedColumn = doc.data();
      res.status(200).send(queriedColumn);
    }
  }).catch(err => {
    res.status(500).send({
      errors: [{
        title: 'Invalid query',
        detail: 'Unable to access database',
        meta: err
      }]
    });
  });
};

exports.delete.one = (req, res, next) => {
  // console.info(`${meta.resource.controller}.delete.one(): Destroy ${meta.resource.singular}. Invoked...`);
};

console.info(`${meta.prefix} ...initialised RESTful resources of ${meta.resource.plural}.`);