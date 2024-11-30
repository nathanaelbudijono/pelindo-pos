import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./component/route/protected-route";
import RedirectRoute from "./component/route/redirect-route";
import { Toaster } from "./component/ui/toaster";
import IndexPage from "./pages";
import ManageCategory from "./pages/dashboard/manage-items/manage-category";
import ManageItem from "./pages/dashboard/manage-items/manage-items";
import SalesReport from "./pages/dashboard/report/sales-report";
import StockReport from "./pages/dashboard/report/stock-report";
import CreateTransaction from "./pages/dashboard/transaction/create-transaction";
import SignUpPage from "./pages/sign-up";

function App() {
  return (
    <main className="App">
      <Routes>
        <Route
          path="/"
          element={
            <RedirectRoute>
              <IndexPage />
            </RedirectRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <RedirectRoute>
              <SignUpPage />
            </RedirectRoute>
          }
        />
        <Route
          path="/dashboard/salesreport"
          element={
            <ProtectedRoute>
              <SalesReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/stockreport"
          element={
            <ProtectedRoute>
              <StockReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/managecategory"
          element={
            <ProtectedRoute>
              <ManageCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/manageitem"
          element={
            <ProtectedRoute>
              <ManageItem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/createtransaction"
          element={
            <ProtectedRoute>
              <CreateTransaction />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
