import { createBlock } from "../../services/createBlock"

export const Blockchain = () => {
  const handleCreateBlock = async () => createBlock()

  return (
    <>
      <button onClick={handleCreateBlock}>Create Block</button>
    </>
  )
}