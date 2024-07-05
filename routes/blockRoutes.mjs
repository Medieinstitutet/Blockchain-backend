import express from 'express';
import { mineBlock } from '../controllers/blockController.mjs';
import { authorize, protect } from '../middleware/authorization.mjs';

const router = express.Router();

router.route('/mine', protect, authorize('user', 'admin')).post(mineBlock);
export default router;
