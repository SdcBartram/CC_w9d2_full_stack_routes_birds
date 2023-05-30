const express = require('express');
const ObjectId = require('mongodb').ObjectId;

const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (request, response) => {
    collection
      .find()
      .toArray()
      .then((docs) => response.json(docs))
      .catch((err) => {
        console.error(err);
        response.status(500);
        response.json({ status: 500, error: err });
      });
  });

  //Version 5 of mongodb, the ObjectId constructor needs to be called with the 'new' keyword!!!
  router.get('/:id', (request, response) => {
    const id = request.params.id;
    collection
      .findOne({ _id: new ObjectId(id) })
      .then((doc) => response.json(doc))
      .catch((err) => {
        console.error(err);
        response.status(500);
        response.json({ status: 500, error: err });
      });
  });

  router.post('/', (request, response) => {
    const newSighting = request.body
    collection.insertOne(newSighting)
    .then((result) => {
      const myObjectId = result.insertedId
      collection
      .findOne({ _id: myObjectId })
      .then((doc) => response.json(doc))
    })
    .catch((err) => {
      console.error(err);
      response.status(500);
      response.json({ status: 500, error: err });
    });
  })

  //Version 5 of mongodb, the ObjectId constructor needs to be called with the 'new' keyword!!!
  router.delete('/:id', (request, response) => {
    const id = request.params.id
    collection.deleteOne({ _id: new ObjectId(id) })
    .then(result => response.json(result))
    .catch((err) => {
      console.err(err)
      response.status(500)
      response.json({ status: 500, error: err })
    })
  })

  return router;
};

module.exports = createRouter;
