export class ExponentialStrategy {
  private baseDelay: number;
  private maxDelay: number;

  constructor({ baseDelay, maxDelay }: { baseDelay: number; maxDelay: number }) {
    this.baseDelay = baseDelay;
    this.maxDelay = maxDelay;
  }

  public getDelay(retryCount: number): number {
    const delay = Math.min(this.baseDelay * (2 ** retryCount), this.maxDelay);
    return delay + Math.random() * 1000; // 添加随机性
  }
}