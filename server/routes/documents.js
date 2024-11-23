var express = require('express');
var router = express.Router();

// Sample data (replace with database logic as needed)
let documents = [];

// GET all documents
router.get('/', (req, res) => {
  res.status(200).json(documents);
});

// GET a single document by ID
router.get('/:id', (req, res) => {
  const document = documents.find((doc) => doc.id == req.params.id);
  if (document) {
    res.status(200).json(document);
  } else {
    res.status(404).json({ message: 'Document not found' });
  }
});

// POST (create a new document)
router.post('/', (req, res) => {
  const newDocument = req.body;
  if (documents.some((doc) => doc.id === newDocument.id)) {
    res.status(409).json({ message: 'Document already exists' });
  } else {
    documents.push(newDocument);
    res.status(201).json(newDocument);
  }
});

// PUT (update/replace an existing document)
router.put('/:id', (req, res) => {
  const index = documents.findIndex((doc) => doc.id == req.params.id);
  if (index !== -1) {
    documents[index] = req.body;
    res.status(200).json(documents[index]);
  } else {
    res.status(404).json({ message: 'Document not found' });
  }
});

// PATCH (modify an existing document)
router.patch('/:id', (req, res) => {
  const document = documents.find((doc) => doc.id == req.params.id);
  if (document) {
    Object.assign(document, req.body);
    res.status(200).json(document);
  } else {
    res.status(404).json({ message: 'Document not found' });
  }
});

// DELETE (remove a document)
router.delete('/:id', (req, res) => {
  const index = documents.findIndex((doc) => doc.id == req.params.id);
  if (index !== -1) {
    documents.splice(index, 1);
    res.status(200).json({ message: 'Document deleted' });
  } else {
    res.status(404).json({ message: 'Document not found' });
  }
});

module.exports = router;
