import { Route, Routes } from "react-router-dom";
import About from "../Pages/About";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Shop from "../Pages/Shop";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import Profile from "../Pages/Profile";
import ProductDetail from "../Pages/ProductDetail";
import Cart from "../Pages/Cart";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="shop" element={<Shop />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="activate/:uid/:token" element={<ActivateAccount />} /> */}
        <Route path="shop/:productId" element={<ProductDetail />} />
      </Route>
      {/* Private Routes  */}
      <Route
      path="dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index  element={<Dashboard />} />
        <Route path="profile"  element={<Profile />} />
        <Route path="cart"  element={<Cart />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
