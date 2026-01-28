import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api"; // adjust if needed

export default function ScanQRPage() {
  const navigate = useNavigate();

  const [groupCode, setGroupCode] = useState("");
  const [totalBill, setTotalBill] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!groupCode || groupCode.trim().length < 3) {
      alert("Enter a valid group code");
      return;
    }

    if (!totalBill || Number(totalBill) <= 0) {
      alert("Enter a valid bill amount");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/bill/create", {
        groupCode: groupCode.trim(),
        totalAmount: Number(totalBill),
      });

      const data = res?.data?.data ?? res?.data;
      const { billId, qr } = data || {};

      if (!billId) {
        throw new Error("billId missing from API response");
      }

      const payload = {
        billId,
        groupCode: groupCode.trim(),
        totalBill: Number(totalBill),
        qr,
      };

      // backup for refresh
      localStorage.setItem("billPreview", JSON.stringify(payload));

      // go to preview / QR page
      navigate("/scan", { state: payload });
    } catch (err) {
      console.error(err);
      alert(err?.message || "Failed to create bill. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page scanbill-page">
      <div className="card split-card">
        <div className="qr-icon">👥</div>

        <h2 className="qr-title">Scan & Create Bill</h2>
        <p className="subtitle">Enter details to generate QR</p>

        <input
          className="input"
          placeholder="Enter group code (e.g. trip-goa)"
          value={groupCode}
          onChange={(e) => setGroupCode(e.target.value)}
        />

        <input
          className="input"
          type="number"
          placeholder="Enter total bill amount"
          value={totalBill}
          onChange={(e) => setTotalBill(e.target.value)}
        />

        <div className="bill-box">
          <div className="row bold">
            <span>Total Bill</span>
            <span>₹{totalBill || 0}</span>
          </div>
        </div>

        <button className="confirm" onClick={handleGenerate} disabled={loading}>
          {loading ? "Creating Bill..." : "Generate QR"}
        </button>
      </div>
    </div>
  );
}
