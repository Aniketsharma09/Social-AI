import { useEffect, useState } from "react";
import API from "../../utils/axiosConfig";

const UserPosts = () => {
  const [userId, setUserId] = useState("");
  const [userposts, setUserposts] = useState([]);

  // Fetch the user ID on mount
  useEffect(() => {
    const getUserId = async () => {
      try {
        const user = await API.get("auth/user");
        setUserId(user.data.user._id);
      } catch (error) {
        console.log("Error while getting user", error);
      }
    };
    getUserId();
  }, []);

  // Fetch posts when userId changes
  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const posts = await API.get("post/userposts", {
          params: { id: userId },
        });
        setUserposts(posts.data.posts);
      } catch (error) {
        console.log("Error while fetching user posts", error);
      }
    };

    if (userId) {
      getUserPosts();
    }
  }, [userId]);

  return (
    <div className="w-full flex gap-3  flex-wrap mt-5">
      {userposts.map((p,idx) => <img key={idx} className="w-[32%] h-[40vh] object-cover object-center rounded-md" src={p.post}/>)}
    </div>
  );
};

export default UserPosts;
