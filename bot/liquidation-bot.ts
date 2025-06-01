import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import { Program, AnchorProvider } from "@project-serum/anchor";

class LiquidationBot {
  private connection: Connection;
  private program: Program;
  private wallet: Keypair;
  private provider: AnchorProvider;

  constructor(rpcUrl: string, programId: PublicKey, wallet: Keypair) {
    this.connection = new Connection(rpcUrl);
    this.wallet = wallet;
    this.provider = new AnchorProvider(
      this.connection,
      new Wallet(this.wallet),
      { commitment: "confirmed" }
    );
    this.program = new Program(IDL, programId, this.provider);
  }

  async start() {
    // 1. Subscribe to price updates
    this.subscribeToPriceUpdates();

    // 2. Start position monitoring
    this.monitorPositions();
  }

  private async monitorPositions() {
    while (true) {
      try {
        // 1. Get all open positions
        const positions = await this.getOpenPositions();

        // 2. Check each position
        for (const position of positions) {
          if (await this.isLiquidatable(position)) {
            await this.liquidatePosition(position);
          }
        }

        // 3. Wait before next check
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Error in position monitoring:", error);
      }
    }
  }

  private async isLiquidatable(position: Position): Promise<boolean> {
    try {
      // Get current prices
      const [tokenPrice, collateralPrice] = await this.getPrices(position);

      // Check leverage
      const leverage = await this.program.methods
        .getLeverage({
          position,
          tokenPrice,
          collateralPrice,
        })
        .accounts({
          pool: position.pool,
          custody: position.custody,
          collateralCustody: position.collateralCustody,
        })
        .view();

      return leverage > position.maxLeverage;
    } catch (error) {
      console.error("Error checking liquidation:", error);
      return false;
    }
  }

  private async liquidatePosition(position: Position) {
    try {
      // 1. Get required accounts
      const accounts = await this.getLiquidationAccounts(position);

      // 2. Execute liquidation
      const tx = await this.program.methods
        .liquidate({})
        .accounts(accounts)
        .rpc();

      console.log(
        `Liquidated position ${position.publicKey.toString()}, tx: ${tx}`
      );

      // 3. Track profit
      await this.trackProfit(position, tx);
    } catch (error) {
      console.error("Error liquidating position:", error);
    }
  }
}
