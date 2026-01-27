import { useNavigate } from "react-router-dom";

function GroupStatusPage() {
  const navigate = useNavigate();

  const users = [
    {
      id: "U01",
      phone: "98XXXX1234",
      amount: 225,
      status: "unpaid",
    },
    {
      id: "U02",
      phone: "98XXXX5678",
      amount: 225,
      status: "unpaid",
    },
    {
      id: "U03",
      phone: "98XXXX4321",
      amount: 225,
      status: "unpaid",
    },
    {
      id: "U49",
      phone: "65XXXX5657",
      amount: 225,
      status: "paid",
      you: true,
    },
  ];

  const paidCount = users.filter((u) => u.status === "paid").length;
  const totalAmount = users.reduce((sum, u) => sum + u.amount, 0);
  const collectedAmount = users
    .filter((u) => u.status === "paid")
    .reduce((sum, u) => sum + u.amount, 0);
  const pendingAmount = totalAmount - collectedAmount;

  return (
    <div className="page orange-page">
      <div className="card group-card">

        <div className="qr-icon">👥</div>

        <h2 className="qr-title">Group Payment Status</h2>
        <p className="subtitle">Table T-9</p>

        {/* Summary */}
        <div className="bill-box" style={{ display: "flex", gap: 16 }}>
          <div className="bill-box" style={{ flex: 1 }}>
            <p className="subtitle">Collected</p>
            <h3 style={{ color: "#2ecc71" }}>₹{collectedAmount}</h3>
          </div>

          <div className="bill-box" style={{ flex: 1 }}>
            <p className="subtitle">Pending</p>
            <h3 style={{ color: "#ffb020" }}>₹{pendingAmount}</h3>
          </div>
        </div>

        {/* Table */}
        <div className="bill-box">
          <div className="row" style={{ fontWeight: 700 }}>
            <span>User ID</span>
            <span>Phone</span>
            <span>Amount</span>
            <span>Status</span>
          </div>

          {users.map((user) => (
            <div
              key={user.id}
              className="row"
              style={{
                background: user.you
                  ? "rgba(255,176,32,0.08)"
                  : "transparent",
                borderRadius: 10,
                padding: "10px 0",
              }}
            >
              <span>
                {user.id}{" "}
                {user.you && (
                  <span style={{ color: "#ffb020" }}>(You)</span>
                )}
              </span>
              <span>{user.phone}</span>
              <span>₹{user.amount}</span>
              <span
                style={{
                  color:
                    user.status === "paid" ? "#2ecc71" : "#ff5c5c",
                  fontWeight: 700,
                }}
              >
                {user.status === "paid" ? "✔ Paid" : "✖ Unpaid"}
              </span>
            </div>
          ))}
        </div>

        {/* Progress */}
        <p className="subtitle" style={{ textAlign: "right" }}>
          {paidCount}/{users.length} paid
        </p>

        <div
          style={{
            height: 8,
            background: "#1a2547",
            borderRadius: 10,
            overflow: "hidden",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: `${(paidCount / users.length) * 100}%`,
              height: "100%",
              background: "linear-gradient(90deg, #2ecc71, #ffb020)",
            }}
          />
        </div>

        {/* Back Button */}
        <button
          className="secondary"
          onClick={() => navigate("/")}
        >
          ← Back to Customer View
        </button>

      </div>
    </div>
  );
}

export default GroupStatusPage;
