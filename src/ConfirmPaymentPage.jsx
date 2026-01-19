import { useLocation, useNavigate } from "react-router-dom";

function ConfirmPaymentPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // fallback values if page opened directly
  const amount = state?.amount || 225;
  const userId = state?.userId || "U29";

  return (
    <div className="page">
      <div className="card">

        <div className="qr-icon">💳</div>

        <h2 className="qr-title">Confirm Payment</h2>
        <p className="subtitle">
          Do you want to pay your share now?
        </p>

        <div className="bill-box">
          <div className="row bold">
            <span>Amount to Pay</span>
            <span>₹{amount}</span>
          </div>
        </div>

        {/* PAY NOW → SUCCESS PAGE */}
        <button
          onClick={() =>
            navigate("/payment-success", {
              state: { amount, userId },
            })
          }
        >
          ✔ Pay Now
        </button>

        {/* NOT NOW → PENDING PAGE */}
        <button
          className="secondary"
          onClick={() =>
            navigate("/payment-pending", {
              state: { amount, userId },
            })
          }
        >
          ✕ Not Now
        </button>

        <p className="info">
          You can pay anytime before the bill closes
        </p>

      </div>
    </div>
  );
}

export default ConfirmPaymentPage;
