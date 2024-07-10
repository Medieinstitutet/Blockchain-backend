import BlockModel from './BlockModel.mjs';
import Transaction from './Transaction.mjs';

export default class Miner {
  constructor({ blockchain, wallet, transactionPool, pubsub }) {
    this.blockchain = blockchain;
    this.wallet = wallet;
    this.transactionPool = transactionPool;
    this.pubsub = pubsub;
  }

  mineTransaction() {
    const validTransactions = this.transactionPool.validateTransactions();
    validTransactions.push(
      Transaction.transactionReward({ miner: this.wallet })
    );
    
    const block = this.blockchain.addBlock({ data: validTransactions });
    this.pubsub.broadcast();

    BlockModel.create({
      timestamp: block.timestamp,
      lastHash: block.lastHash,
      hash: block.hash,
      data: block,
      nonce: block.nonce,
      difficulty: block.difficulty
    });

    this.transactionPool.clearTransactions();
  }
}
