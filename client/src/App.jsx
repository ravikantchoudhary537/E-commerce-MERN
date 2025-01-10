import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/Login";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminFeature from "./pages/admin-view/features";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";
import AdminLayout from "./components/admin-view/layout";
import AuthRegister from "./pages/auth/Register";
import NotFoundPAge from "./pages/not-found";
import ShoppingLayout from "./components/shoping-view/layout";
import ShoppingAccount from "./pages/shoping-view/account";
import ShoppingCheckout from "./pages/shoping-view/checkout";
import ShoppingHome from "./pages/shoping-view/home";
import CheckAuth from "./components/common/check-auth";
import UnAuthPage from "./pages/un-auth";
import ShoppingListing from "./pages/shoping-view/listing";
import { useSelector } from "react-redux";

import { Skeleton } from "./components/ui/skeleton";
import { useCheckAuthQuery } from "./store/authapi";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const { data, error, isLoading: isAuthLoading } = useCheckAuthQuery();

  if (isLoading || isAuthLoading) {
    // console.log("Loading ... in app.js  ");
    <Skeleton className="w-[800] bg-black h-[600px]" />;
  }

  // Handle error state
  // if (error) {
  //   return <div>Error: {error.message || "Failed to authenticate"}</div>;
  // }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              isLoading={isLoading}
            >
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />}></Route>
          <Route path="register" element={<AuthRegister />}></Route>
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              isLoading={isLoading}
            >
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />}></Route>
          <Route path="features" element={<AdminFeature />}></Route>
          <Route path="orders" element={<AdminOrders />}></Route>
          <Route path="products" element={<AdminProducts />}></Route>
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              isLoading={isLoading}
            >
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="account" element={<ShoppingAccount />}></Route>
          <Route path="checkout" element={<ShoppingCheckout />}></Route>
          <Route path="home" element={<ShoppingHome />}></Route>
          <Route path="listing" element={<ShoppingListing />}></Route>
        </Route>
        <Route path="*" element={<NotFoundPAge />}></Route>
        <Route path="/unauth-page" element={<UnAuthPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
