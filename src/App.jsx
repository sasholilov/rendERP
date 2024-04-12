import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Invoicing from "./pages/Invoicing";
import Purchase from "./pages/Purchase";
import Sale from "./pages/Sale";
import Login from "./pages/Login";
import PageNotFound from "./ui/PageNotFound";
import SuppliersPage from "./pages/SuppliersPage";
import Hr from "./pages/Hr";
import Settings from "./pages/Settings";
import Outlets from "./pages/Outlets";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account" element={<Account />} />
            <Route path="invoicing" element={<Invoicing />} />
            <Route path="purchase" element={<Purchase />} />
            <Route path="sale" element={<Sale />} />
            <Route path="suppliers" element={<SuppliersPage />} />
            <Route path="outlets" element={<Outlets />} />
            <Route path="hr" element={<Hr />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-4)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
