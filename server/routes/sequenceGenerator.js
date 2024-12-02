const Sequence = require('../models/sequence');

let maxDocumentId;
let maxMessageId;
let maxContactId;
let sequenceId = null;

class SequenceGenerator {
  constructor() {
    // Use async/await to handle the asynchronous behavior
    this.initializeSequence();
  }

  // Initialize the sequence values
  async initializeSequence() {
    try {
      const sequence = await Sequence.findOne().exec();
      if (!sequence) {
        throw new Error('Sequence document not found.');
      }

      sequenceId = sequence._id;
      maxDocumentId = sequence.maxDocumentId;
      maxMessageId = sequence.maxMessageId;
      maxContactId = sequence.maxContactId;
    } catch (err) {
      console.error('Error initializing SequenceGenerator:', err);
    }
  }

  // Generate the next ID for the given collection type
  async nextId(collectionType) {
    try {
      let updateObject = {};
      let nextId;

      switch (collectionType) {
        case 'documents':
          maxDocumentId++;
          updateObject = { maxDocumentId };
          nextId = maxDocumentId;
          break;
        case 'messages':
          maxMessageId++;
          updateObject = { maxMessageId };
          nextId = maxMessageId;
          break;
        case 'contacts':
          maxContactId++;
          updateObject = { maxContactId };
          nextId = maxContactId;
          break;
        default:
          throw new Error('Invalid collection type');
      }

      // Use updateOne() instead of the deprecated update()
      await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject });
      return nextId;
    } catch (err) {
      console.error('Error generating next ID:', err);
      return null;
    }
  }
}

module.exports = new SequenceGenerator();
