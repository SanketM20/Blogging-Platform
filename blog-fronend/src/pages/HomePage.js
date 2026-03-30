import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredPosts = posts.filter(
    post => post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">All Blog Posts</h1>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search posts by title or content..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="row">
        {filteredPosts.map(post => (
          <div className="col-md-4 mb-4" key={post.id}>
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text text-truncate" style={{ flexGrow: 1 }} dangerouslySetInnerHTML={{ __html: post.content }}></p>
                <p className="text-muted mb-2">By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</p>
                <Link to={`/posts/${post.id}`} className="btn btn-primary mt-auto">Read More</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
