const fs = require("fs");
const path = require("path");

const outPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

if (!outPath) {
  console.error("Missing GOOGLE_APPLICATION_CREDENTIALS");
  process.exit(1);
}

if (!json) {
  console.error("Missing FIREBASE_SERVICE_ACCOUNT_JSON");
  process.exit(1);
}

const dir = path.dirname(outPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(outPath, json, "utf8");
console.log(`Firebase service account written to ${outPath}`);