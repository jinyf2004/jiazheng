export class Metrics {
  private static metrics: { [key: string]: number } = {};

  public static capture(metricName: string, value: number, tags?: { [key: string]: string }) {
    if (!this.metrics[metricName]) {
      this.metrics[metricName] = 0;
    }
    this.metrics[metricName] += value;

    // 打印指标到控制台（实际应用中可以发送到监控系统）
    console.log(`Metric: ${metricName}, Value: ${value}, Tags:`, tags);
  }

  public static getMetrics(): { [key: string]: number } {
    return this.metrics;
  }
}

// 导出单例
export const metrics = new Metrics();