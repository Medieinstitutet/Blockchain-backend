// import { blockchain } from '../server.mjs';
import BlockModel from '../models/BlockModel.mjs';

export const listBlock = async (req, res, next) => {
  const getBlocks = await BlockModel.find();

  res
    .status(200)
    .json({ success: true, statusCode: 200, data: getBlocks });
};
