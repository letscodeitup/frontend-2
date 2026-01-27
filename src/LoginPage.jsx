import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="brand-header">
        <h1 className="qr-title">Split<span style={{ color: "#ffb020" }}>Pay</span></h1>
      </div>

      <div className="login-layout">
        {/* USER LOGIN CARD */}
        <div className="card">
          <div className="card-content">
            <div className="user-icon">👤</div>
            <h2 className="form-title">User Login</h2>
            <p className="subtitle">Split bills effortlessly with friends</p>

            <div className="form-group">
              <div className="input-wrapper">
                <span className="icon">👤</span>
                <input placeholder="Enter your name" />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <span className="icon">📞</span>
                <input placeholder="Enter your phone number" />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <span className="icon">👥</span>
                <select>
                  <option>Select restaurant group</option>
                  <option>Table T-1</option>
                  <option>Table T-2</option>
                </select>
              </div>
            </div>
          </div>
          <button onClick={() => navigate("/scan")}>Continue</button>
        </div>

        {/* MANAGER ACCESS CARD */}
        <div className="card">
          <div className="card-content">
            <div className="manager-icon">🛡️</div>
            <h2 className="form-title">Manager Access</h2>
            <p className="subtitle">Secure dashboard for restaurant administrative tasks</p>

            {/* Added Extra Content to fill space */}
            <div className="security-badge" style={{
              background: "rgba(96, 165, 250, 0.1)",
              border: "1px solid rgba(96, 165, 250, 0.3)",
              borderRadius: "12px",
              padding: "12px 20px",
              marginBottom: "30px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#60a5fa",
              fontSize: "13px"
            }}>
              <span className="dot" style={{ width: "8px", height: "8px", background: "#60a5fa", borderRadius: "50%" }}></span>
              System Secured: End-to-End Encryption Active
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