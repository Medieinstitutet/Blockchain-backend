import { mineBlock } from "../../../services/mineBlock";

export const MineBlocks = () => {
  const handleMineBlock = async () => mineBlock();

  return (
    <>
      <div>
        <button onClick={handleMineBlock}>Mine Block</button>
      </div>
    </>
  );
};
