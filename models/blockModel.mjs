import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: [true, 'Timestamp is required'],
  },
  lastHash: {
    type: String,
    required: [true, 'Last hash is required']
  },
  hash: {
    type: String,
    required: [true, 'Hash is required']
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // Can be of mixed type
    required: [true, 'Data is required']
  },
  nonce: {
    type: Number,
    required: [true, 'Nonce hash is required']
  },
  difficulty: {
    type: Number,
    required: [true, 'Difficulty is required']
  }
});

export default mongoose.model('blockModel', blockSchema);