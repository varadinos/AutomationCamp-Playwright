import { test, expect } from '../setup/fixtures';
import { PerformanceHelper } from '../utils/PerformanceHelper';

test('Measure LCP and verify it is within the desired threshold', async ({ advancedTopicsPage, page }, testInfo) => {
  // Measure Largest Contentful Paint (LCP) using the helper class
  const largestContentfulPaint = await PerformanceHelper.measureLCP(page);

  // Log & Validate LCP
  console.log(`Largest Contentful Paint: ${largestContentfulPaint} ms`);

  // Ensure LCP is measured and within acceptable thresholds
  expect(largestContentfulPaint).toBeGreaterThan(0); // Ensure LCP is measured successfully
  expect(largestContentfulPaint).toBeLessThan(2000); // Ensure LCP is within the desired threshold

  //Add annotation to HTML report
  testInfo.annotations.push({ type: 'LCP load time', description: String(largestContentfulPaint) + ' ms'});
});
