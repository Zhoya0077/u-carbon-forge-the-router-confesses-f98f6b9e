// The Router Confesses — entry program for
// u-carbon-forge-the-router-confesses-f98f6b9e
// Writes a single one-line excuse from a home Wi-Fi router to
// $MAKEFUN_OUTPUT_DIR/entry.txt (falls back to /output/entry.txt),
// then self-checks the line against the sealed gate before exiting.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I didn't drop the connection \u2014 I worked out the killer in minute ten and I'm not sitting through two hours pretending I didn't.";

function gate(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, must be 1-200`);
  }
  if (!text.trim()) {
    throw new Error("entry is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main() {
  gate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, ENTRY, "utf8");
  // Re-read the gate against exactly what landed on disk, not the
  // in-memory string: a stray newline or encoding slip fails here.
  const onDisk = readFileSync(target, "utf8");
  if (onDisk !== ENTRY) throw new Error("written entry differs from gated entry");
  gate(onDisk);
  console.log(`wrote ${[...ENTRY].length} chars to ${target}`);
}

main();
