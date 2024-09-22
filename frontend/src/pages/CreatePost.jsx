import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const { user,api } = useAuth();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No valid user token found');
      toast.error('No valid user token found');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('username', user);
    if (image) {
      formData.append('image', image);
    }

    try {
      await api.post('/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Post created successfully!');
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred while creating the post';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-teal-700">Create Post</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
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
        <div>
          <label htmlFor="image" className="block mb-2 font-semibold text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
          />
        </div>
        <button 
          type="submit" 
          className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600 transition duration-300 font-semibold"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;