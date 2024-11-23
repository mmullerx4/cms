var express = require('express');
var router = express.Router();

// Sample data (replace with database logic as needed)
let contacts = [];

// GET all contacts
router.get('/', (req, res) => {
  res.status(200).json(contacts);
});

// GET a single contact by ID
router.get('/:id', (req, res) => {
  const contact = contacts.find((contact) => contact.id == req.params.id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

// POST (create a new contact)
router.post('/', (req, res) => {
  const { id, name, email, phone, imageUrl, group } = req.body;

  // Validate input data (ensure all required fields are present)
  if (!id || !name || !email || !phone || !imageUrl) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check if the contact ID already exists
  if (contacts.some((contact) => contact.id === id)) {
    return res.status(409).json({ message: 'Contact with this ID already exists.' });
  }

  // Create and save a new contact
  const newContact = new Contact(id, name, email, phone, imageUrl, group || []);
  contacts.push(newContact);
  res.status(201).json(newContact);
});


// PUT (update/replace an existing contact)
router.put('/:id', (req, res) => {
  const index = contacts.findIndex((contact) => contact.id === req.params.id);

  if (index !== -1) {
    const { id, name, email, phone, imageUrl, group } = req.body;

    // Validate input data (ensure all required fields are present)
    if (!id || !name || !email || !phone || !imageUrl) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Replace the existing contact with a new Contact instance
    const updatedContact = new Contact(id, name, email, phone, imageUrl, group || []);
    contacts[index] = updatedContact;
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: 'Contact not found.' });
  }
});

// PATCH (modify an existing contact)
router.patch('/:id', (req, res) => {
  const contact = contacts.find((contact) => contact.id == req.params.id);
  if (contact) {
    Object.assign(contact, req.body);
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

// DELETE (remove a contact)
router.delete('/:id', (req, res) => {
  const index = contacts.findIndex((contact) => contact.id == req.params.id);
  if (index !== -1) {
    contacts.splice(index, 1);
    res.status(200).json({ message: 'Contact deleted' });
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

module.exports = router;
