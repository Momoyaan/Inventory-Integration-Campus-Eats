import "./App.css";
import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
const Loader = lazy(() => import("./components/Loader"));
const Error = lazy(() => import("./pages/Error"));
const Auth = lazy(() => import("./pages/Auth"));
const ForgotPassword = lazy(() => import("./pages/ForgotPasswordPage"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Inventory = lazy(() => import("./components/Inventory"));
const Settings = lazy(() => import("./components/Settings"));
const Orders = lazy(() => import("./components/Orders"));
import ProtectedRoute from "./auth/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext";
import AdminLayout from "./layout/AdminLayout";
import SellerLayout from "./layout/SellerLayout";
import Profile from "./components/Profile";
import { UserProvider } from "./types/UserTypeContext";
import CustomerLayout from "./layout/CustomerLayout";

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Suspense fallback={<Loader></Loader>}>
        <UserProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/signup" element={<Auth />} />

                {/* Seller Layout */}
                <Route
                  element={
                    <Suspense fallback={<Loader></Loader>}>
                      <ProtectedRoute>
                        <SellerLayout />
                      </ProtectedRoute>
                    </Suspense>
                  }
                >
                  <Route
                    path="/seller/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/seller/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/seller/inventory"
                    element={
                      <ProtectedRoute>
                        <Inventory />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/seller/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/seller/orders"
                    element={
                      <ProtectedRoute>
                        <Orders />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                {/* Customer Layout */}
                <Route
                  element={
                    <Suspense fallback={<Loader></Loader>}>
                      <ProtectedRoute>
                        <CustomerLayout />
                      </ProtectedRoute>
                    </Suspense>
                  }
                >
                  <Route
                    path="/customer/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/customer/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/customer/inventory"
                    element={
                      <ProtectedRoute>
                        <Inventory />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/customer/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/customer/orders"
                    element={
                      <ProtectedRoute>
                        <Orders />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                {/* Admin Layout */}
                <Route
                  element={
                    <Suspense fallback={<Loader></Loader>}>
                      <ProtectedRoute>
                        <AdminLayout />
                      </ProtectedRoute>
                    </Suspense>
                  }
                >
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/inventory"
                    element={
                      <ProtectedRoute>
                        <Inventory />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/orders"
                    element={
                      <ProtectedRoute>
                        <Orders />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                <Route path="*" element={<Error />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </UserProvider>
      </Suspense>
    </>
  );
}

export default App;
