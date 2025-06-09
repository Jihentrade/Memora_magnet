import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import Accueil from "../pages/Accueil";
import Dropzone from "../pages/Dropzone";
import Login from "../pages/Login/login";
import Signup from "../components/SignUp/signup";
import ForgotPassword from "../components/ForgotPassword/forgotPassword";
import ProductPreview from "../components/ProductPreview/productPreview";
import AccueilClient from "../components/AccueilClient/AccueilClient";
import Contactus from "../components/ContactUs/Contactus";
import Expedition from "../components/expedition/expedition";
import Dashboard from "../pages/DashboardAdmin/Dashboard";
import Profile from "../pages/Profile";
import {
  PROFILE_INFO_ROUTE,
  PROFILE_PWD_ROUTE,
  PROFILE_ROUTE,
} from "../constants/routes";
import InformationProfile from "../pages/Profile/InformationProfil";
import Motdepasse from "../pages/Profile/MotdepasseAdmin";
import FridgePreview from "../pages/FridgePreview";
import Cart from "../pages/Cart/PanierPage";
import AvisClient from "../pages/AvisClient/AvisClientsPage";
const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboardAdmin" element={<Dashboard />} />
        <Route path="/fridge-preview" element={<FridgePreview />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/panier" element={<Cart />} />
        <Route path="/avis-clients" element={<AvisClient />} />
        <Route path="/aimants-photo-carrés" element={<Dropzone />} />
        <Route path="/accueil" element={<AccueilClient />} />
        <Route path="/productPreview" element={<ProductPreview />} />
        <Route path="/contactezNous" element={<Contactus />} />
        <Route path="/expedition" element={<Expedition />} />
        <Route path={PROFILE_ROUTE} element={<Profile />}>
          <Route
            path={PROFILE_INFO_ROUTE}
            element={
              <PrivateRoute>
                <InformationProfile />
              </PrivateRoute>
            }
          />
          <Route
            path={PROFILE_PWD_ROUTE}
            element={
              <PrivateRoute>
                <Motdepasse />
              </PrivateRoute>
            }
          />
          <Route
            path={""}
            element={
              <PrivateRoute>
                <InformationProfile />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RouterConfig;
