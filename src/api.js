// src/api.js

const BASE_URL = "https://localhost:3000";

/**
 * Small helper so every request has same error handling
 */
async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  // if backend returns non-JSON sometimes, this prevents crash
  let data = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const message =
      (data && data.message) ||
      (typeof data === "string" ? data : null) ||
      `Request failed: ${res.status}`;
    throw new Error(message);
  }

  return data;
}

/**
 * Login (your existing API)
 */
export async function login(phone) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ phone }),
  });
}

/**
 * Fetch cities + restaurants JSON (the big object you shared)
 * ⚠️ Change "/restaurants" if your endpoint is different.
 */
export async function getRestaurantData() {
  return request("/restaurants", { method: "GET" });
}

export default {
  login,
  getRestaurantData,
};
