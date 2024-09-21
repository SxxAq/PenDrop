import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { URL } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/posts");
        setPosts(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching posts"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {currentPosts.map((post) => (
        <div
          key={post._id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
        >
          {post.imageUrl && (
            <Link to={`/post/${post._id}`}>
              <img
                src={`${URL}${post.imageUrl}`}
                alt={post.title}
                className="w-full h-48 sm:h-64 object-cover"
              />
            </Link>
          )}
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-3 text-teal-700 hover:text-teal-500 transition duration-300">
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span className="font-semibold text-teal-600">
                Author: {post.user?.username || "Unknown"}
              </span>
              <span>{new Date(post.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
      
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-4 py-2 rounded-md transition duration-300 
              ${
                currentPage === index + 1
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;