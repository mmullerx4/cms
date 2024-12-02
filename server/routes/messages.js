var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

// GET all messages
router.get('/', (req, res) => {
  Message.find()
    .then((messages) => res.status(200).json(messages))
    .catch((error) => res.status(500).json({ message: 'Error fetching messages', error }));
});

// GET a message by ID
router.get('/:id', (req, res) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      if (message) {
        res.status(200).json(message);
      } else {
        res.status(404).json({ message: 'Message not found' });
      }
    })
    .catch((error) => res.status(500).json({ message: 'Error fetching message', error }));
});

// POST (create a new message)
router.post('/', (req, res) => {
  const maxMessageId = sequenceGenerator.nextId('messages');

  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender,
  });

  message
    .save()
    .then((createdMessage) => {
      res.status(201).json({
        message: 'Message added successfully',
        createdMessage: createdMessage,
      });
    })
    .catch((error) => res.status(500).json({ message: 'An error occurred', error }));
});

// PUT (update a message)
router.put('/:id', (req, res) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      if (message) {
        message.subject = req.body.subject;
        message.msgText = req.body.msgText;
        message.sender = req.body.sender;

        return Message.updateOne({ id: req.params.id }, message);
      } else {
        return Promise.reject({ message: 'Message not found.' });
      }
    })
    .then(() => res.status(204).json({ message: 'Message updated successfully' }))
    .catch((error) => res.status(500).json({ message: error.message || 'An error occurred', error }));
});

// DELETE (remove a message)
router.delete('/:id', (req, res) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      if (message) {
        return Message.deleteOne({ id: req.params.id });
      } else {
        return Promise.reject({ message: 'Message not found.' });
      }
    })
    .then(() => res.status(204).json({ message: 'Message deleted successfully' }))
    .catch((error) => res.status(500).json({ message: error.message || 'An error occurred', error }));
});

module.exports = router;
