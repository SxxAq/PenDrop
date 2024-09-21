import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, URL } = useAuth();
  const [userBlogs, setUserBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      if (user && user._id) {
        console.log("Fetching blogs for user ID:", user._id);

        try {
          const res = await axios.get(`${URL}/api/users/user/${user._id}`, {
            headers: { "x-auth-token": user.token },
          });
          setUserBlogs(res.data);
        } catch (err) {
          setError(
            err.response?.data?.message ||
              "An error occurred while fetching blogs"
          );
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserBlogs();
  }, [user, URL]);

const handleDelete = async (postId) => {
  console.log('Token:', user.token); // Check the token here
  try {
    await axios.delete(`/api/posts/${postId}`, {
      headers: {
        "Authorization": `Bearer ${user.token}`, // Include 'Bearer ' prefix
      },
    });
    setUserBlogs(userBlogs.filter((blog) => blog._id !== postId));
  } catch (err) {
    setError(
      err.response?.data?.message ||
      "An error occurred while deleting the blog"
    );
  }
};

  

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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-teal-700">Profile</h2>
      <div className="mb-8 bg-gray-100 p-4 rounded-md">
        <h3 className="text-xl font-semibold mb-2">User Information</h3>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-teal-700">Your Blogs</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userBlogs.map((blog) => (
          <div key={blog._id} className="border p-4 rounded-lg shadow-md">
            {blog.imageUrl && (
              <img
                src={`${URL}${blog.imageUrl}`}
                alt={blog.title}
                className="w-full h-48 object-cover mb-2 rounded"
              />
            )}
            <h4 className="text-lg font-semibold mb-2">{blog.title}</h4>
            <p className="text-gray-600 mb-2">
              {blog.content.slice(0, 100)}...
            </p>
            <div className="flex justify-between mt-4">
              <Link
                to={`/edit/${blog._id}`}
                className="text-teal-500 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(blog._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
