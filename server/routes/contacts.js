var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

// GET all contacts
router.get('/', (req, res) => {
  Contact.find()
    .then((contacts) => {
      res.status(200).json(contacts); // Respond with the list of contacts
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error fetching contacts', error }); // Handle errors
    });
});

// GET a single contact by ID
router.get('/:id', (req, res) => {
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      if (contact) {
        res.status(200).json(contact);
      } else {
        res.status(404).json({ message: 'Contact not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error fetching contact', error });
    });
});

// POST (create a new contact)
router.post('/', (req, res, next) => {
  const maxContactId = sequenceGenerator.nextId('contacts');

  const contact = new Contact({
    id: maxContactId, // Fixed typo here
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group || [], // Ensure 'group' is an array, default to an empty array
  });

  contact
    .save()
    .then((createdContact) => {
      res.status(201).json({
        message: 'Contact added successfully',
        contact: createdContact,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error occurred',
        error: error,
      });
    });
});

// PUT (update/replace an existing contact)
router.put('/:id', (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      if (contact) {
        // Update contact fields with incoming data
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.imageUrl = req.body.imageUrl;

        // Update the 'group' field based on incoming data
        contact.group = req.body.group || contact.group; // Update the group only if new value is provided

        return contact.save(); // Save the updated contact
      } else {
        return Promise.reject({
          message: 'Contact not found.',
        });
      }
    })
    .then((updatedContact) => {
      res.status(200).json({
        message: 'Contact updated successfully',
        contact: updatedContact, // Return the updated contact
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || 'An error occurred',
        error: error,
      });
    });
});

// DELETE (remove a contact)
router.delete('/:id', (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      if (contact) {
        return Contact.deleteOne({ id: req.params.id });
      } else {
        return Promise.reject({
          message: 'Contact not found.',
        });
      }
    })
    .then(() => {
      res.status(200).json({
        message: 'Contact deleted successfully', // Changed status to 200 for confirmation
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
