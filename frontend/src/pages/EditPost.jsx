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
  const { user,api } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/api/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        setError("Failed to fetch post data");
        toast.error("Failed to fetch post data");
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No valid user token found");
      toast.error("No valid user token found");
      return;
    }
    try {
      await api.put(
        `/api/posts/${id}`,
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Post updated successfully!");
      navigate(`/post/${id}`);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while updating the post";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-teal-700">Edit Post</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-2 font-semibold text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-2 font-semibold text-gray-700">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 h-60"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600 transition duration-300 font-semibold"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;