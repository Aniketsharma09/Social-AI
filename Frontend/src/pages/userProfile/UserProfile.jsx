import { toast } from "react-toastify";
import API from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Spinner from "../Spinner";

const UserProfile = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false); // moved loading here
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await API.get("auth/user");
        toast.success(response.data.message);
        setUserName(response.data.user.username);
      } catch (err) {
        toast.error(err.response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    };
    getUserData();
  }, [navigate]);

  return (
    <>
      {userName ? (
        <div className="userProfile w-full h-[95vh] relative">
          <div className="userInfo w-full flex p-5 h-full">
            <LeftSection userName={userName} />
            {/* Pass loading control to RightSection */}
            <RightSection setLoading={setLoading} />
          </div>

          {/* Loading Overlay (moved from RightSection) */}
          <div
            className={`post-container absolute top-0 left-0 w-[100vw] h-[90vh] 
              ${loading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
              backdrop-blur-sm transition-opacity duration-300 flex flex-col items-center justify-center gap-5`}
          >
            <Spinner />
            <h1 className="text-xl tracking-wider text-white">
              Generating Caption with AI...
            </h1>
          </div>
        </div>
      ) : (
        "loading..."
      )}
    </>
  );
};

export default UserProfile;
