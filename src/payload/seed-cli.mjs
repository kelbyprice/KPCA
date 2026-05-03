// Tiny shim: hits the dev server's /api/seed endpoint with the right shared secret.
// We use this approach (rather than running the seed directly via tsx/payload-run) because
// Node 20.20 + tsx 4 + undici 7 has a CJS/ESM symbol-identity bug that crashes any direct run.
// The dev server's already-warm runtime sidesteps the bug entirely.

const url = process.env.SEED_URL || "http://localhost:3000/api/seed";
const secret = process.env.PAYLOAD_SECRET;

if (!secret) {
  console.error("PAYLOAD_SECRET missing — make sure .env is loaded (this script uses --env-file=.env).");
  process.exit(1);
}

try {
  const res = await fetch(url, {
    method: "POST",
    headers: { "x-seed-secret": secret },
  });
  const body = await res.json();
  console.log(JSON.stringify(body, null, 2));
  process.exit(body.ok ? 0 : 1);
} catch (e) {
  console.error("Seed request failed. Is the dev server running on port 3000?");
  console.error(e);
  process.exit(1);
}
