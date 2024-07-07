import { createBlock } from "../../../services/createBlock";

export const CreateBlocks = () => {
  const handleCreateBlock = async () => createBlock();

  return (
    <>
      <div>
        <button onClick={handleCreateBlock}>Create Block</button>
      </div>
    </>
  );
};
