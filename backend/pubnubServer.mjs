import PubNub from 'pubnub';
import BlockModel from './models/BlockModel.mjs';

const CHANNELS = {
  DEMO: 'DEMO',
  BLOCKCHAIN: 'BLOCKCHAINEDU',
  TRANSACTION: 'TRANSACTION',
};

export default class PubNubServer {
  constructor({ blockchain, transactionPool, wallet, credentials }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.pubnub = new PubNub(credentials);
    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
    this.pubnub.addListener(this.listener());
  }

  async broadcast() {
    const genesisBlock = await BlockModel.findOne({ hash: '0' })

    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(genesisBlock),
      // message: JSON.stringify(this.blockchain.chain),
    });
  }

  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction),
    });
  }

  listener() {
    return {
      message: (msgObject) => {
        const { channel, message } = msgObject;
        const msg = JSON.parse(message);

        console.log(
          `Message was accepted on channel: ${channel}, Message: ${message}`
        );

        switch (channel) {
          case CHANNELS.BLOCKCHAIN:
            this.blockchain.replaceChain(msg, true, () => {
              this.transactionPool.clearBlockTransactions({ chain: msg });
            });
            break;
          case CHANNELS.TRANSACTION:
            if (
              !this.transactionPool.transactionExist({
                address: this.wallet.publicKey,
              })
            ) {
              this.transactionPool.addTransaction(msg);
            }
            break;
          default:
            return;
        }
      },
    };
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}
