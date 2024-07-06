import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/mongo.mjs';
import colors from 'colors';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import cors from 'cors';

import Blockchain from './models/Blockchain.mjs';
import TransactionPool from './models/TransactionPool.mjs';
import Wallet from './models/Wallet.mjs';
import blockRouter from './routes/blockRoutes.mjs';
import blockchainRouter from './routes/blockchainRoutes.mjs';
import transactionRouter from './routes/transactionRoutes.mjs';
import authRouter from './routes/authRoutes.mjs';
import usersRouter from './routes/userRoutes.mjs';
import PubNubServer from './pubnubServer.mjs';

import path from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from './middleware/errorHandler.mjs';
import { initializeBlockchain } from './controllers/blockController.mjs';

dotenv.config({ path: './config/config.env' });

const credentials = {
  publishKey: process.env.PUBLISH_KEY,
  subscribeKey: process.env.SUBSCRIBE_KEY,
  secretKey: process.env.SECRET_KEY,
  userId: process.env.USER_ID,
};

connectDb();

const fileName = fileURLToPath(import.meta.url);
const dirname = path.dirname(fileName);
global.__appdir = dirname;

export const blockchain = new Blockchain();
export const transactionPool = new TransactionPool();
export const wallet = new Wallet();
export const pubnubServer = new PubNubServer({
  blockchain: blockchain,
  transactionPool: transactionPool,
  wallet: wallet,
  credentials: credentials,
});

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__appdir, 'public')));
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());

const limit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minuters fönster
  limit: 100,
});

app.use(limit);
app.use(cors());
app.use(hpp());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);

app.use(errorHandler);

const DEFAULT_PORT = process.env.PORT;
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;

let NODE_PORT;

setTimeout(() => {
  pubnubServer.broadcast();
}, 1000);

app.use('/api/v1/blockchain', blockchainRouter);
app.use('/api/v1/block', blockRouter);
app.use('/api/v1/wallet', transactionRouter);

initializeBlockchain();

const synchronize = async () => {
  let response = await fetch(`${ROOT_NODE}/api/v1/blockchain`);
  if (response.ok) {
    const result = await response.json();
    blockchain.replaceChain(result.data);
  }

  response = await fetch(`${ROOT_NODE}/api/v1/wallet/transactions`);
  if (response.ok) {
    const result = await response.json();
    transactionPool.replaceTransactionMap(result.data);
  }
};

if (process.env.GENERATE_NODE_PORT === 'true') {
  NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 10);
}

const PORT = NODE_PORT || DEFAULT_PORT;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`.yellow);

  if (PORT !== DEFAULT_PORT) {
    synchronize();
  }
}
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error message: ${err.message}`.red);
  server.close(() => process.exit(1));
});
