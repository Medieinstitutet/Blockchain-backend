import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: [true, 'Timestamp is required'],
  },
  lastHash: {
    type: string,
    required: [true, 'Last hash is required']
  },
  hash: {
    type: string,
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
  Difficulty: {
    type: Number,
    required: [true, 'Difficulty is required']
  }
});

export default mongoose.model('Block', blockSchema);