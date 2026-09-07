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

  const [deletingId, setDeletingId] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [updating, setUpdating] = useState(false);

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
      alert('Please fill out both title and content');
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
        alert('Error creating post: ' + err.message);
        setSubmitting(false);
      });
  };

  const handleDeletePost = (id) => {
    setDeletingId(id);

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
        setDeletingId(null);
      })
      .catch((err) => {
        alert('Error deleting post: ' + err.message);
        setDeletingId(null);
      });
  };

  const handleStartEdit = (post) => {
    const id = post._id || post.id;
    setEditingId(id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditContent('');
  };

  const handleUpdatePost = (id) => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert('Title and content cannot be empty');
      return;
    }

    setUpdating(true);

    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: editTitle.trim(),
        content: editContent.trim()
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update post');
        }
        return res.json();
      })
      .then((updatedPost) => {
        setPosts((prevPosts) =>
          prevPosts.map((p) => ((p._id || p.id) === id ? updatedPost : p))
        );
        setEditingId(null);
        setEditTitle('');
        setEditContent('');
        setUpdating(false);
      })
      .catch((err) => {
        alert('Error updating post: ' + err.message);
        setUpdating(false);
      });
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-badge">Sprint 11 - Phase 2</div>
        <h1>Full CRUD UI Pipeline</h1>
        <p className="subtitle">
          Data injection, instant DOM mutations on deletion, and inline updates connected to MongoDB.
        </p>
        <div className="status-bar">
          <span className={`status-indicator ${serverOnline ? 'online' : 'offline'}`}>
            {serverOnline ? 'MongoDB & API Connected (Port 5000)' : 'API Disconnected'}
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
              {submitting ? 'Injecting Data...' : 'Publish to Database'}
            </button>
          </form>
        </section>

        <section className="feed-card">
          <div className="feed-header">
            <h2>Live Documents Feed ({posts.length})</h2>
            <button className="refresh-btn" onClick={fetchPosts} disabled={loading}>
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {loading && (
            <div className="info-box">
              <div className="spinner"></div>
              <p>Fetching records from MongoDB...</p>
            </div>
          )}

          {error && (
            <div className="error-box">
              <p>Could not connect to backend server:</p>
              <code>{error}</code>
              <p className="error-hint">
                Ensure Node.js Express server is running on port 5000 with CORS enabled.
              </p>
              <button className="retry-btn" onClick={fetchPosts}>Retry Connection</button>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="info-box">
              <p>No documents found in MongoDB. Inject a new post using the form!</p>
            </div>
          )}

          {!loading && !error && (
            <div className="posts-list">
              {posts.map((post) => {
                const postId = post._id || post.id;
                const isEditing = editingId === postId;
                const isDeleting = deletingId === postId;
                const formattedDate = post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : 'Just now';

                if (isEditing) {
                  return (
                    <article key={postId} className="post-item edit-mode">
                      <div className="form-group">
                        <label>Edit Title</label>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Edit Content</label>
                        <textarea
                          rows="3"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                        />
                      </div>
                      <div className="edit-actions">
                        <button
                          className="save-btn"
                          onClick={() => handleUpdatePost(postId)}
                          disabled={updating}
                        >
                          {updating ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={handleCancelEdit}
                          disabled={updating}
                        >
                          Cancel
                        </button>
                      </div>
                    </article>
                  );
                }

                return (
                  <article key={postId} className="post-item">
                    <div className="post-top">
                      <h3>{post.title}</h3>
                      <div className="post-actions">
                        <button
                          className="edit-btn"
                          onClick={() => handleStartEdit(post)}
                          title="Edit post"
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeletePost(postId)}
                          disabled={isDeleting}
                          title="Delete post"
                        >
                          {isDeleting ? '...' : 'Delete'}
                        </button>
                      </div>
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
