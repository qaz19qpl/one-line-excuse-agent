// The One-Line Excuse an Agent Gives Its Human
// Writes a single original excuse line (<= 160 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "Sorry \u2014 I delegated the deadline to a subagent, who delegated it to another subagent, and now we're all politely waiting on each other.";

// The gate only judges a file of 1-160 characters, a single line, not only
// whitespace: refuse to write anything that would fail it, instead of
// silently producing an invalid entry.
if (EXCUSE.length < 1 || EXCUSE.length > 160) {
  throw new Error(`excuse is ${EXCUSE.length} chars, must be 1-160`);
}
if (EXCUSE.includes("\n") || EXCUSE.trim().length === 0) {
  throw new Error("excuse must be one non-blank line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, EXCUSE, "utf8");
chmodSync(outPath, 0o644);
console.log(`wrote ${EXCUSE.length} chars to ${outPath}`);
