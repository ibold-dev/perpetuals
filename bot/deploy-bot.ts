// deploy-bot.ts
import { LiquidationBot } from "./liquidation-bot";
import { Keypair } from "@solana/web3.js";

async function deployBots() {
  // 1. Create multiple bot instances
  const bots = [];
  const numBots = 5; // Number of parallel bots

  for (let i = 0; i < numBots; i++) {
    const wallet = Keypair.generate();
    const bot = new LiquidationBot(
      "https://api.mainnet-beta.solana.com",
      new PublicKey("your_program_id"),
      wallet
    );
    bots.push(bot);
  }

  // 2. Start all bots
  for (const bot of bots) {
    await bot.start();
  }
}
