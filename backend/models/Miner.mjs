import BlockModel from './BlockModel.mjs';
import Transaction from './Transaction.mjs';
import TransactionModel from './TransactionModel.mjs';

export default class Miner {
  constructor({ blockchain, wallet, transactionPool, pubsub }) {
    this.blockchain = blockchain;
    this.wallet = wallet;
    this.transactionPool = transactionPool;
    this.pubsub = pubsub;
  }

  getPendingTransactions = async () => {
    try {
      const transactions = await TransactionModel.find({ status: 'pending' });
      return transactions;
    } catch (error) {
      console.error('Error fetching pending transactions:', error);
      throw error;
    }
  };

  async mineTransaction() {
    const pendingTransactions = await this.getPendingTransactions();
    const validTransactions = this.transactionPool.validateTransactions();

    const allTransactions = [...validTransactions, ...pendingTransactions];
    allTransactions.push(Transaction.transactionReward({ miner: this.wallet }));

    // Update the status of mined transactions using updateMany
    const transactionIds = allTransactions.map(tx => tx._id);
    await TransactionModel.updateMany(
      { _id: { $in: transactionIds } },
      { $set: { status: 'mined' } }
    );

    const block = this.blockchain.addBlock({ data: allTransactions });
    this.pubsub.broadcast();

    BlockModel.create({
      timestamp: block.timestamp,
      lastHash: block.lastHash,
      hash: block.hash,
      data: block.data,
      nonce: block.nonce,
      difficulty: block.difficulty,
    });

    this.transactionPool.clearTransactions();
  }
}
