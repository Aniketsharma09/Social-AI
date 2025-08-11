import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import API from "../utils/axiosConfig";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = async (data) => {
    try {
      const response = await API.post('/auth/login', data);
      toast.success(response.data.message);
      reset();
      setTimeout(()=>{
        navigate('/user-profile')
      },1500);
    } catch (err) {
     toast.error(err.response.data.message);
    }
  };

  return (
    <div className="w-full h-[90vh] m-auto flex items-center justify-center">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full max-w-[30rem] p-10 rounded-xl bg-gray-900 flex flex-col gap-6"
      >
        <h1 className="text-3xl tracking-wider text-white text-center mb-1">
          Login
        </h1>
        <input
          {...register("username")}
          placeholder="username"
          className="py-3 px-5 border rounded-md outline-0 bg-transparent"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="py-3 px-5 border rounded-md outline-0 bg-transparent"
        />
        <button className="bg-blue-500 text-xl tracking-wider text-white py-2 px-4 rounded hover:bg-blue-600 active:scale-[.99]">
          Login
        </button>
        <button type="button" onClick={() => navigate("/register")}>
          Don't have an account{" "}
          <span className="text-blue-500 hover:scale-[1.1] active:scale-[.98] cursor-pointer ">
            Click here{" "}
          </span>
        </button>
      </form>
    </div>
  );
};

export default Login;
