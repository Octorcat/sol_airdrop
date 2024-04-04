import { Connection, PublicKey, LAMPORTS_PER_SOL, Keypair } from "@solana/web3.js";
require('dotenv').config();

const RPC_URL = process.env.RPC_URL || "https://api.devnet.solana.com";
const WALLET_ADDRESS = process.env.WALLET_ADDRESS || new Keypair().publicKey.toString();
const connection = new Connection(RPC_URL, "confirmed");

(async (): Promise<void> => {
  const walletAddress = new PublicKey(WALLET_ADDRESS);
  const signature = await connection.requestAirdrop(walletAddress, LAMPORTS_PER_SOL);
  try {
    const tx = await connection.confirmTransaction(signature);
    console.log(`1 SOL airdropped to ${walletAddress.toString()}`);
  } catch (e) {
    console.error(e);
  }
})();