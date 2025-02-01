// Use token bucket algorithm
class RateLimiter {
  constructor(
    private minDelay: number,
    private maxDelay: number,
  ) {}

  async acquire() {
    const delay =
      Math.random() * (this.maxDelay - this.minDelay) + this.minDelay;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}
