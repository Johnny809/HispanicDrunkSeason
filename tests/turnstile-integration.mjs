import assert from "node:assert/strict";
import { spawn } from "node:child_process";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, timeoutMs = 45000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await sleep(500);
  }
  throw new Error("Timed out waiting for dev server");
}

async function main() {
  const server = spawn("npm", ["run", "dev", "--", "--port", "3210"], {
    stdio: "ignore",
    detached: true,
    env: { ...process.env }
  });

  try {
    await waitForServer("http://127.0.0.1:3210/login");

    const signup = await fetch("http://127.0.0.1:3210/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "a@b.com", password: "password123", confirmPassword: "password123" })
    });
    assert.equal(signup.status, 400, "Expected /api/signup without captcha to return 400");

    const login = await fetch("http://127.0.0.1:3210/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "a@b.com", password: "password123" })
    });
    assert.equal(login.status, 400, "Expected /api/login without captcha to return 400");

    console.log("Turnstile integration assertions passed.");
  } finally {
    try {
      process.kill(-server.pid, "SIGTERM");
    } catch {}
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
