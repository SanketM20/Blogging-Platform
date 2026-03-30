import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyPosts = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/posts/myposts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(res.data);
      } catch {
        setError('Failed to load your posts');
      }
    };

    fetchMyPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(posts.filter(post => post.id !== id));
      alert('Post deleted');
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2>My Posts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {posts.length === 0 && <p>You have not created any posts yet.</p>}
        {posts.map(post => (
          <div className="col-md-6 mb-4" key={post.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 100) + '...' }}></p>
                <Link to={`/edit/${post.id}`} className="btn btn-primary me-2">Edit</Link>
                <button className="btn btn-danger" onClick={() => handleDelete(post.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPostsPage;
