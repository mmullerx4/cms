const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }] // Relational reference
});

module.exports = mongoose.model('Document', documentSchema);


