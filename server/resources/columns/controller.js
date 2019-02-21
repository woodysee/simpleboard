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
  res.send(201, newColumn);
};

exports.read.one = (req, res, next) => {
  // console.info(`${meta.resource.controller}.read.one(): Show ${meta.resource.singular} details. Invoked...`);
  const id = req.params.id;
  const docRef = db.collection('columns').doc(id);
  const getDoc = docRef.get().then(doc => {
    if (!doc.exists) {
      res.send(404, {
        errors: [
          {
            title: 'Column not found',
            detail: 'Unable to find column',
            meta: {
              params: req.params
            }
          }
        ]
      });
    } else {
      const queriedColumn = doc.data();
      res.send(200, queriedColumn);
    }
  }).catch(err => {
    res.send(500, {
      errors: [
        {
          title: 'Invalid query',
          detail: 'Unable to query database',
          meta: err
        }
      ]
    });
  });
};

exports.update.one = (req, res, next) => {
  // console.info(`${meta.resource.controller}.update.one(): Update details of a ${meta.resource.singular}. Invoked...`);
  const id = req.params.id;
  const docRef = db.collection('columns').doc(id);
};

exports.delete.one = (req, res, next) => {
  // console.info(`${meta.resource.controller}.delete.one(): Destroy ${meta.resource.singular}. Invoked...`);
};

console.info(`${meta.prefix} ...initialised RESTful resources of ${meta.resource.plural}.`);