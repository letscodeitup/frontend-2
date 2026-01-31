import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCities } from "./api/restaurants";

// optional emoji mapping (frontend-only)
const CITY_EMOJI = {
  delhi: "🏛️",
  mumbai: "🌊",
  bangalore: "🏙️",
  pune: "⛰️",
  hyderabad: "🏰",
};

export default function CitySelectPage() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setErr("");

        const data = await getCities();
        // Expecting: { cities: [{ city: "Delhi", city_slug: "delhi" }, ...] }
        if (alive) setCities(data?.cities || []);
      } catch (e) {
        if (alive) setErr(e?.message || "Failed to load cities");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cities;

    // each city object: { city, city_slug }
    return cities.filter((c) => (c?.city || "").toLowerCase().includes(q));
  }, [cities, query]);

  return (
    <div className="page city-page">
      {/* ✅ NO SplitPay here (AppLayout already shows it globally) */}
      <div className="card city-card-shell">
        <p className="app-tagline" style={{ marginTop: 0 }}>
          Select your city
        </p>

        <div className="city-search">
          <span className="city-search-ic">🔎</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for locality, area, city"
            disabled={loading}
          />
        </div>

        <div className="city-divider" />

        {loading && <p className="subtitle">Loading cities...</p>}

        {err && (
          <p className="subtitle" style={{ color: "#b00020" }}>
            {err}
          </p>
        )}

        {!loading && !err && (
          <>
            <h3 className="city-section-title">Popular Cities</h3>

            <div className="city-grid-orange">
              {filtered.map((c) => (
                <button
                  key={c.city_slug}
                  type="button"
                  className="city-tile"
                  onClick={() =>
                    navigate(`/city/${encodeURIComponent(c.city_slug)}`)
                  }
                >
                  <div className="city-tile-icon">
                    {CITY_EMOJI[c.city_slug] || "🏙️"}
                  </div>
                  <div className="city-tile-name">{c.city}</div>
                </button>
              ))}
            </div>

            <div className="city-stats">
              <div>
                <div className="city-stat-num">{cities.length}</div>
                <div className="city-stat-lbl">Cities</div>
              </div>
              <div>
                <div className="city-stat-num">50+</div>
                <div className="city-stat-lbl">Restaurants</div>
              </div>
              <div>
                <div className="city-stat-num">100%</div>
                <div className="city-stat-lbl">Safe Pay</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
