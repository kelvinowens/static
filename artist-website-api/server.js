const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/artist-website', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schemas
const songSchema = new mongoose.Schema({
  id: Number,
  title: String,
  genre: String,
  plays: Number,
  cover: String,
  createdAt: { type: Date, default: Date.now },
});

const blogSchema = new mongoose.Schema({
  id: Number,
  title: String,
  date: String,
  excerpt: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const merchandiseSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  desc: String,
  createdAt: { type: Date, default: Date.now },
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
});

// Models
const Song = mongoose.model('Song', songSchema);
const Blog = mongoose.model('Blog', blogSchema);
const Merchandise = mongoose.model('Merchandise', merchandiseSchema);
const Admin = mongoose.model('Admin', adminSchema);

// Simple Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token === process.env.API_TOKEN || token === 'demo-token-12345') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// ============ SONGS ============
app.get('/api/songs', async (req, res) => {
  try {
    const songs = await Song.find().sort({ id: 1 });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/songs', authMiddleware, async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/songs/:id', authMiddleware, async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/songs/:id', authMiddleware, async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: 'Song deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ============ BLOG ============
app.get('/api/blog', async (req, res) => {
  try {
    const posts = await Blog.find().sort({ id: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/blog', authMiddleware, async (req, res) => {
  try {
    const post = new Blog(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/blog/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/blog/:id', authMiddleware, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog post deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ============ MERCHANDISE ============
app.get('/api/merchandise', async (req, res) => {
  try {
    const items = await Merchandise.find().sort({ id: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/merchandise', authMiddleware, async (req, res) => {
  try {
    const item = new Merchandise(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/merchandise/:id', authMiddleware, async (req, res) => {
  try {
    const item = await Merchandise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/merchandise/:id', authMiddleware, async (req, res) => {
  try {
    await Merchandise.findByIdAndDelete(req.params.id);
    res.json({ message: 'Merchandise item deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ============ AUTH ============
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Simple auth - in production, use bcrypt
  if (username === 'admin' && password === 'admin123') {
    res.json({ token: 'demo-token-12345', message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
