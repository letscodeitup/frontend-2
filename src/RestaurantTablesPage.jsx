import { useNavigate } from "react-router-dom";

function RestaurantTablesPage() {
  const navigate = useNavigate();

  const tables = [
    { id: "T-1", status: "Active", guests: 4, total: "₹1200", time: "45 min" },
    { id: "T-2", status: "Pending", guests: 2, total: "₹650", time: "30 min" },
    { id: "T-3", status: "Active", guests: 6, total: "₹2100", time: "1h 15min" },
    { id: "T-4", status: "Active", guests: 3, total: "₹890", time: "25 min" },
    { id: "T-5", status: "Pending", guests: 5, total: "₹1750", time: "55 min" },
    { id: "T-6", status: "Closed", guests: 2, total: "₹480", time: "20 min" },
  ];

  return (
    <div className="page orange-page" style={{ padding: "60px 20px", display: "block" }}>
      {/* HEADER SECTION */}
      <div style={{ maxWidth: "1200px", margin: "0 auto 40px", width: "100%" }}>
        <h1 style={{ color: "#fff", fontSize: "36px", fontWeight: "800", marginBottom: "10px" }}>
          Restaurant Tables
        </h1>
        <p style={{ color: "#9aa6c4", fontSize: "16px" }}>
          Select a table to view payment details and manage bills
        </p>
      </div>

      {/* DASHBOARD SUMMARY CARDS */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: "24px", 
        maxWidth: "1200px", 
        margin: "0 auto 50px", 
        width: "100%" 
      }}>
        {[
          { label: "Total Tables", count: 8, color: "#ffb020" },
          { label: "Active", count: 4, color: "#3cff9a" },
          { label: "Pending", count: 3, color: "#ffb020" }
        ].map((stat, i) => (
          <div key={i} className="bill-box" style={{ textAlign: "center", padding: "30px", margin: 0 }}>
            <h2 style={{ color: stat.color, fontSize: "32px", margin: "0 0 5px 0" }}>{stat.count}</h2>
            <p style={{ color: "#9aa6c4", fontSize: "14px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* WIDE TABLES GRID */}
      <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", // ⬅ Wider minimum width for cards
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {tables.map((table) => (
          <div
            key={table.id}
            className="card"
            style={{
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              textAlign: "left",
              width: "100%", // ⬅ Takes full width of the grid cell
              minHeight: "380px"
            }}
            onClick={() => navigate(`/manager-dashboard/${table.id}`)}
          >
            {/* Card Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
               <div style={{ background: "rgba(255,176,32,0.15)", padding: "12px", borderRadius: "12px" }}>
                  <span style={{ fontSize: "22px" }}>🪑</span>
               </div>
               <span style={{ 
                 background: table.status === "Active" ? "rgba(60,255,154,0.1)" : "rgba(255,176,32,0.1)",
                 color: table.status === "Active" ? "#3cff9a" : "#ffb020",
                 padding: "6px 16px",
                 borderRadius: "20px",
                 fontSize: "13px",
                 fontWeight: "bold",
                 border: `1px solid ${table.status === "Active" ? "rgba(60,255,154,0.2)" : "rgba(255,176,32,0.2)"}`
               }}>
                 {table.status}
               </span>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ color: "#fff", margin: "0", fontSize: "24px", fontWeight: "700" }}>Table {table.id}</h3>
              <p style={{ color: "#6f7da1", fontSize: "14px", margin: "4px 0 0 0" }}>TBL-{table.id.replace('T-', '00')}</p>
            </div>

            {/* Expanded Stats Section */}
            <div style={{ marginBottom: "30px", background: "rgba(255,255,255,0.02)", padding: "20px", borderRadius: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ color: "#9aa6c4" }}>👥 Guests</span>
                <span style={{ color: "#fff", fontWeight: "600" }}>{table.guests} Members</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ color: "#9aa6c4" }}>💰 Total Bill</span>
                <span style={{ color: "#ffb020", fontWeight: "800", fontSize: "18px" }}>{table.total}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#9aa6c4" }}>🕒 Active Time</span>
                <span style={{ color: "#fff" }}>{table.time}</span>
              </div>
            </div>

            <button style={{ 
              padding: "16px", 
              fontSize: "16px", 
              borderRadius: "14px", 
              marginTop: "auto",
              background: "linear-gradient(180deg, #ff7a00, #FF7A00)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)"
            }}>
              View Full Details →
            </button>
          </div>
        ))}
      </div>

      {/* FOOTER ACTION */}
      <div style={{ marginTop: "60px", textAlign: "center", paddingBottom: "40px" }}>
        <button
          className="secondary"
          style={{
            width: "auto",
            padding: "14px 40px",
            borderRadius: "30px",
            fontSize: "15px"
          }}
          onClick={() => navigate("/")}
        >
          ⬅ Logout to User Terminal
        </button>
      </div>
    </div>
  );
}

export default RestaurantTablesPage;