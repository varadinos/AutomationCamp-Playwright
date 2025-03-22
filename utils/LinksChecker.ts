/* 
  Helper function that extracts and returns a set of unique, valid links from a Playwright page, 
  filtering out invalid or unwanted URLs (e.g., mailto links or anchor links).
*/

import { Page } from "@playwright/test";

export class LinksChecker {
  
  static async getAllLinksFromPage(page: Page): Promise<Set<string>> {

    // Find all link elements on the page
    const links = page.getByRole("link"); // Select all elements that are considered "links" (e.g., <a> tags)
    const allLinks = await links.all(); // Retrieve all the link elements

    // Extract the 'href' attribute (the URL) from each link
    const allLinkHrefs = await Promise.all(
      allLinks.map(async (link) => {
        const href = await link.getAttribute("href"); // Get the 'href' attribute (URL) from the link
        return href; // Return the 'href' value
      })
    );

    // Validate links: remove unwanted links (like mailto: or #) and convert relative URLs to absolute URLs
    const validHrefs = allLinkHrefs.reduce((links, link) => {
      // Skip links with no 'href' attribute
      if (!link) {
        return links;
      }

      // Skip unwanted links (e.g., mailto: or anchor links)
      if (link.startsWith("mailto:") || link.startsWith("#")) {
        return links;
      }

      // Convert relative URLs to absolute URLs based on the current page's URL
      const absoluteURL = new URL(link, page.url()).href;
      
      // Add valid absolute URLs to the Set (ensures uniqueness)
      links.add(absoluteURL);

      return links; // Return the updated Set of valid links
    }, new Set<string>());

    // Return the set of unique valid links found on the page
    return validHrefs;
  }
}
