//  export async extractSelectorContent(page: Page, selector: string) {
//   return page.$$eval(selector, elements =>
//     elements.map(el => el.textContent?.trim())
//   );
// }

// Implement retry logic with exponential backoff
// async withRetry<T>(fn: () => Promise<T>, maxRetries: number) {
//   let attempts = 0;
//   while (attempts <= maxRetries) {
//     try {
//       return await fn();
//     } catch (error) {
//       if (attempts++ >= maxRetries) throw error;
//       await new Promise(resolve =>
//         setTimeout(resolve, 2 ** attempts * 1000)
//       );
//     }
//   }
// }

// Use token bucket algorithm
// class RateLimiter {
//   constructor(
//     private minDelay: number,
//     private maxDelay: number
//   ) {}

//   async acquire() {
//     const delay = Math.random() * (this.maxDelay - this.minDelay) + this.minDelay;
//     await new Promise(resolve => setTimeout(resolve, delay));
//   }
// }
