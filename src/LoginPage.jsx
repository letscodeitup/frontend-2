import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="page login-page">
      {/* ❌ Removed SplitPay header because it is now GLOBAL in AppLayout */}

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
                <select defaultValue="">
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
          </div>

          <button onClick={() => navigate("/splitbill")}>Continue</button>
        </div>

        {/* MANAGER ACCESS CARD */}
        <div className="card">
          <div className="card-content">
            <div className="manager-icon">🛡️</div>
            <h2 className="form-title">Manager Access</h2>
            <p className="subtitle">
              Secure dashboard for restaurant administrative tasks
            </p>

            {/* ✅ kept your badge but removed inline styling (use CSS class instead) */}
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
