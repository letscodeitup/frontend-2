const BASE_URL = "https://YOUR-GITLAB-BACKEND-URL";

export async function login(phone) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone })
  });

  return res.json();
}
