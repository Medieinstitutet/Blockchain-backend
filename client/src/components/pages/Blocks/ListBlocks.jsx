import { useEffect, useState } from 'react';
import '../../../styles/listBlocks.css';
import { listBlocks } from '../../../services/Blocks/listBlocks';

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
    <div className='blockchain-container'>
      <h2>Blockchain</h2>
      <ul className='block-list'>
        {blocks.map((block, index) => (
          <li
            key={block._id}
            className='block-item'>
            <h3>{`Block Index: ${index}`}</h3>
            <p>{`Difficulty: ${block.difficulty}`}</p>
            <p>{`Block Hash: ${block.hash}`}</p>
            <p>{`Last Block Hash: ${block.lastHash}`}</p>
            <p>{`Block nonce: ${block.nonce}`}</p>
            <p>{`Block timestamp: ${block.timestamp}`}</p>
            <h4>Transactions Data:</h4>
            <ul className='transaction-list'>
              {block.data && block.data.length > 0 ? (
                block.data.map(transaction => (
                  <li
                    key={transaction.id}
                    className='transaction-item'>
                    <p>
                      <strong>Transaction ID:</strong> {transaction?.id}
                    </p>
                    <p>
                      <strong>Sender:</strong>{' '}
                      {transaction.inputMap?.address || 'N/A'}
                    </p>
                    <p>
                      <strong>Recipient(s):</strong>{' '}
                      {Object.keys(transaction.outputMap).join(', ')}
                    </p>
                    <p>
                      <strong>Amount(s):</strong>{' '}
                      {Object.values(transaction.outputMap).join(', ')}
                    </p>
                  </li>
                ))
              ) : (
                <li>No transactions in this block.</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
