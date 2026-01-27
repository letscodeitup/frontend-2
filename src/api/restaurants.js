// src/api/restaurants.js

// ✅ Change this to your backend URL
// Local example: http://localhost:5000
// Deployed example: https://your-domain.com
const BASE_URL = "http://localhost:3000";

// If your express routes are mounted like: app.use("/restaurants", restaurantRoutes)
// then endpoints become: /restaurants/cities, /restaurants/city/:slug, etc.
const RESTAURANTS_PREFIX = "/restaurants";

async function parseResponse(res) {
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    throw new Error(data?.error || data?.message || "Request failed");
  }
  return data;
}

export async function getCities() {
  const res = await fetch(`${BASE_URL}${RESTAURANTS_PREFIX}/cities`);
  const data = await parseResponse(res);
  // backend: { success:true, cities:[...], total:n }
  return data;
}

export async function getRestaurantsByCity(citySlug, { search = "", minRating = "" } = {}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (minRating) params.set("minRating", minRating);

  const url = `${BASE_URL}${RESTAURANTS_PREFIX}/city/${encodeURIComponent(citySlug)}${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const res = await fetch(url);
  const data = await parseResponse(res);
  // backend: { success:true, city:slug, restaurants:[...], count:n }
  return data;
}

// optional (if later needed)
export async function getRestaurantDetails(restaurantId) {
  const res = await fetch(
    `${BASE_URL}${RESTAURANTS_PREFIX}/${encodeURIComponent(restaurantId)}`
  );
  return parseResponse(res);
}

export async function searchRestaurants({ q = "", city = "", cuisine = "", minRating = "" } = {}) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (city) params.set("city", city);
  if (cuisine) params.set("cuisine", cuisine);
  if (minRating) params.set("minRating", minRating);

  const res = await fetch(
    `${BASE_URL}${RESTAURANTS_PREFIX}/search?${params.toString()}`
  );
  return parseResponse(res);
}
