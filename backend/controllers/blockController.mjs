import { pubnubServer } from '../server.mjs';
import { blockchain } from '../server.mjs';
import BlockModel from '../models/BlockModel.mjs';
import { asyncHandler } from '../middleware/asyncHandler.mjs';
import { GENESIS_DATA } from '../config/settings.mjs';

export const initializeBlockchain = async () => {
  try {
    const blockCount = await BlockModel.countDocuments();
    
    if (blockCount === 0) {
      await BlockModel.create(GENESIS_DATA);
      console.log('Genesis block added to the database');
    }
  } catch (error) {
    console.error('Error initializing blockchain:', error);
  }
};

export const mineBlock = asyncHandler(async (req, res, next) => {
  const block = blockchain.addBlock({ data: req.body });  
  pubnubServer.broadcast();
  res.status(201).json({ success: true, statusCode: 201, data: block });
});
