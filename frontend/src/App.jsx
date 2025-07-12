import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Regiser from "./pages/Regiser";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";

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
        </Route>
        <Route>{/* Admin layout */}</Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
