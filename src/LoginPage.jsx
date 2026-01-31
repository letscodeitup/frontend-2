import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();

  // user info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // step control
  const [askInitiator, setAskInitiator] = useState(false);
  const [isInitiator, setIsInitiator] = useState(null); // true/false/null

  // initiator fields
  const [peopleCount, setPeopleCount] = useState("");
  const [restaurantGroup, setRestaurantGroup] = useState("");

  // non-initiator field
  const [tableNo, setTableNo] = useState("");

  // after entering name+phone -> show initiator question
  const handleProceed = () => {
    if (!name.trim() || !phone.trim()) {
      alert("Please enter Name and Phone Number");
      return;
    }
    setAskInitiator(true);
  };

  // Continue button logic
  const handleContinue = () => {
    // If initiator
    if (isInitiator === true) {
      if (!peopleCount || !restaurantGroup) {
        alert("Please select number of people and restaurant group");
        return;
      }

      // navigate initiator flow
      navigate("/splitbill");
    }

    // If NOT initiator
    if (isInitiator === false) {
      if (!tableNo) {
        alert("Please select table number");
        return;
      }

      // directly go scan route
      navigate("/scan");
    }
  };

  return (
    <div className="page login-page">
      <div className="brand-header">
        <h1 className="qr-title">
          Split<span style={{ color: "#ffb020" }}>Pay</span>
        </h1>
      </div>

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

            {/* PROCEED BUTTON (only before initiator question) */}
            {!askInitiator && (
              <button onClick={handleProceed}>Proceed</button>
            )}

            {/* INITIATOR QUESTION */}
            {askInitiator && (
              <div style={{ marginTop: "15px" }}>
                <p style={{ fontWeight: "600", marginBottom: "10px" }}>
                  Are you an initiator?
                </p>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setIsInitiator(true)}
                    style={{
                      background: isInitiator === true ? "#ffb020" : "",
                    }}
                  >
                    Yes
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsInitiator(false)}
                    style={{
                      background: isInitiator === false ? "#ffb020" : "",
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            )}

            {/* IF INITIATOR = YES -> show 2 dropdowns */}
            {isInitiator === true && (
              <>
                {/* SELECT PEOPLE */}
                <div className="form-group" style={{ marginTop: "20px" }}>
                  <div className="input-wrapper">
                    <span className="icon">👥</span>
                    <select
                      value={peopleCount}
                      onChange={(e) => setPeopleCount(e.target.value)}
                    >
                      <option value="" disabled>
                        Select number of people
                      </option>
                      <option value="2">2 people</option>
                      <option value="3">3 people</option>
                      <option value="4">4 people</option>
                      <option value="5">5 people</option>
                      <option value="6">6 people</option>
                      <option value="7">7 people</option>
                      <option value="8">8 people</option>
                    </select>
                  </div>
                </div>

                {/* RESTAURANT GROUP */}
                <div className="form-group">
                  <div className="input-wrapper">
                    <span className="icon">🍽️</span>
                    <select
                      value={restaurantGroup}
                      onChange={(e) => setRestaurantGroup(e.target.value)}
                    >
                      <option value="" disabled>
                        Select restaurant group
                      </option>
                      <option value="T-1">Table T-1</option>
                      <option value="T-2">Table T-2</option>
                      <option value="T-3">Table T-3</option>
                      <option value="T-4">Table T-4</option>
                      <option value="T-5">Table T-5</option>
                      <option value="T-6">Table T-6</option>
                      <option value="T-7">Table T-7</option>
                      <option value="T-8">Table T-2</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* IF INITIATOR = NO -> show ONLY table number */}
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
                      <option value="T-4">Table T-4</option>
                      <option value="T-5">Table T-5</option>
                      <option value="T-6">Table T-6</option>
                      <option value="T-7">Table T-7</option>
                      <option value="T-8">Table T-2</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* CONTINUE button appears only after user chooses yes/no */}
          {isInitiator !== null && (
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

            <div
              className="security-badge"
              style={{
                background: "rgba(96, 165, 250, 0.1)",
                border: "1px solid rgba(96, 165, 250, 0.3)",
                borderRadius: "12px",
                padding: "12px 20px",
                marginBottom: "30px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#008000",
                fontSize: "13px",
              }}
            >
              <span
                className="dot"
                style={{
                  width: "8px",
                  height: "8px",
                  background: "#008000",
                  borderRadius: "50%",
                }}
              ></span>
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
