import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Implement your create, edit, and delete post logic here

  return (
    <div>
      <h1>Recent Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id}>
            <h3>
              <Link to={`/users/${post.username}`}>{post.username}</Link>
            </h3>
            <p>{post.content}</p>
            <p>{new Date(post.timestamp).toLocaleString()}</p>
            {user && user.username === post.username && (
              <div>
                {/* Provide options to edit and delete the post */}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Loading posts...</p>
      )}
      {/* Add a form to create a new post */}
    </div>
  );
};

export default HomePage;
