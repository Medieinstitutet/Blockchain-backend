import { pubnubServer } from '../server.mjs';
import { blockchain } from '../server.mjs';
import BlockModel from '../models/BlockModel.mjs';
import { asyncHandler } from '../middleware/asyncHandler.mjs';

export const mineBlock = asyncHandler(async (req, res, next) => {
  const requestData = req.body;
  
  const block = blockchain.addBlock({ data: requestData });

  const { timestamp, lastHash, hash, data, nonce, difficulty } = block;
  
  pubnubServer.broadcast();

  BlockModel.create({
    timestamp,
    lastHash,
    hash,
    data,
    nonce,
    difficulty
  });

  res.status(201).json({ success: true, statusCode: 201, data: block });
});
