import { useNavigate } from "react-router-dom";

function RestaurantTablesPage() {
  const navigate = useNavigate();

  const tables = [
    { id: "T-1", status: "Active" },
    { id: "T-2", status: "Pending" },
    { id: "T-3", status: "Active" },
    { id: "T-4", status: "Active" },
  ];

  return (
    <div className="page">

      {/* PAGE TITLE */}
      <h2 style={{ color: "#fff", marginBottom: 24, textAlign: "center" }}>
        Restaurant Tables
      </h2>

      {/* TABLE GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 60, // space for exit button
        }}
      >
        {tables.map((table) => (
          <div
            key={table.id}
            className="card"
            style={{
              cursor: "pointer",
              padding: "22px",
              minHeight: "180px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            onClick={() => navigate(`/manager-dashboard/${table.id}`)}
          >
            <div>
              <h3 style={{ color: "#fff", marginBottom: 6 }}>
                {table.id}
              </h3>
              <p className="subtitle" style={{ fontSize: 13 }}>
                {table.status}
              </p>
            </div>

            <button
              style={{
                padding: "10px",
                fontSize: 14,
              }}
            >
              View Details →
            </button>
          </div>
        ))}
      </div>

      {/* EXIT BUTTON (BOTTOM) */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "14px 40px",
            borderRadius: 30,
            background: "linear-gradient(180deg, #ff4d4d, #e63b3b)",
            color: "#fff",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            fontSize: 15,
          }}
        >
          Back to user login
        </button>
      </div>

    </div>
  );
}

export default RestaurantTablesPage;
