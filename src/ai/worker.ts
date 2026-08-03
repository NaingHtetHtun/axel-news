require("dotenv").config({ path: ".env.local" });

import { enrichUnenrichedArticles } from "./enrich";

async function main() {
  console.log("[EnrichWorker] Starting enrichment...");

  try {
    const result = await enrichUnenrichedArticles(10);
    console.log("[EnrichWorker] Complete:", result);
  } catch (error) {
    console.error("[EnrichWorker] Failed:", error);
    process.exit(1);
  }
}

main();
