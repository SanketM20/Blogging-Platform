import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(console.error);
  }, [id]);

  if (!post) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <h1>{post.title}</h1>
      <p className="text-muted">By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      <Link to="/" className="btn btn-secondary mt-4">Back to Home</Link>
    </div>
  );
};

export default PostDetailPage;
