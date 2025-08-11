import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import API from "../utils/axiosConfig";
import { toast } from "react-toastify";
const PostInfor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { postData } = location.state || {};  
  const {register, handleSubmit, reset } = useForm({
    defaultValues : {
      caption : postData?.post?.caption || ''
    }
  });
  const id = postData?.post._id;
  useEffect(()=>{
    if(postData){
      reset({
        caption: postData?.post?.caption || ""
      })
    }
  },[postData, reset]);

  const captionUpdateHandler = async(data) => {
      await API.post('/post/update',{id : id, caption : data.caption});
      toast.success('Post is created successfully');
      navigate('/');
  }

  return (
    <div className="w-full p-5 flex justify-between">
      <div className="left max-h-[70vh] max-w-[65%] rounded-2xl overflow-hidden">
        <img
          className="h-full w-full object-cover object-center"
          src={postData.post.post}
        />
      </div>
      <form onSubmit ={handleSubmit(captionUpdateHandler)} className="right w-[35%] px-5">
        <h1 className="text-2xl text-center font-mono tracking-wide">
          AI Generated Caption
        </h1>
        <textarea {...register('caption')} className="w-full h-60 outline-0 bg-gray-800 p-2 mt-5 text-xl tracking-wider"></textarea>
        <button className="w-full p-3 bg-green-500 mt-2 rounded-md text-xl  tracking-widest">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostInfor;
