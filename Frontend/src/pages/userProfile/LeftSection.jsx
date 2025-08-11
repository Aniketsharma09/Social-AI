import { toast } from "react-toastify";
import API from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

const LeftSection = ({ userName }) => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      // Call the logout endpoint
      const response = await API.post("auth/logout"); // use POST if backend expects it
      toast.success(response.data.message);

      // If you're storing token in localStorage, clear it
      localStorage.removeItem("token");

      // Redirect after short delay so toast can show
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err); // log full error for debugging
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="left w-[25%] flex flex-col gap-6 mt-10">
      <div className="w-full h-fit flex flex-col items-center justify-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="userProfile"
          className="w-[50%] rounded-full object-cover object-center"
        />
        <h1 className="text-2xl tracking-widest">{userName}</h1>
        <button
          onClick={logoutHandler}
          className="px-3 py-1 w-fit bg-red-400 rounded-md text-md tracking-widest hover:scale-[.98] active:scale-[.95]"
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LeftSection;
