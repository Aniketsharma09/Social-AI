import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Home = lazy(() => import("../pages/Home"));
const UserProfile = lazy(() => import("../pages/userProfile/UserProfile"));
const PostInfor = lazy(() => import("../pages/PostInfor"));

const MainRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/create-post" element={<PostInfor />} />
      </Routes>
    </Suspense>
  );
};

export default MainRoutes;
