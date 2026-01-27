import { useNavigate, useParams } from "react-router-dom";

function RestaurantDashboard() {
  const navigate = useNavigate();
  const { tableId } = useParams(); // 👈 get table number from URL

  return (
    <div className="page">
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
              <h2 style={{ color: "#fff", margin: 0 }}>
                Restaurant Dashboard
              </h2>
              <p className="subtitle" style={{ margin: "4px 0 0" }}>
                Table Management View
              </p>
            </div>
          </div>

          <span
            style={{
              background: "rgba(0,200,100,0.15)",
              color: "#3cff9a",
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            ● Manager
          </span>
        </div>

        {/* SUMMARY CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            marginBottom: 32,
          }}
        >
          <SummaryBox
            title="Table"
            value={tableId || "N/A"}   // 👈 dynamic table
            icon="🍽️"
          />
          <SummaryBox title="Total Bill" value="₹900" icon="💰" />
          <SummaryBox title="Collected" value="₹225" icon="✅" green />
          <SummaryBox title="Pending" value="₹675" icon="❌" red />
        </div>

        {/* PAYMENTS TABLE */}
        <div className="bill-box">
          <h3 style={{ color: "#fff", marginBottom: 16 }}>
            Customer Payments
          </h3>

          <div className="row" style={{ fontWeight: 600 }}>
            <span>User ID</span>
            <span>Name</span>
            <span>Phone</span>
            <span>Amount</span>
            <span>Status</span>
          </div>

          <PaymentRow
            id="U01"
            name="Rahul"
            phone="98XXXX1234"
            amount="₹225"
            status="Unpaid"
          />
          <PaymentRow
            id="U02"
            name="Priya"
            phone="98XXXX5678"
            amount="₹225"
            status="Unpaid"
          />
          <PaymentRow
            id="U03"
            name="Amit"
            phone="98XXXX4321"
            amount="₹225"
            status="Unpaid"
          />
          <PaymentRow
            id="U26"
            name="Jhih,hj"
            phone="87XXXX7965"
            amount="₹225"
            status="Paid"
          />
        </div>

        {/* ACTION BUTTON */}
        <div>
          <button
            className="secondary"
            onClick={() => navigate("/manager/tables")}
          >
            ← Back to Tables
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== Helper Components ===== */

function SummaryBox({ title, value, icon, green, red }) {
  const color = green ? "#3cff9a" : red ? "#ff6b6b" : "#ffb020";

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #0f1f3d, #0b1730)",
        borderRadius: 20,
        padding: 22,
        textAlign: "center",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ fontSize: 22, marginBottom: 6, color }}>{icon}</div>
      <p style={{ margin: 0, color: "#9aa6c4", fontSize: 13 }}>{title}</p>
      <h3 style={{ margin: "6px 0 0", color: "#fff" }}>{value}</h3>
    </div>
  );
}

function PaymentRow({ id, name, phone, amount, status }) {
  const paid = status === "Paid";

  return (
    <div className="row">
      <span>{id}</span>
      <span>{name}</span>
      <span>{phone}</span>
      <span>{amount}</span>
      <span
        style={{
          padding: "4px 12px",
          borderRadius: 20,
          fontSize: 13,
          background: paid
            ? "rgba(0,200,100,0.15)"
            : "rgba(255,80,80,0.15)",
          color: paid ? "#3cff9a" : "#ff6b6b",
          fontWeight: 600,
        }}
      >
        {paid ? "✔ Paid" : "✖ Unpaid"}
      </span>
    </div>
  );
}

export default RestaurantDashboard;
