import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Alert, Nav, Navbar, Modal } from 'react-bootstrap';
import { LogOut, Trash2, Edit2, Plus } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [activeTab, setActiveTab] = useState('songs');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Songs State
  const [songs, setSongs] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [merchandise, setMerchandise] = useState([]);

  // Form States
  const [songForm, setSongForm] = useState({ id: '', title: '', genre: '', plays: 0, cover: '' });
  const [blogForm, setBlogForm] = useState({ id: '', title: '', date: '', excerpt: '', content: '' });
  const [merchForm, setMerchForm] = useState({ id: '', name: '', price: 0, desc: '' });

  // Edit States
  const [editingSongId, setEditingSongId] = useState(null);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editingMerchId, setEditingMerchId] = useState(null);

  // Auth
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        localStorage.setItem('adminToken', data.token);
        setIsLoggedIn(true);
        setSuccess('Login successful!');
        setError('');
        fetchAllData(data.token);
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken('');
    localStorage.removeItem('adminToken');
    setSongs([]);
    setBlogPosts([]);
    setMerchandise([]);
  };

  // Fetch All Data
  const fetchAllData = async (authToken) => {
    try {
      const [songsRes, blogRes, merchRes] = await Promise.all([
        fetch(`${API_URL}/songs`),
        fetch(`${API_URL}/blog`),
        fetch(`${API_URL}/merchandise`),
      ]);
      setSongs(await songsRes.json());
      setBlogPosts(await blogRes.json());
      setMerchandise(await merchRes.json());
    } catch (err) {
      setError('Failed to load data: ' + err.message);
    }
  };

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      fetchAllData(token);
    }
  }, [token]);

  // Songs Management
  const handleAddSong = async (e) => {
    e.preventDefault();
    try {
      const method = editingSongId ? 'PUT' : 'POST';
      const url = editingSongId ? `${API_URL}/songs/${editingSongId}` : `${API_URL}/songs`;
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(songForm),
      });

      if (response.ok) {
        setSuccess(editingSongId ? 'Song updated!' : 'Song added!');
        setSongForm({ id: '', title: '', genre: '', plays: 0, cover: '' });
        setEditingSongId(null);
        fetchAllData(token);
      } else {
        setError('Failed to save song');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  const handleDeleteSong = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await fetch(`${API_URL}/songs/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setSuccess('Song deleted!');
        fetchAllData(token);
      } catch (err) {
        setError('Failed to delete: ' + err.message);
      }
    }
  };

  const handleEditSong = (song) => {
    setSongForm(song);
    setEditingSongId(song._id);
  };

  // Blog Management
  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      const method = editingBlogId ? 'PUT' : 'POST';
      const url = editingBlogId ? `${API_URL}/blog/${editingBlogId}` : `${API_URL}/blog`;
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(blogForm),
      });

      if (response.ok) {
        setSuccess(editingBlogId ? 'Blog updated!' : 'Blog added!');
        setBlogForm({ id: '', title: '', date: '', excerpt: '', content: '' });
        setEditingBlogId(null);
        fetchAllData(token);
      } else {
        setError('Failed to save blog');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await fetch(`${API_URL}/blog/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setSuccess('Blog deleted!');
        fetchAllData(token);
      } catch (err) {
        setError('Failed to delete: ' + err.message);
      }
    }
  };

  const handleEditBlog = (post) => {
    setBlogForm(post);
    setEditingBlogId(post._id);
  };

  // Merchandise Management
  const handleAddMerch = async (e) => {
    e.preventDefault();
    try {
      const method = editingMerchId ? 'PUT' : 'POST';
      const url = editingMerchId ? `${API_URL}/merchandise/${editingMerchId}` : `${API_URL}/merchandise`;
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(merchForm),
      });

      if (response.ok) {
        setSuccess(editingMerchId ? 'Item updated!' : 'Item added!');
        setMerchForm({ id: '', name: '', price: 0, desc: '' });
        setEditingMerchId(null);
        fetchAllData(token);
      } else {
        setError('Failed to save item');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  const handleDeleteMerch = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await fetch(`${API_URL}/merchandise/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setSuccess('Item deleted!');
        fetchAllData(token);
      } catch (err) {
        setError('Failed to delete: ' + err.message);
      }
    }
  };

  const handleEditMerch = (item) => {
    setMerchForm(item);
    setEditingMerchId(item._id);
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-dark text-white" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className="bg-dark border-danger">
                <Card.Body>
                  <h1 className="text-center text-danger mb-4">Admin Login</h1>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-white">Username</Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-secondary text-white border-0"
                        placeholder="admin"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-white">Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-secondary text-white border-0"
                        placeholder="admin123"
                      />
                    </Form.Group>
                    <Button variant="danger" type="submit" className="w-100 fw-bold">
                      Login
                    </Button>
                  </Form>
                  <p className="text-secondary text-center mt-3 small">Demo: admin / admin123</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-dark text-white" style={{ minHeight: '100vh' }}>
      {/* Top Navigation */}
      <Navbar bg="dark" className="border-bottom border-danger sticky-top">
        <Container>
          <Navbar.Brand className="text-danger fw-bold">🎸 Admin Panel</Navbar.Brand>
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={handleLogout}
            className="d-flex align-items-center gap-2"
          >
            <LogOut size={18} /> Logout
          </Button>
        </Container>
      </Navbar>

      <Container className="py-4">
        {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
        {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

        {/* Tabs */}
        <Nav variant="pills" className="mb-4" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav.Item>
            <Nav.Link eventKey="songs" className="text-white bg-secondary">Songs</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="blog" className="text-white bg-secondary">Blog</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="merchandise" className="text-white bg-secondary">Merchandise</Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Songs Tab */}
        {activeTab === 'songs' && (
          <Row className="g-4">
            <Col lg={5}>
              <Card className="bg-dark border-secondary text-white">
                <Card.Body>
                  <h5 className="mb-4">{editingSongId ? 'Edit Song' : 'Add Song'}</h5>
                  <Form onSubmit={handleAddSong}>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={songForm.title}
                        onChange={(e) => setSongForm({ ...songForm, title: e.target.value })}
                        className="bg-secondary text-white border-0"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Genre</Form.Label>
                      <Form.Control
                        type="text"
                        value={songForm.genre}
                        onChange={(e) => setSongForm({ ...songForm, genre: e.target.value })}
                        className="bg-secondary text-white border-0"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Plays</Form.Label>
                      <Form.Control
                        type="number"
                        value={songForm.plays}
                        onChange={(e) => setSongForm({ ...songForm, plays: parseInt(e.target.value) })}
                        className="bg-secondary text-white border-0"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Cover Emoji</Form.Label>
                      <Form.Control
                        type="text"
                        value={songForm.cover}
                        onChange={(e) => setSongForm({ ...songForm, cover: e.target.value })}
                        className="bg-secondary text-white border-0"
                      />
                    </Form.Group>
                    <Button variant="danger" type="submit" className="w-100 mb-2">
                      {editingSongId ? 'Update Song' : 'Add Song'}
                    </Button>
                    {editingSongId && (
                      <Button 
                        variant="outline-danger" 
                        className="w-100"
                        onClick={() => {
                          setEditingSongId(null);
                          setSongForm({ id: '', title: '', genre: '', plays: 0, cover: '' });
                        }}
                      >
                        Cancel Edit
                      </Button>
                    )}
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={7}>
              <Card className="bg-dark border-secondary text-white">
                <Card.Body>
                  <h5 className="mb-3">Songs List</h5>
                  <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    <Table striped variant="dark" size="sm">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Genre</th>
                          <th>Plays</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {songs.map(song => (
                          <tr key={song._id}>
                            <td>{song.title}</td>
                            <td>{song.genre}</td>
                            <td>{song.plays}</td>
                            <td>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="text-info p-0 me-2"
                                onClick={() => handleEditSong(song)}
                              >
                                <Edit2 size={16} />
                              </Button>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="text-danger p-0"
                                onClick={() => handleDeleteSong(song._id)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <Row className="g-4">
            <Col lg={5}>
              <Card className="bg-dark border-secondary text-white">
                <Card.Body>
                  <h5 className="mb-4">{editingBlogId ? 'Edit Post' : 'Add Blog Post'}</h5>
                  <Form onSubmit={handleAddBlog}>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        className="bg-secondary text-white border-0"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="text"
                        value={blogForm.date}
                        onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                        className="bg-secondary text-white border-0"
                        placeholder="2026-04-13"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Excerpt</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={blogForm.excerpt}
                        onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                        className="bg-secondary text-white border-0"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Content</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        className="bg-secondary text-white border-0"
                      />
                    </Form.Group>
                    <Button variant="danger" type="submit" className="w-100 mb-2">
                      {editingBlogId ? 'Update Post' : 'Add Post'}
                    </Button>
                    {editingBlogId && (
                      <Button 
                        variant="outline-danger" 
                        className="w-100"
                        onClick={() => {
                          setEditingBlogId(null);
                          setBlogForm({ id: '', title: '', date: '', excerpt: '', content: '' });
                        }}
                      >
                        Cancel Edit
                      </Button>
                    )}
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={7}>
              <Card className="bg-dark border-secondary text-white">
                <Card.Body>
                  <h5 className="mb-3">Blog Posts</h5>
                  <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    <Table striped variant="dark" size="sm">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogPosts.map(post => (
                          <tr key={post._id}>
                            <td>{post.title}</td>
                            <td>{post.date}</td>
                            <td>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="text-info p-0 me-2"
                                onClick={() => handleEditBlog(post)}
                              >
                                <Edit2 size={16} />
                              </Button>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="text-danger p-0"
                                onClick={() => handleDeleteBlog(post._id)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Merchandise Tab */}
        {activeTab === 'merchandise' && (
          <Row className="g-4">
            <Col lg={5}>
              <Card className="bg-dark border-secondary text-white">
                <Card.Body>
                  <h5 className="mb-4">{editingMerchId ? 'Edit Item' : 'Add Merchandise'}</h5>
                  <Form onSubmit={handleAddMerch}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={merchForm.name}
                        onChange={(e) => setMerchForm({ ...merchForm, name: e.target.value })}
                        className="bg-secondary text-white border-0"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        value={merchForm.price}
                        onChange={(e) => setMerchForm({ ...merchForm, price: parseFloat(e.target.value) })}
                        className="bg-secondary text-white border-0"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={merchForm.desc}
                        onChange={(e) => setMerchForm({ ...merchForm, desc: e.target.value })}
                        className="bg-secondary text-white border-0"
                      />
                    </Form.Group>
                    <Button variant="danger" type="submit" className="w-100 mb-2">
                      {editingMerchId ? 'Update Item' : 'Add Item'}
                    </Button>
                    {editingMerchId && (
                      <Button 
                        variant="outline-danger" 
                        className="w-100"
                        onClick={() => {
                          setEditingMerchId(null);
                          setMerchForm({ id: '', name: '', price: 0, desc: '' });
                        }}
                      >
                        Cancel Edit
                      </Button>
                    )}
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={7}>
              <Card className="bg-dark border-secondary text-white">
                <Card.Body>
                  <h5 className="mb-3">Merchandise Items</h5>
                  <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    <Table striped variant="dark" size="sm">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {merchandise.map(item => (
                          <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="text-info p-0 me-2"
                                onClick={() => handleEditMerch(item)}
                              >
                                <Edit2 size={16} />
                              </Button>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="text-danger p-0"
                                onClick={() => handleDeleteMerch(item._id)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}
