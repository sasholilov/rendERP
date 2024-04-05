import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Invoicing from "./pages/Invoicing";
import Purchase from "./pages/Purchase";
import Sale from "./pages/Sale";
import Login from "./pages/Login";
import PageNotFound from "./ui/PageNotFound";
import Suppliers from "./pages/Suppliers";
import Hr from "./pages/Hr";
import Settings from "./pages/Settings";
import Outlets from "./pages/Outlets";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="account" element={<Account />} />
          <Route path="invoicing" element={<Invoicing />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="sale" element={<Sale />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="outlets" element={<Outlets />} />
          <Route path="hr" element={<Hr />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
