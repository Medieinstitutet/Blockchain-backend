import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import Wallet from "./Wallet.mjs";

const transactionSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => uuidv4().replaceAll('-', ''),
    required: [true, 'ID is required'],
  },
  sender: {
    type: String,
    default: Wallet.publicKey,
    required: [true, 'Sender is required'],
  },
  recipient: {
    type: String,
    required: [true, 'Recipient is required']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
  },
  outputMap: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: [true, 'Output map is required']
  },
  inputMap: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: [true, 'Input map is required'],
  },
  status: {
    type: String,
    enum: ['pending', 'mined'],
    default: 'pending',
    required: [true, 'Status is required']
  },
})

export default mongoose.model('TransactionModel', transactionSchema);
