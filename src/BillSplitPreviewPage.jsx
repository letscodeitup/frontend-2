import { useLocation, useNavigate } from "react-router-dom";

function BillSplitPreviewPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    totalBill = 900,
    people = 4,
    perPerson = 225,
  } = state || {};

  return (
    <div className="page orange-page">
      <div className="card">

        <div className="qr-icon">💰</div>

        <h2 className="qr-title">Bill Split Preview</h2>
        <p className="subtitle">Review your share before payment</p>

        <div className="bill-box">
          <div className="row">
            <span>Total Bill</span>
            <span>₹{totalBill}</span>
          </div>

          <div className="row">
            <span>Number of People</span>
            <span>{people}</span>
          </div>

          <div className="row bold">
            <span>Your Share</span>
            <span>₹{perPerson}</span>
          </div>
        </div>

        <div className="info">Equal split only</div>

        <div className="bill-box">
          <div className="row">
            <span>You're paying as</span>
            <span>fdfjkfdkj</span>
          </div>

          <div className="row">
            <span>User ID</span>
            <span>U13</span>
          </div>
        </div>

        {/* UPDATED BUTTON */}
        <button
          onClick={() =>
            navigate("/payment", {
              state: { amount: perPerson },
            })
          }
        >
          Continue to Payment →
        </button>

      </div>
    </div>
  );
}

export default BillSplitPreviewPage;
