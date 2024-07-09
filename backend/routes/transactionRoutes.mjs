import express from 'express';
import {
  addTransaction,
  getTransactionPool,
  getWalletBalance,
  listTransactions,
  mineTransactions,
} from '../controllers/transactionController.mjs';
import { authorize, protect } from '../middleware/authorization.mjs';

const router = express.Router();
 
router.route('/addtransaction', protect, authorize('user', 'admin')).post(addTransaction);
router.route('/transactions', protect, authorize('user', 'admin')).get(listTransactions);
router.route('/transactionpool', protect, authorize('user', 'admin')).get(getTransactionPool);
router.route('/minetransactions', protect, authorize('user', 'admin')).get(mineTransactions);
router.route('/getbalance', protect, authorize('user', 'admin')).get(getWalletBalance);
export default router;
