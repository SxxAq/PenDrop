import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        setError("Failed to fetch post data");
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
      setError("No valid user token found");
      return;
    }

    try {
      await axios.put(
        `/api/posts/${id}`,
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate(`/post/${id}`);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while updating the post"
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Post</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 h-60"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition duration-300"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
