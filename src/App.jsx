import { Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import ScanQRPage from "./ScanQRPage";
import SplitBillPage from "./SplitBillPage";
import BillSplitPreviewPage from "./BillSplitPreviewPage";
import ConfirmPaymentPage from "./ConfirmPaymentPage";
import PaymentPendingPage from "./PaymentPendingPage";
import PaymentSuccessPage from "./PaymentSuccessPage";
import GroupStatusPage from "./GroupStatusPage";
import RestaurantDashboard from "./RestaurantDashboard";
import RestaurantTablesPage from "./RestaurantTablesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/scan" element={<ScanQRPage />} />
      <Route path="/next-page" element={<SplitBillPage />} />
      <Route path="/preview" element={<BillSplitPreviewPage />} />
      <Route path="/payment" element={<ConfirmPaymentPage />} />
      <Route path="/payment-pending" element={<PaymentPendingPage />} />
      <Route path="/payment-success" element={<PaymentSuccessPage />} />
      <Route path="/group-status" element={<GroupStatusPage />} />
       <Route path="/manager-dashboard" element={<RestaurantDashboard />} />
       <Route path="/manager/tables" element={<RestaurantTablesPage />} />
       <Route path="/manager-dashboard/:tableId" element={<RestaurantDashboard />} />
    </Routes>
  );
}

export default App;
