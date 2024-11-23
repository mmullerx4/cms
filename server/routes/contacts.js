var express = require('express');
var router = express.Router();

// Sample data (replace with database logic as needed)
let messages = [];

// GET all messages
router.get('/', (req, res) => {
  res.status(200).json(messages);
});

// GET a single message by ID
router.get('/:id', (req, res) => {
  const message = messages.find((doc) => doc.id == req.params.id);
  if (message) {
    res.status(200).json(message);
  } else {
    res.status(404).json({ message: 'Message not found' });
  }
});

// POST (create a new message)
router.post('/', (req, res) => {
  const newMessage = req.body;
  if (messages.some((doc) => doc.id === newMessage.id)) {
    res.status(409).json({ message: 'Message already exists' });
  } else {
    messages.push(newMessage);
    res.status(201).json(newMessage);
  }
});

// PUT (update/replace an existing message)
router.put('/:id', (req, res) => {
  const index = messages.findIndex((doc) => doc.id == req.params.id);
  if (index !== -1) {
    messages[index] = req.body;
    res.status(200).json(messages[index]);
  } else {
    res.status(404).json({ message: 'Message not found' });
  }
});

// PATCH (modify an existing message)
router.patch('/:id', (req, res) => {
  const message = messages.find((doc) => doc.id == req.params.id);
  if (message) {
    Object.assign(message, req.body);
    res.status(200).json(message);
  } else {
    res.status(404).json({ message: 'Message not found' });
  }
});

// DELETE (remove a message)
router.delete('/:id', (req, res) => {
  const index = messages.findIndex((doc) => doc.id == req.params.id);
  if (index !== -1) {
    messages.splice(index, 1);
    res.status(200).json({ message: 'Message deleted' });
  } else {
    res.status(404).json({ message: 'Message not found' });
  }
});

module.exports = router;
