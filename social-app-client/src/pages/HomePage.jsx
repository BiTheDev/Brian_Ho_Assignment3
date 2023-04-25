import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [editingContent, setEditingContent] = useState("");
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

  const createPost = async () => {
    try {
      const response = await axios.post(`/api/users/${user._id}/statusUpdates`, {
        content: newPostContent,
      });
      setPosts([
        ...posts,
        { _id: response.data._id, username: user.username, content: newPostContent, timestamp: response.data.timestamp },
      ]);
      setNewPostContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  const updatePost = async (postId) => {
    try {
      await axios.put(`/api/users/${user._id}/statusUpdates/${postId}`, {
        content: editingContent,
      });
      setPosts(posts.map((post) => (post._id === postId ? { ...post, content: editingContent } : post)));
      setEditingPost(null);
      setEditingContent("");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`/api/users/${user._id}/statusUpdates/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <h1>Recent Posts</h1>
      {user && (
        <div>
          <input
            type="text"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Write a new post"
          />
          <button onClick={createPost}>Post</button>
        </div>
      )}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id}>
            <h3>
              <Link to={`/users/${post.userId}`}>{post.username}</Link>
            </h3>
            {editingPost === post._id ? (
              <div>
                <input
                  type="text"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
                <button onClick={() => updatePost(post._id)}>Save</button>
                <button onClick={() => setEditingPost(null)}>Cancel</button>
              </div>
            ) : (
              <p>{post.content}</p>
            )}
            <p>{new Date(post.timestamp).toLocaleString()}</p>
            {user && user.username === post.username && (
              <div>
                {editingPost !== post._id && (
                  <button onClick={() => {
                    setEditingPost(post._id);
                    setEditingContent(post.content);
                  }}>Edit</button>
                )}
                <button onClick={() => deletePost(post._id)}>Delete</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
};

export default HomePage;
