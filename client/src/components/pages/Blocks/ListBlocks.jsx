import { useEffect, useState } from 'react';
import { listBlocks } from '../../../services/listBlocks';

export const ListBlocks = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await listBlocks();
        setBlocks(response.data.data);
      } catch (err) {
        console.error('Error fetching blocks', err);
      }
    };

    fetchBlocks();
  }, []);

  return (
    <ul>
      {blocks.map((block, index) => {
        return (
          <li key={block._id}>
            <h3>{`Block Index: ${index}`}</h3>
            <p>{`Difficulty: ${block.difficulty}`}</p>
            <p>{`Block Hash: ${block.hash}`}</p>
            <p>{`Last Block Hash: ${block.lastHash}`}</p>
            <p>{`Transaction Data: ${JSON.stringify(...block.data)}`}</p>
            <p>{`Block nonce: ${block.nonce}`}</p>
            <p>{`Block timestamp: ${block.timestamp}`}</p>
            {console.log(block.data)}
          </li>
        );
      })}
    </ul>
  );
};
