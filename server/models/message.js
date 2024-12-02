const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  msgText: { type: String, required: true },
  sender: { type: String, required: true },
});

module.exports = mongoose.model('Message', messageSchema);

