import express from 'express';
import { listBlock } from '../controllers/blockchainController.mjs';

const router = express.Router();

router.route('/').get(listBlock);

export default router;
