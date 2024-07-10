import { mineBlock } from "../../../services/mineBlock";

export const MineBlocks = () => {
  const handleCreateBlock = async () => mineBlock();

  return (
    <>
      <div>
        <button onClick={handleCreateBlock}>Mine Block</button>
      </div>
    </>
  );
};
