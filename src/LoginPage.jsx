import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();

  // User inputs
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Flow states
  const [askInitiator, setAskInitiator] = useState(false);
  const [isInitiator, setIsInitiator] = useState(null); // null / true / false

  // Non-initiator dropdown
  const [tableNo, setTableNo] = useState("");

  // Step 1: after name+phone -> show initiator question
  const handleProceed = () => {
    if (!name.trim() || !phone.trim()) {
      alert("Please enter your name and phone number");
      return;
    }
    setAskInitiator(true);
  };

  // If user clicks YES -> directly go splitbill
  const handleYes = () => {
    setIsInitiator(true);
    navigate("/splitbill");
  };

  // If user clicks NO -> show table selection
  const handleNo = () => {
    setIsInitiator(false);
  };

  // Continue for non-initiator
  const handleContinue = () => {
    if (!tableNo) {
      alert("Please select table number");
      return;
    }
    navigate("/scan");
  };

  return (
    <div className="page login-page">
      <div className="login-layout">
        {/* USER LOGIN CARD */}
        <div className="card">
          <div className="card-content">
            <div className="user-icon">👤</div>
            <h2 className="form-title">User Login</h2>
            <p className="subtitle">Split bills effortlessly with friends</p>

            {/* NAME */}
            <div className="form-group">
              <div className="input-wrapper">
                <span className="icon">👤</span>
                <input
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* PHONE */}
            <div className="form-group">
              <div className="input-wrapper">
                <span className="icon">📞</span>
                <input
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* PROCEED BUTTON */}
            {!askInitiator && (
              <button type="button" onClick={handleProceed}>
                Proceed
              </button>
            )}

            {/* INITIATOR QUESTION */}
            {askInitiator && (
              <div style={{ marginTop: "18px" }}>
                <p style={{ fontWeight: "600", marginBottom: "10px" }}>
                  Are you an initiator?
                </p>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="button" onClick={handleYes}>
                    Yes
                  </button>

                  <button type="button" onClick={handleNo}>
                    No
                  </button>
                </div>
              </div>
            )}

            {/* If NO -> show ONLY table dropdown */}
            {isInitiator === false && (
              <div className="form-group" style={{ marginTop: "20px" }}>
                <div className="input-wrapper">
                  <span className="icon">🪑</span>
                  <select
                    value={tableNo}
                    onChange={(e) => setTableNo(e.target.value)}
                  >
                    <option value="" disabled>
                      Select table number
                    </option>
                    <option value="T-1">Table T-1</option>
                    <option value="T-2">Table T-2</option>
                    <option value="T-3">Table T-3</option>
                    <option value="T-3">Table T-4</option>
                    <option value="T-3">Table T-5</option>
                    <option value="T-3">Table T-6</option>
                    <option value="T-3">Table T-7</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Continue only for NON initiator */}
          {isInitiator === false && (
            <button onClick={handleContinue}>Continue</button>
          )}
        </div>

        {/* MANAGER ACCESS CARD */}
        <div className="card">
          <div className="card-content">
            <div className="manager-icon">🛡️</div>
            <h2 className="form-title">Manager Access</h2>
            <p className="subtitle">
              Secure dashboard for restaurant administrative tasks
            </p>

            <div className="security-badge">
              <span className="dot"></span>
              Admin Access Required
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <span className="icon">🔑</span>
                <input type="password" placeholder="Enter manager code" />
              </div>
            </div>
          </div>

          <button onClick={() => navigate("/manager/tables")}>
            Verify Access →
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
