import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api/posts';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serverOnline, setServerOnline] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchPosts = () => {
    setLoading(true);
    setError(null);

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Server returned ' + res.status);
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setServerOnline(true);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setServerOnline(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Please provide title and content');
      return;
    }

    setSubmitting(true);

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title.trim(),
        content: content.trim(),
        author: author.trim() || 'Anonymous'
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to create post');
        }
        return res.json();
      })
      .then((newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
        setTitle('');
        setContent('');
        setAuthor('');
        setSubmitting(false);
      })
      .catch((err) => {
        alert('Error saving post: ' + err.message);
        setSubmitting(false);
      });
  };

  const handleDeletePost = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete post');
        }
        return res.json();
      })
      .then(() => {
        setPosts((prevPosts) => prevPosts.filter((p) => (p._id || p.id) !== id));
      })
      .catch((err) => {
        alert('Could not delete post: ' + err.message);
      });
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-badge">Sprint 11 Integration</div>
        <h1>Fullstack Data Pipeline</h1>
        <p className="subtitle">
          React SPA connected to Express & MongoDB REST API with CORS configured
        </p>
        <div className="status-bar">
          <span className={`status-indicator ${serverOnline ? 'online' : 'offline'}`}>
            {serverOnline ? 'API Connected (Port 5000)' : 'API Disconnected'}
          </span>
          <span className="cors-tag">CORS Enabled</span>
        </div>
      </header>

      <main className="content-grid">
        <section className="form-card">
          <h2>Create New Post</h2>
          <form onSubmit={handleCreatePost}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                id="author"
                type="text"
                placeholder="Your name (optional)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                rows="4"
                placeholder="Write your post content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? 'Publishing...' : 'Publish Post'}
            </button>
          </form>
        </section>

        <section className="feed-card">
          <div className="feed-header">
            <h2>Live Feed</h2>
            <button className="refresh-btn" onClick={fetchPosts}>
              Refresh
            </button>
          </div>

          {loading && (
            <div className="info-box">
              <div className="spinner"></div>
              <p>Fetching posts from database...</p>
            </div>
          )}

          {error && (
            <div className="error-box">
              <p>Could not connect to backend server:</p>
              <code>{error}</code>
              <p className="error-hint">
                Make sure your Express server is running on port 5000 with CORS enabled.
              </p>
              <button className="retry-btn" onClick={fetchPosts}>Try Again</button>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="info-box">
              <p>No posts available yet. Create one on the left!</p>
            </div>
          )}

          {!loading && !error && (
            <div className="posts-list">
              {posts.map((post) => {
                const postId = post._id || post.id;
                const formattedDate = post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : 'Just now';

                return (
                  <article key={postId} className="post-item">
                    <div className="post-top">
                      <h3>{post.title}</h3>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeletePost(postId)}
                        title="Delete post"
                      >
                        &times;
                      </button>
                    </div>
                    <p className="post-content">{post.content}</p>
                    <div className="post-meta">
                      <span>By {post.author || 'Anonymous'}</span>
                      <span>{formattedDate}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
