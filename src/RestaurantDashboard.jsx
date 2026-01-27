import { useNavigate, useParams } from "react-router-dom";

function RestaurantDashboard() {
  const navigate = useNavigate();
  const { tableId } = useParams();

  return (
    <div className="page orange-page">
      <div className="card group-card">
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div className="qr-icon">🏬</div>
            <div>
              <h2 style={{ color: "#111", margin: 0 }}>Restaurant Dashboard</h2>
              <p style={{ margin: "4px 0 0", color: "#666", fontSize: 14 }}>
                Table Management View
              </p>
            </div>
          </div>

          <span
            style={{
              background: "#e7fff1",
              color: "#22c55e",
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 700,
              border: "1px solid rgba(34,197,94,0.25)",
            }}
          >
            ● Manager
          </span>
        </div>

        {/* SUMMARY CARDS (NOW ORANGE, NOT BLUE) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            marginBottom: 32,
          }}
        >
          <SummaryBox title="Table" value={tableId || "N/A"} icon="🍽️" />
          <SummaryBox title="Total Bill" value="₹900" icon="💰" />
          <SummaryBox title="Collected" value="₹225" icon="✅" green />
          <SummaryBox title="Pending" value="₹675" icon="❌" red />
        </div>

        {/* PAYMENTS TABLE */}
        <div
          className="bill-box"
          style={{
            background: "#fff3e8",
            border: "1px solid #ffb680",
            boxShadow: "0 10px 24px rgba(255,122,0,0.12)",
          }}
        >
          <h3 style={{ color: "#111", marginBottom: 16 }}>Customer Payments</h3>

          <div
            className="row"
            style={{
              fontWeight: 800,
              paddingBottom: 10,
              borderBottom: "1px solid rgba(255,122,0,0.25)",
            }}
          >
            <span style={{ color: "#b86200" }}>User ID</span>
            <span style={{ color: "#111" }}>Name</span>
            <span style={{ color: "#111" }}>Phone</span>
            <span style={{ color: "#111" }}>Amount</span>
            <span style={{ color: "#111" }}>Status</span>
          </div>

          <PaymentRow id="U01" name="Rahul" phone="98XXXX1234" amount="₹225" status="Unpaid" />
          <PaymentRow id="U02" name="Priya" phone="98XXXX5678" amount="₹225" status="Unpaid" />
          <PaymentRow id="U03" name="Amit" phone="98XXXX4321" amount="₹225" status="Unpaid" />
          <PaymentRow id="U26" name="Jhih,hj" phone="87XXXX7965" amount="₹225" status="Paid" />
        </div>

        {/* ACTION BUTTON */}
        <div style={{ marginTop: 26 }}>
          <button className="secondary" onClick={() => navigate("/manager/tables")}>
            ← Back to Tables
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== Helper Components ===== */

function SummaryBox({ title, value, icon, green, red }) {
  // ORANGE by default (no blue)
  const bg = green
    ? "linear-gradient(180deg, #22c55e, #16a34a)"
    : red
    ? "linear-gradient(180deg, #ff4d4d, #e11d48)"
    : "linear-gradient(180deg, #ff7a00, #e86e00)";

  return (
    <div
      style={{
        background: bg,
        borderRadius: 20,
        padding: 22,
        textAlign: "center",
        color: "#fff",
        boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
      <p style={{ margin: 0, color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 700 }}>
        {title}
      </p>
      <h3 style={{ margin: "8px 0 0", color: "#fff", fontSize: 22, fontWeight: 900 }}>
        {value}
      </h3>
    </div>
  );
}

function PaymentRow({ id, name, phone, amount, status }) {
  const paid = status === "Paid";

  return (
    <div className="row" style={{ padding: "12px 0" }}>
      <span style={{ color: "#b86200" }}>{id}</span>
      <span style={{ color: "#111" }}>{name}</span>
      <span style={{ color: "#111" }}>{phone}</span>
      <span style={{ color: "#111" }}>{amount}</span>

      <span
        style={{
          padding: "6px 12px",
          borderRadius: 20,
          fontSize: 13,
          background: paid ? "#e7fff1" : "#ffe8e8",
          color: paid ? "#22c55e" : "#ff4d4d",
          fontWeight: 800,
          border: `1px solid ${paid ? "rgba(34,197,94,0.25)" : "rgba(255,77,77,0.25)"}`,
          width: "fit-content",
          justifySelf: "end",
        }}
      >
        {paid ? "✔ Paid" : "✖ Unpaid"}
      </span>
    </div>
  );
}

export default RestaurantDashboard;
