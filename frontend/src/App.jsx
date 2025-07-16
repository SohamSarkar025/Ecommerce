import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Regiser from "./pages/Regiser";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import CheckOut from "./components/Cart/CheckOut";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";

const App = () => {
  return (
    //Each router handled in the server rather than the server
    //faster in comparison for multipage application
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* User layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Regiser />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections/:collections" element={<CollectionPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route
            path="order-confirmation"
            element={<OrderConfirmationPage />}
          />
          <Route path="order/:id" element={<OrderDetailsPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
        </Route>
        {/* Admin layout with nested routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
          {/* future: <Route path="users" element={<AdminUsers />} /> etc */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
