import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

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
        const posts = Array.from(response.data);
        const sortedPosts = posts.data.sort((a, b) => {
          if (a.timestamp && b.timestamp) {
            return new Date(b.timestamp) - new Date(a.timestamp);
          }
          return 0;
        });
        setPosts(sortedPosts);
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
    <Container maxWidth="sm">
      <Box textAlign="center" marginBottom={4}>
        <Typography variant="h4">Recent Posts</Typography>
        {user && (
          <Box marginTop={2}>
            <TextField
              fullWidth
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Write a new post"
              variant="outlined"
            />
            <Button
              fullWidth
              onClick={createPost}
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              Post
            </Button>
          </Box>
        )}
      </Box>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post._id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">
                <Link to={`/users/${post.userId}`}>{post.username}</Link>
              </Typography>
              {editingPost === post._id ? (
                <TextField
                  fullWidth
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
              ) : (
                <Typography>{post.content}</Typography>
              )}
              <Typography variant="subtitle2" color="text.secondary">
                {new Date(post.timestamp).toLocaleString()}
              </Typography>
            </CardContent>
            {user && user.username === post.username && (
              <CardActions>
                {editingPost !== post._id ? (
                  <Button
                    onClick={() => {
                      setEditingPost(post._id);
                      setEditingContent(post.content);
                    }}
                    color="primary"
                  >
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => updatePost(post._id)}
                      color="primary"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditingPost(null)}
                      color="secondary"
                    >
                      Cancel
                    </Button>
                  </>
                )}
                <Button
                  onClick={() => deletePost(post._id)}
                  color="error"
                >
                  Delete
                </Button>
              </CardActions>
            )}
          </Card>
        ))
      ) : (
        <Typography>Loading posts...</Typography>
      )}
    </Container>
  );
};

export default HomePage;
