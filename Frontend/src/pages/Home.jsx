import { useEffect, useState } from "react";
import API from "../utils/axiosConfig";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [users, setUsers] = useState({});

  // First useEffect: Fetch posts
  useEffect(() => {
    const getPost = async () => {
      const posts = await API.get("post/get");
      setAllPosts([...posts.data.posts].reverse());
    };
    getPost();
  }, []);

  // Second useEffect: Fetch users when posts change
  useEffect(() => {
    if (allPosts.length > 0) {
      const fetchUsers = async () => {
        const uniqueUserIds = [...new Set(allPosts.map(p => p.user))];
        const userData = {};
        
        for (const id of uniqueUserIds) {
          try {
            const res = await API.post("auth/user",{id : id}); // Fixed endpoint
            userData[id] = res?.data?.user?.username;
          } catch (error) {
            console.error(`Error fetching user ${id}:`, error);
            userData[id] = "Unknown User";
          }
        }
        setUsers(userData);
      };
      
      fetchUsers();
    }
  }, [allPosts]); // Dependency on allPosts

  const renderPosts = allPosts?.map((p, idx) => (
    <div className="w-[65%] h-fit p-5 bg-gray-800 rounded-3xl" key={idx}>
      <img
        className="rounded-3xl w-full h-[60vh] object-cover object-[50%_20%]"
        src={p.post}
        alt="Post"
      />
      <h2 className="mt-2 text-xl">{p.caption}</h2>
      <div className="flex h-[7vh] mt-4 items-center gap-5">
        <img 
          className="h-full w-14 rounded-full object-cover object-center" 
          src="https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="User avatar"
        />
        <h3 className="text-2xl tracking-widest">{users[p.user] || "Loading..."}</h3>
      </div>
    </div>
  ));

  return (
    <>
      {allPosts.length ? (
        <div className="w-full h-fit p-5 flex flex-col gap-5 items-center justify-center">
          {renderPosts}
        </div>
      ) : (
        <h1 className="text-center text-2xl mt-10">Nothing to show</h1>
      )}
    </>
  );
};

export default Home;
