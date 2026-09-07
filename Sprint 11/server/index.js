require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Post = require('./models/Post');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`);
  next();
});

let isMongoConnected = false;
let memoryPosts = [
  {
    _id: '1',
    id: 1,
    title: 'Welcome to Sprint 11',
    content: 'Fullstack MERN system integration running smoothly with Express, CORS, and React.',
    author: 'Admin',
    createdAt: new Date()
  },
  {
    _id: '2',
    id: 2,
    title: 'CORS Configuration Solved',
    content: 'Configured cors middleware on Express server so React Vite app on port 5173 can fetch data.',
    author: 'Developer',
    createdAt: new Date()
  }
];

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/blogdb';

mongoose.connect(MONGO_URI)
  .then(() => {
    isMongoConnected = true;
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    isMongoConnected = false;
    console.log('MongoDB connection error, falling back to in-memory store:', err.message);
  });

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    database: isMongoConnected ? 'mongodb' : 'memory'
  });
});

const getPostsHandler = async (req, res) => {
  try {
    if (isMongoConnected) {
      const posts = await Post.find().sort({ createdAt: -1 });
      return res.status(200).json(posts);
    }
    return res.status(200).json(memoryPosts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts', message: err.message });
  }
};

const createPostHandler = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    if (isMongoConnected) {
      const newPost = new Post({
        title,
        content,
        author: author || 'Anonymous'
      });
      const saved = await newPost.save();
      return res.status(201).json(saved);
    }

    const newPost = {
      _id: Date.now().toString(),
      id: Date.now(),
      title,
      content,
      author: author || 'Anonymous',
      createdAt: new Date()
    };
    memoryPosts.unshift(newPost);
    return res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post', message: err.message });
  }
};

const deletePostHandler = async (req, res) => {
  try {
    const id = req.params.id;

    if (isMongoConnected) {
      const deleted = await Post.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.status(200).json({ message: 'Post deleted successfully', id });
    }

    const initialLength = memoryPosts.length;
    memoryPosts = memoryPosts.filter(p => p._id !== id && String(p.id) !== id);
    if (memoryPosts.length === initialLength) {
      return res.status(404).json({ error: 'Post not found' });
    }
    return res.status(200).json({ message: 'Post deleted successfully', id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post', message: err.message });
  }
};

const updatePostHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content, author } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    if (isMongoConnected) {
      const updated = await Post.findByIdAndUpdate(
        id,
        { title, content, author },
        { new: true }
      );
      if (!updated) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.status(200).json(updated);
    }

    const post = memoryPosts.find(p => p._id === id || String(p.id) === id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    post.title = title;
    post.content = content;
    if (author) post.author = author;
    return res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post', message: err.message });
  }
};

app.get('/api/posts', getPostsHandler);
app.get('/posts', getPostsHandler);

app.post('/api/posts', createPostHandler);
app.post('/posts', createPostHandler);

app.put('/api/posts/:id', updatePostHandler);
app.put('/posts/:id', updatePostHandler);

app.delete('/api/posts/:id', deletePostHandler);
app.delete('/posts/:id', deletePostHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
