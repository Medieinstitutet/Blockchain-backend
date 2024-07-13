import { GENESIS_DATA } from "./config/settings.mjs";
import BlockModel from "./models/BlockModel.mjs";

export const initializeBlockchain = async () => {
  try {
    const blockCount = await BlockModel.countDocuments();
    
    if (blockCount > 0) {
      console.log('Genesis already in database');
    } else {
      await BlockModel.create(GENESIS_DATA);
      console.log('Genesis block added to the database');
    }
  } catch (error) {
    console.error('Error initializing blockchain:', error);
  }
};