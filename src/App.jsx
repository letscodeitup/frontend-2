import { Routes, Route } from "react-router-dom";

import CitySelectPage from "./CitySelectPage";
import CityRestaurantsPage from "./CityRestaurantsPage";
import LoginPage from "./LoginPage";
import SplitBillPage from "./SplitBillPage"
import ScanQRPage from "./ScanQRPage";
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
      {/* NEW FLOW */}
      <Route path="/" element={<CitySelectPage />} />
      <Route path="/city/:cityName" element={<CityRestaurantsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/splitbill" element={<SplitBillPage />} />

      {/* BILL FLOW */}
      <Route path="/scan" element={<ScanQRPage />} />
      <Route path="/preview" element={<BillSplitPreviewPage />} />
      <Route path="/payment" element={<ConfirmPaymentPage />} />
      <Route path="/payment-pending" element={<PaymentPendingPage />} />
      <Route path="/payment-success" element={<PaymentSuccessPage />} />
      <Route path="/group-status" element={<GroupStatusPage />} />

      {/* MANAGER */}
      <Route path="/manager-dashboard" element={<RestaurantDashboard />} />
      <Route path="/manager/tables" element={<RestaurantTablesPage />} />
      <Route
        path="/manager-dashboard/:tableId"
        element={<RestaurantDashboard />}
      />
    </Routes>
  );
}

export default App;
