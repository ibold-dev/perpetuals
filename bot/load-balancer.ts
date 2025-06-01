// load-balancer.ts
class LiquidationLoadBalancer {
  private bots: LiquidationBot[];
  private positionQueue: Position[];

  constructor(bots: LiquidationBot[]) {
    this.bots = bots;
    this.positionQueue = [];
  }

  async distributePositions() {
    while (true) {
      // 1. Get new positions
      const newPositions = await this.getNewPositions();
      this.positionQueue.push(...newPositions);

      // 2. Distribute to available bots
      for (const position of this.positionQueue) {
        const availableBot = this.getAvailableBot();
        if (availableBot) {
          await availableBot.liquidatePosition(position);
          this.positionQueue = this.positionQueue.filter((p) => p !== position);
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}
