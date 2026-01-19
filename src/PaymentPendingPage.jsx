import { useLocation, useNavigate } from "react-router-dom";

function PaymentPendingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const amount = state?.amount || 225;
  const userId = state?.userId || "U29";

  return (
    <div className="page">
      <div className="card">

        <div className="qr-icon">⏳</div>

        <h2 className="qr-title">Payment Pending</h2>
        <p className="subtitle">
          You can pay anytime before the bill closes.
        </p>

        <div className="info" style={{ color: "#ff5c5c", fontWeight: 700 }}>
          ● UNPAID
        </div>

        <div className="bill-box">
          <div className="row">
            <span>Amount</span>
            <span>₹{amount}</span>
          </div>

          <div className="row">
            <span>User ID</span>
            <span>{userId}</span>
          </div>
        </div>

        <button onClick={() => navigate("/group-status")}>
  View Group Status →
</button>

      </div>
    </div>
  );
}

export default PaymentPendingPage;
