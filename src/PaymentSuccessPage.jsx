import { useLocation, useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const amount = state?.amount || 225;
  const userId = state?.userId || "U49";

  return (
    <div className="page orange-page">
      <div className="card">

        <div className="qr-icon">✅</div>

        <h2 className="qr-title">Payment Successful!</h2>
        <p className="subtitle">
          Thanks! Your payment has been processed.
        </p>

        <div className="info" style={{ color: "#2ecc71", fontWeight: 700 }}>
          ● PAID
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

export default PaymentSuccessPage;
