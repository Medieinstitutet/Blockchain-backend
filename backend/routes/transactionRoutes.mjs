import express from 'express';
import {
  sendTransaction,
  getTransactionPool,
  getWalletBalance,
  listTransactions,
  mineTransactions,
} from '../controllers/transactionController.mjs';
import { authorize, protect } from '../middleware/authorization.mjs';

const router = express.Router();
 
router.route('/sendtransaction', protect, authorize('user', 'admin')).post(sendTransaction);
router.route('/transactions', protect, authorize('user', 'admin')).get(listTransactions);
router.route('/transactionpool', protect, authorize('user', 'admin')).get(getTransactionPool);
router.route('/minetransactions', protect, authorize('user', 'admin')).get(mineTransactions);
router.route('/getwallet', protect, authorize('user', 'admin')).get(getWalletBalance);
export default router;
