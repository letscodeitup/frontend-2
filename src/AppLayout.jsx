// AppLayout.jsx
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="app-shell">
      <div className="app-brand-outside">
        <h1 className="app-brand">
          Split<span>Pay</span>
        </h1>
      </div>

      <Outlet />
    </div>
  );
}
