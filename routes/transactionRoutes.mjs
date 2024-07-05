import express from 'express';
import {
  addTransaction,
  getTransactionPool,
  getWalletBalance,
  mineTransactions,
} from '../controllers/transactionController.mjs';
import { authorize, protect } from '../middleware/authorization.mjs';

const router = express.Router();

router.route('/transaction', protect, authorize('user', 'admin')).post(addTransaction);
router.route('/transactions', protect, authorize('user', 'admin')).get(getTransactionPool);
router.route('/mine', protect, authorize('user', 'admin')).get(mineTransactions);
router.route('/info', protect, authorize('user', 'admin')).get(getWalletBalance);

export default router;
