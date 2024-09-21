import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Blog = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, URL } = useAuth();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching the post"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!post) {
    return <div className="text-center">Post not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {post.imageUrl && (
        <img
          src={`${URL}${post.imageUrl}`}
          alt={post.title}
          className="w-full h-64 object-cover"
        />
      )}
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4 text-teal-700">{post.title}</h2>
        <p className="text-gray-700 mb-6 whitespace-pre-wrap">{post.content}</p>
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span className="font-semibold text-teal-600">
            Author: {post.user?.username || "Unknown"}
          </span>
          <span>{new Date(post.createdAt).toLocaleString()}</span>
        </div>
        {user && user.id === post.author?._id && (
          <Link
            to={`/edit/${post._id}`}
            className="inline-block bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition duration-300"
          >
            Edit Post
          </Link>
        )}
      </div>
    </div>
  );
};

export default Blog;
