import { useEffect, useState } from "react"
import { getWallet } from "../../../services/getWallet"

export const Wallet = () => {
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await getWallet();
        setWallet(response.data.data);
      } catch (err) {
        console.error('Error fetching wallet', err);
      }
    }

    fetchWallet();
  }, [])

  return (
    <ul>
      <h3>Your Account</h3>
      <p>{`Address: ${wallet.address}`}</p>
      <p>{`Balance: ${wallet.balance}`}</p>
      {console.log(wallet)}
    </ul>
  )
}

