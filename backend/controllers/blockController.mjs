import { pubnubServer } from '../server.mjs';
import { blockchain } from '../server.mjs';
import { asyncHandler } from '../middleware/asyncHandler.mjs';

export const mineBlock = asyncHandler(async (req, res, next) => {
  const block = blockchain.addBlock({ data: req.body });  
  pubnubServer.broadcast();
  res.status(201).json({ success: true, statusCode: 201, data: block });
});
