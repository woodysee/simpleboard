const meta = {};
meta.resource = {};
meta.resource.singular = `task`;
meta.resource.plural = `tasks`;
meta.resource.controller = `tasksController`;
meta.prefix = `->->`;

console.info(`${meta.prefix} Initialising RESTful resources...`);
const firebaseAdmin = require("../../db/firebase")("for TasksController.");

// console.log('As a Google Firebase admin, the app has access to read and write all data, regardless of Google\'s Security Rules. For more, refer to https://firebase.google.com/docs/firestore/quickstart?authuser=0.');
const db = firebaseAdmin.firestore();
const FirestoreFieldPath = firebaseAdmin.firestore.FieldPath; // https://firebase.google.com/docs/reference/js/firebase.firestore.FieldPath

const uuidv4 = require("uuid/v4");

exports.create = {};
exports.read = {};
exports.update = {};
exports.delete = {};

exports.create.one = (req, res) => {
  // console.info(`${meta.resource.controller}.create.one(): Create a ${meta.resource.singular}. Invoked...`);
  // console.log(req.body);
  const id = uuidv4();
  const newTask = {
    data: {
      type: meta.resource.plural,
      id: id,
      attributes: {
        order: 0,
        title: req.body.title,
        description: req.body.description,
        done: false
      }
    }
  };
  db.collection('tasks').doc(id).set(newTask);
  res.status(201).send(newTask);
};

exports.read.one = (req, res) => {
  // console.info(`${meta.resource.controller}.read.one(): Show ${meta.resource.singular} details. Invoked...`);
  const id = req.params.id;
  const docRef = db.collection('tasks').doc(id);
  docRef.get().then(doc => {
    if (!doc.exists) {
      res.status(404).send({
        errors: [
          {
            title: 'Task not found',
            detail: 'Unable to find task',
            meta: {
              params: req.params
            }
          }
        ]
      });
    } else {
      const queriedTask = doc.data();
      res.status(200).send(queriedTask);
    }
  }).catch(err => {
    res.status(500).send({
      errors: [
        {
          title: 'Invalid ID',
          detail: 'Unable to access database',
          meta: err
        }
      ]
    });
  });
};

exports.read.all = (req, res) => {
  // console.info(`${meta.resource.controller}.read.all(): Show all ${meta.resource.plural} and their details. Invoked...`);
  let docRef = db.collection('tasks');
  if (req.query.orderBy) {
    let dir = req.query.dir ? req.query.dir : 'desc';
    let param = req.query.orderBy !== 'id' ? new FirestoreFieldPath('data', 'attributes', req.query.orderBy) : new FirestoreFieldPath('data', 'id');
    docRef = docRef.orderBy(param, dir);
    // See https://firebase.google.com/docs/database/rest/retrieve-data#filtering-by-a-specified-child-key for more info on querying nested keys
  }
  if (req.query.limit) {
    let limit = parseInt(req.query.limit);
    docRef = docRef.limit(limit);
  }
  docRef.get().then(snapshot => {
    let allTasks = [];
    snapshot.forEach(doc => {
      allTasks.push(doc.data());
    });
    res.status(200).send(allTasks);
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

exports.update.one = (req, res) => {
  // console.info(`${meta.resource.controller}.update.one(): Update details of a ${meta.resource.singular}. Invoked...`);
  const id = req.params.id;
  const docRef = db.collection('tasks').doc(id);
  docRef.get().then(doc => {
    if (!doc.exists) {
      res.status(404).send({
        errors: [{
          title: 'Task not found',
          detail: 'Unable to find task',
          meta: {
            params: req.params
          }
        }]
      });
    } else {
      const updatedKeys = Object.keys(req.body);
      let toBeUpdated = {};
      updatedKeys.forEach((key) => {
        toBeUpdated[`data.attributes.${key}`] = req.body[key];
      });
      docRef.update(toBeUpdated).then(() => {
        docRef.get().then(updatedDoc => {
          res.status(200).send(updatedDoc.data());
        });
      }).catch(err => {
        res.status(400).send({
          errors: [{
            title: 'Update failed',
            detail: 'Unable to update task',
            meta: {
              error: err,
              body: req.body
            }
          }]
        });
      });
    }
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

exports.delete.one = (req, res, next) => {
  // console.info(`${meta.resource.controller}.delete.one(): Destroy ${meta.resource.singular}. Invoked...`);
  const id = req.params.id;
  const docRef = db.collection('tasks').doc(id);
  docRef.get().then(doc => {
    if (!doc.exists) {
      res.status(404).send({
        errors: [{
          title: 'Task not found',
          detail: 'Unable to find task',
          meta: {
            params: req.params
          }
        }]
      });
    } else {
      docRef.delete().then(() => {
        res.status(202).send();
      });
    }
  }).catch(err => {
    res.status(500).send({
      errors: [{
        title: 'Invalid ID',
        detail: 'Unable to access database',
        meta: err
      }]
    });
  });
};

console.info(`${meta.prefix} ...initialised RESTful resources of ${meta.resource.plural}.`);