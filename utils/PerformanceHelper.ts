//Helper function to mesure LCP load time

export class PerformanceHelper {
  static async measureLCP(page): Promise<number> {
    return await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        // Check if LCP has already been recorded before observer starts
        const existingEntries = performance.getEntriesByType('largest-contentful-paint');
        if (existingEntries.length > 0) {
          const lastEntry = existingEntries.at(-1);
          return resolve(lastEntry ? lastEntry.startTime : -1);
        }

        // Create PerformanceObserver to capture future LCP events
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries.at(-1);
          if (lastEntry) {
            observer.disconnect(); // Stop observing once we get LCP
            resolve(lastEntry.startTime);
          }
        });

        observer.observe({ type: 'largest-contentful-paint', buffered: true });

        // Timeout fallback if LCP is not recorded
        setTimeout(() => {
          observer.disconnect();
          console.warn('LCP measurement timed out after 5 seconds.');
          resolve(-1); // Return -1 if no LCP found
        }, 5000);
      });
    });
  }
}
