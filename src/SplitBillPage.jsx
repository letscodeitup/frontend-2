import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api"; // adjust if needed

export default function ScanQRPage() {
  const navigate = useNavigate();

  // ✅ Backend requires these (groupCode is SERVER-generated)
  const [restaurantId, setRestaurantId] = useState("");
  const [tableNo, setTableNo] = useState("");
  const [totalBill, setTotalBill] = useState("");
  const [people, setPeople] = useState(2);

  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    // ✅ validate required fields
    if (!restaurantId || String(restaurantId).trim().length === 0) {
      alert("Enter restaurantId");
      return;
    }

    if (!tableNo || tableNo.trim().length === 0) {
      alert("Enter a valid table number");
      return;
    }

    if (!totalBill || Number(totalBill) <= 0) {
      alert("Enter a valid bill amount");
      return;
    }

    if (Number(people) < 2) {
      alert("At least 2 people are required");
      return;
    }

    try {
      setLoading(true);

      // ✅ send exactly what backend expects
      const res = await api.post("/bill/create", {
        restaurantId, // keep as string if UUID; if int use: Number(restaurantId)
        tableNo: tableNo.trim(),
        totalAmount: Number(totalBill),
        numberOfUsers: Number(people),
      });

      // supports both: res.data or res.data.data
      const data = res?.data?.data ?? res?.data;
      const { billId, groupCode, splitAmount, qr } = data || {};

      if (!billId) throw new Error("billId missing from API response");

      const payload = {
        billId,
        restaurantId,
        tableNo: tableNo.trim(),
        groupCode, // ✅ from backend
        totalBill: Number(totalBill),
        people: Number(people),
        splitAmount,
        qr,
      };

      localStorage.setItem("billPreview", JSON.stringify(payload));

      // ✅ go to PREVIEW page (your App.jsx has /preview route)
      navigate("/preview", { state: payload });
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to create bill. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page scanbill-page">
      <div className="card split-card">
        <div className="qr-icon">🍽️</div>

        <h2 className="qr-title">Create Table Bill</h2>
        <p className="subtitle">Enter details to generate QR</p>

        <input
          className="input"
          placeholder="Restaurant ID (e.g. 1 or UUID)"
          value={restaurantId}
          onChange={(e) => setRestaurantId(e.target.value)}
        />

        <input
          className="input"
          placeholder="Table No (e.g. T12)"
          value={tableNo}
          onChange={(e) => setTableNo(e.target.value)}
        />

        <input
          className="input"
          type="number"
          placeholder="Enter total bill amount"
          value={totalBill}
          onChange={(e) => setTotalBill(e.target.value)}
        />

        <select
          className="dropdown"
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
        >
          {[2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} people
            </option>
          ))}
        </select>

        <div className="bill-box">
          <div className="row">
            <span>Total Bill</span>
            <span>₹{totalBill || 0}</span>
          </div>
          <div className="row">
            <span>People</span>
            <span>{people}</span>
          </div>
        </div>

        <button className="confirm" onClick={handleGenerate} disabled={loading}>
          {loading ? "Creating Bill..." : "Generate QR"}
        </button>
      </div>
    </div>
  );
}
