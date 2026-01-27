import { useState } from "react";
import { useNavigate } from "react-router-dom";


function SplitBillPage() {
  const navigate = useNavigate();

  const totalBill = 900;
  const [people, setPeople] = useState(4);
  const perPerson = Math.round(totalBill / people);

  const handleConfirm = () => {
    navigate("/preview", {
      state: { totalBill, people, perPerson },
    });
  };

  return (
    <div className="page orange-page">
      <div className="card split-card">
        <div className="qr-icon">👥</div>

        <h2 className="qr-title">How Many People?</h2>
        <p className="subtitle">Select the number of people splitting the bill</p>

        <select
          className="dropdown"
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
        >
          <option value={2}>2 people</option>
          <option value={3}>3 people</option>
          <option value={4}>4 people</option>
          <option value={5}>5 people</option>
        </select>

        <div className="bill-box">
          <div className="row">
            <span>Total Bill</span>
            <span>₹{totalBill}</span>
          </div>

          <div className="row">
            <span>Split Between</span>
            <span>{people} people</span>
          </div>

          <div className="divider"></div>

          <div className="row bold">
            <span>Your Share</span>
            <span>₹{perPerson}</span>
          </div>
        </div>

        <p className="info">Bill will be split equally among all users</p>

        <button onClick={handleConfirm}>Confirm Split</button>
      </div>
    </div>
  );
}

export default SplitBillPage;

