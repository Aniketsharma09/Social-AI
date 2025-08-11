import { useForm } from "react-hook-form";
import axios from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import UserPosts from "./UserPosts";

const RightSection = ({ setLoading }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = async (data) => {
    const file = data.image?.[0];
    if (!file) {
      alert("Please select an image");
      return;
    }

    setLoading(true); // show overlay
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/post", formData);
      navigate("/create-post", { state: { postData: response.data } });
    } catch (error) {
      console.log("Error while creating post", error);
    }

    reset();
    setLoading(false); // hide overlay
  };

  return (
    <div className="right w-[70%] px-5 relative overflow-y-auto">
      <div className="right-cont w-full h-fit">
        <div className="right-top h-full w-full">
          <form onSubmit={handleSubmit(submitHandler)}>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              {...register("image")}
            />
            <button
              type="submit"
              className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-xl font-bold tracking-widest transition"
            >
              Create Post
            </button>
          </form>
          <h1 className="mt-6 text-center text-3xl font-bold tracking-wider">
            Your Post's
          </h1>
        </div>
        <UserPosts />
      </div>
    </div>
  );
};

export default RightSection;
