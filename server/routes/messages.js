var express = require('express');
var router = express.Router();

// Sample data (replace with database logic as needed)
let messages = [];

// GET all messages
router.get('/', (req, res) => {
  res.status(200).json(messages);
});

// GET a message by ID, subject, or sender
router.get('/', (req, res) => {
  const { id, subject, sender } = req.query;  // Get query parameters

  // Filter messages based on query parameters
  const foundMessages = messages.filter((msg) => {
    return (
      (id && msg.id === id) ||
      (subject && msg.subject.includes(subject)) ||
      (sender && msg.sender.includes(sender))
    );
  });

  if (foundMessages.length > 0) {
    res.status(200).json(foundMessages);
  } else {
    res.status(404).json({ message: 'No messages found with the given criteria' });
  }
});


// POST (create a new message)
router.post('/', (req, res) => {
  const { id, subject, msgText, sender } = req.body;

  // Validate input data
  if (!id || !subject || !msgText || !sender) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check for duplicate ID
  if (messages.some((msg) => msg.id === id)) {
    return res.status(409).json({ message: 'Message with this ID already exists.' });
  }

  // Create and add new Message instance
  const newMessage = new Message(id, subject, msgText, sender);
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

// PUT (update/replace an existing Message)
router.put('/:id', (req, res) => {
  const index = messages.findIndex((msg) => msg.id === req.params.id);

  if (index !== -1) {
    const { id, subject, msgText, sender } = req.body;

    // Validate input data
    if (!id || !subject || !msgText || !sender) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Replace with new Message instance
    const updatedMessage = new Message(id, subject, msgText, sender);
    messages[index] = updatedMessage;
    res.status(200).json(updatedMessage);
  } else {
    res.status(404).json({ message: 'Message not found.' });
  }
});

// PATCH (modify an existing message)
router.patch('/:id', (req, res) => {
  const message = messages.find((msg) => msg.id == req.params.id);
  if (message) {
    Object.assign(message, req.body);
    res.status(200).json(message);
  } else {
    res.status(404).json({ message: 'Message not found' });
  }
});

// DELETE (remove a message)
router.delete('/:id', (req, res) => {
  const index = messages.findIndex((msg) => msg.id == req.params.id);
  if (index !== -1) {
    messages.splice(index, 1);
    res.status(200).json({ message: 'Message deleted' });
  } else {
    res.status(404).json({ message: 'Message not found' });
  }
});

module.exports = router;

