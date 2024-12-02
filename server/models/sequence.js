const mongoose = require('mongoose');

// Define the schema for the sequence
const sequenceSchema = new mongoose.Schema({
  maxDocumentId: { type: Number, default: 0 },
  maxMessageId: { type: Number, default: 0 },
  maxContactId: { type: Number, default: 0 }
});

// Create the model for the Sequence collection
const Sequence = mongoose.model('Sequence', sequenceSchema);

module.exports = Sequence;
