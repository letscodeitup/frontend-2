import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRestaurantsByCity } from "./api/restaurants";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=60";

export default function CityRestaurantsPage() {
  const navigate = useNavigate();
  const { cityName } = useParams(); // this is citySlug now
  const citySlug = decodeURIComponent(cityName || "");

  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState("");

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await getRestaurantsByCity(citySlug, {
          search: query,
          minRating,
        });
        if (alive) setRestaurants(data.restaurants || []);
      } catch (e) {
        if (alive) setErr(e.message || "Failed to load restaurants");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [citySlug, query, minRating]);

  const filtered = useMemo(() => restaurants, [restaurants]);

  return (
    <div className="page city-page">
      <div className="card city-card-shell">
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            type="button"
            className="secondary"
            style={{ width: 54, padding: 12 }}
            onClick={() => navigate("/")}
          >
            ←
          </button>

          <div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>
              Restaurants in {citySlug}
            </div>
            {!loading && !err && (
              <div style={{ color: "#666", fontSize: 12 }}>
                {restaurants.length} restaurants
              </div>
            )}
          </div>
        </div>

        <div className="city-search" style={{ marginTop: 14 }}>
          <span className="city-search-ic">🔎</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search restaurants, cuisines..."
          />
        </div>

        {/* optional min rating */}
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <select
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            style={{
              width: 200,
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid #e1e1e1",
            }}
          >
            <option value="">Min Rating</option>
            <option value="4">4+</option>
            <option value="4.5">4.5+</option>
          </select>
        </div>

        <div className="city-divider" />

        {loading && <p className="subtitle">Loading restaurants...</p>}

        {err && (
          <p className="subtitle" style={{ color: "#b00020" }}>
            {err}
          </p>
        )}

        {!loading && !err && (
          <div className="rest-grid">
            {filtered.map((r) => (
              <button
                key={r.slug || r.name}
                type="button"
                className="rest-card-ui"
                onClick={() => navigate("/login")}
              >
                <div className="rest-img-ui">
                  <img
                    src={r.image_url?.trim() ? r.image_url : FALLBACK_IMG}
                    alt={r.name}
                  />
                  <div className="offer-badge-ui">20% Off + 15% Off</div>
                  <div className="rating-badge-ui">★ {r.rating ?? "—"}</div>
                </div>

                <div className="rest-info-ui">
                  <div className="rest-name-ui">{r.name}</div>
                  <div className="rest-area-ui">{r.location}</div>
                  <div className="rest-cuisine-ui">{r.cuisine}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {!loading && !err && filtered.length === 0 && (
          <p className="subtitle" style={{ marginTop: 18 }}>
            No restaurants found.
          </p>
        )}
      </div>
    </div>
  );
}
