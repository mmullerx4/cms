var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');

// GET all documents
router.get('/', (req, res) => {
  Document.find()
    .then((documents) => {
      res.status(200).json(documents); // Respond with the list of documents
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error fetching documents', error }); // Handle errors
    });
});

// GET a single document by ID
router.get('/:id', (req, res) => {
  Document.findOne({ id: req.params.id })
    .then((document) => {
      if (document) {
        res.status(200).json(document);
      } else {
        res.status(404).json({ message: 'Document not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error fetching document', error });
    });
});

// POST (create a new document)
router.post('/', (req, res, next) => {
  const maxDocumentId = sequenceGenerator.nextId('documents');

  const document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
  });

  document
    .save()
    .then((createdDocument) => {
      res.status(201).json({
        message: 'Document added successfully',
        document: createdDocument,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error occurred',
        error: error,
      });
    });
});

// PUT (update an existing document)
router.put('/:id', (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then((document) => {
      if (document) {
        document.name = req.body.name;
        document.description = req.body.description;
        document.url = req.body.url;

        return Document.updateOne({ id: req.params.id }, document);
      } else {
        return Promise.reject({
          message: 'Document not found.',
        });
      }
    })
    .then(() => {
      res.status(204).json({
        message: 'Document updated successfully',
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || 'An error occurred',
        error: error,
      });
    });
});

// DELETE (remove a document)
router.delete('/:id', (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then((document) => {
      if (document) {
        return Document.deleteOne({ id: req.params.id });
      } else {
        return Promise.reject({
          message: 'Document not found.',
        });
      }
    })
    .then(() => {
      res.status(204).json({
        message: 'Document deleted successfully',
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || 'An error occurred',
        error: error,
      });
    });
});

module.exports = router;
