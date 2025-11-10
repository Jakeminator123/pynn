const fs = require("fs");
const content = fs.readFileSync("lib/detection-info.ts", "utf8");
const lines = content.split("\n");
const seen = new Set();
const cleaned = [];
let inExplanations = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.includes("export const programExplanations")) {
    inExplanations = true;
    cleaned.push(line);
    continue;
  }

  if (inExplanations && line.trim().startsWith("}")) {
    inExplanations = false;
    cleaned.push(line);
    continue;
  }

  if (inExplanations && line.includes(":")) {
    const match = line.match(/^\s*['"`]([^'"`]+)['"`]\s*:/);
    if (match) {
      const key = match[1].toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        cleaned.push(line);
      }
    } else {
      cleaned.push(line);
    }
  } else {
    cleaned.push(line);
  }
}

fs.writeFileSync("lib/detection-info.ts", cleaned.join("\n"));
