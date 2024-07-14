import { transactionPool } from '../server.mjs';
import { blockchain } from '../server.mjs';
import Miner from '../models/Miner.mjs';
import { pubnubServer } from '../server.mjs';
import Wallet from '../models/Wallet.mjs';
import TransactionModel from '../models/TransactionModel.mjs';
import { asyncHandler } from '../middleware/asyncHandler.mjs';
import { wallet } from './authController.mjs';

export const sendTransaction = (req, res, next) => {
  const { id, recipient, amount } = req.body;

  // Check if a transaction already exists for the current user's wallet
  let existingTransaction = transactionPool.transactionExist({
    address: wallet.publicKey,
  });

  // Clear any existing transaction for the current user's wallet
  if (existingTransaction) {
    transactionPool.clearTransactionByAddress(wallet.publicKey);
  }

  // Always create a new transaction
  let transaction;
  try {
    transaction = wallet.createTransaction({ recipient, amount });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, statusCode: 400, error: error.message });
  }

  transactionPool.addTransaction(transaction);
  pubnubServer.broadcastTransaction(transaction);

  const { outputMap, inputMap } = transaction;

  TransactionModel.create({
    id,
    sender: wallet.publicKey,
    recipient,
    amount,
    outputMap,
    inputMap,
  });

  res.status(201).json({ success: true, statusCode: 201, data: transaction });
};

export const getWalletBalance = (req, res, next) => {
  const address = wallet.publicKey;
  const balance = Wallet.calculateBalance({
    chain: blockchain.chain,
    address,
  });

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: { address, balance },
  });
};

export const getTransactionPool = (req, res, next) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: transactionPool.transactionMap,
  });
};

export const listTransactions = asyncHandler(async (req, res, next) => {
  const transactions = await TransactionModel.find();
  res.status(200).json({ success: true, statusCode: 200, data: transactions });
});

export const mineTransactions = (req, res, next) => {
  const miner = new Miner({
    blockchain,
    transactionPool,
    wallet,
    pubsub: pubnubServer,
  });

  miner.mineTransaction();

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: 'Transactions mined!'
  });
};
