import React, { useState, useEffect } from 'react';
import { Menu, X, Play, ShoppingCart, Mail, Home, Music, BookOpen, Store } from 'lucide-react';
import { Container, Row, Col, Card, Button, Form, Nav, Navbar, Badge, Alert } from 'react-bootstrap';
import AdminDashboard from './AdminDashboard';

const API_URL = 'http://localhost:5000/api';

export default function ArtistWebsite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState('');
  
  // Data states
  const [songs, setSongs] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [merchandise, setMerchandise] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all data from API
  useEffect(() => {
    fetchAllData();
    
    // Keyboard shortcut: Ctrl+Shift+A to access admin
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setCurrentPage('admin');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [songsRes, blogRes, merchRes] = await Promise.all([
        fetch(`${API_URL}/songs`),
        fetch(`${API_URL}/blog`),
        fetch(`${API_URL}/merchandise`),
      ]);

      if (!songsRes.ok || !blogRes.ok || !merchRes.ok) {
        throw new Error('Failed to load data from API');
      }

      const songsData = await songsRes.json();
      const blogData = await blogRes.json();
      const merchData = await merchRes.json();

      setSongs(songsData);
      setBlogPosts(blogData);
      setMerchandise(merchData);
      setError('');
    } catch (err) {
      setError('Unable to connect to API. Make sure the backend is running on http://localhost:5000');
      console.error('API Error:', err);
      // Use empty arrays as fallback
      setSongs([]);
      setBlogPosts([]);
      setMerchandise([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    setEmail('');
    alert('Thanks for subscribing!');
  };

  const renderHome = () => (
    <div>
      {/* Hero Section */}
      <div className="bg-dark text-white py-5 text-center" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Container>
          <div className="mb-4" style={{ fontSize: '4rem' }}>🎸</div>
          <h1 className="display-3 fw-bold mb-4">Static the Gremlin</h1>
          <p className="lead text-secondary mb-4">Breaking Benjamin meets Linkin Park. Nu Metal. Alternative Rock. Raw. Unfiltered.</p>
          <Button 
            variant="danger" 
            size="lg"
            onClick={() => setCurrentPage('music')}
            className="px-5"
          >
            Explore Music
          </Button>
          {error && (
            <Alert variant="warning" className="mt-4">
              ⚠️ {error}
            </Alert>
          )}
        </Container>
      </div>

      {/* Featured Tracks */}
      <Container className="py-5">
        <h2 className="display-5 fw-bold mb-5 text-white">Featured Tracks</h2>
        {loading ? (
          <div className="text-center text-secondary">Loading tracks...</div>
        ) : songs.length > 0 ? (
          <Row className="g-4">
            {songs.slice(0, 3).map(song => (
              <Col key={song._id} md={4}>
                <Card className="bg-dark border-secondary text-white h-100 hover-shadow" style={{ cursor: 'pointer', transition: 'all 0.3s' }}>
                  <Card.Body>
                    <div className="mb-3" style={{ fontSize: '3rem' }}>{song.cover}</div>
                    <Card.Title className="fs-5">{song.title}</Card.Title>
                    <Badge bg="danger" className="mb-3">{song.genre}</Badge>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-secondary">{song.plays} plays</small>
                      <Play size={20} className="text-danger" />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center text-secondary">No tracks available yet</div>
        )}
      </Container>

      {/* Newsletter */}
      <Container className="py-5">
        <div className="bg-dark border border-secondary rounded p-5">
          <h3 className="text-white mb-4">Stay Updated</h3>
          <Form onSubmit={handleNewsletter}>
            <Row className="g-2">
              <Col md={8}>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-secondary text-white border-0"
                />
              </Col>
              <Col md={4}>
                <Button variant="danger" type="submit" className="w-100">
                  Subscribe
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </div>
  );

  const renderMusic = () => (
    <Container className="py-5">
      <h1 className="display-4 fw-bold mb-5 text-white">Music Collection</h1>
      {loading ? (
        <div className="text-center text-secondary">Loading music...</div>
      ) : songs.length > 0 ? (
        <Row className="g-4">
          {songs.map(song => (
            <Col key={song._id} md={6} lg={6}>
              <Card className="bg-dark border-secondary text-white h-100">
                <Card.Body>
                  <Row className="mb-3">
                    <Col xs={6}>
                      <div style={{ fontSize: '4rem' }}>{song.cover}</div>
                    </Col>
                    <Col xs={6} className="text-end">
                      <Badge bg="danger" className="mb-2">{song.genre}</Badge>
                    </Col>
                  </Row>
                  <Card.Title className="fs-4">{song.title}</Card.Title>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <small className="text-secondary">{song.plays} plays</small>
                  </div>
                  <div className="d-flex gap-2">
                    <Button variant="danger" size="sm" className="flex-grow-1">
                      <Play size={18} /> Play
                    </Button>
                    <Button variant="outline-secondary" size="sm" className="flex-grow-1">
                      Download
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center text-secondary">No tracks available yet. Use the admin panel to add songs!</div>
      )}
    </Container>
  );

  const renderBlog = () => (
    <Container className="py-5">
      <h1 className="display-4 fw-bold mb-5 text-white">Blog & Insights</h1>
      {loading ? (
        <div className="text-center text-secondary">Loading blog posts...</div>
      ) : blogPosts.length > 0 ? (
        <div className="space-y-4">
          {blogPosts.map(post => (
            <Card key={post._id} className="bg-dark border-secondary text-white mb-4">
              <Card.Body>
                <Card.Title className="fs-4">{post.title}</Card.Title>
                <Card.Subtitle className="mb-3 text-secondary">{post.date}</Card.Subtitle>
                <Card.Text>{post.excerpt}</Card.Text>
                <Button variant="link" className="text-danger p-0">
                  Read More →
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-secondary">No blog posts available yet</div>
      )}
    </Container>
  );

  const renderStore = () => (
    <Container className="py-5">
      <h1 className="display-4 fw-bold mb-5 text-white">Merchandise Store</h1>
      {loading ? (
        <div className="text-center text-secondary">Loading merchandise...</div>
      ) : merchandise.length > 0 ? (
        <>
          <Row className="g-4 mb-4">
            {merchandise.map(item => (
              <Col key={item._id} md={6} lg={6}>
                <Card className="bg-dark border-secondary text-white h-100">
                  <Card.Body>
                    <div className="mb-3" style={{ fontSize: '3rem' }}>📦</div>
                    <Card.Title className="fs-5">{item.name}</Card.Title>
                    <Card.Text className="text-secondary mb-3">{item.desc}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fs-5 fw-bold text-danger">${item.price.toFixed(2)}</span>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={addToCart}
                        className="d-flex align-items-center gap-2"
                      >
                        <ShoppingCart size={18} /> Add
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {cartCount > 0 && (
            <Alert variant="success" className="text-center">
              <h5 className="mb-0">Items in cart: <span className="fw-bold">{cartCount}</span></h5>
            </Alert>
          )}
        </>
      ) : (
        <div className="text-center text-secondary">No merchandise available yet</div>
      )}
    </Container>
  );

  const renderContact = () => (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="display-4 fw-bold mb-5 text-white">Get In Touch</h1>
          <Card className="bg-dark border-secondary text-white">
            <Card.Body>
              <Form>
                <Form.Group className="mb-4">
                  <Form.Label className="text-white fw-bold">Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your name"
                    className="bg-secondary text-white border-0"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="text-white fw-bold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="your@email.com"
                    className="bg-secondary text-white border-0"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="text-white fw-bold">Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Your message..."
                    className="bg-secondary text-white border-0"
                  />
                </Form.Group>

                <Button variant="danger" type="submit" className="w-100 fw-bold">
                  Send Message
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  // Admin section
  if (currentPage === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="bg-dark" style={{ minHeight: '100vh' }}>
      {/* Navigation */}
      <Navbar bg="dark" expand="md" sticky="top" className="border-bottom border-secondary">
        <Container>
          <Navbar.Brand className="text-danger fw-bold fs-5">
            🎸 Static the Gremlin
          </Navbar.Brand>
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav"
            className="border-danger"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto gap-4">
              {[
                { label: 'Home', page: 'home' },
                { label: 'Music', page: 'music' },
                { label: 'Blog', page: 'blog' },
                { label: 'Store', page: 'store' },
                { label: 'Contact', page: 'contact' },
              ].map(item => (
                <Nav.Link
                  key={item.page}
                  onClick={() => setCurrentPage(item.page)}
                  className={`fw-bold ${
                    currentPage === item.page
                      ? 'text-danger'
                      : 'text-secondary'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>
            <div className="ms-3 position-relative">
              <ShoppingCart 
                size={24} 
                className="text-secondary cursor-pointer"
                style={{ cursor: 'pointer' }}
              />
              {cartCount > 0 && (
                <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </Badge>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Content */}
      <div className="bg-dark text-white py-5">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'music' && renderMusic()}
        {currentPage === 'blog' && renderBlog()}
        {currentPage === 'store' && renderStore()}
        {currentPage === 'contact' && renderContact()}
      </div>

      {/* Footer */}
      <footer className="border-top border-secondary bg-dark text-white py-5 mt-5">
        <Container>
          <Row className="mb-4">
            <Col md={4} className="mb-4">
              <h5 className="text-danger fw-bold">Music</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-secondary text-decoration-none">Streaming</a></li>
                <li><a href="#" className="text-secondary text-decoration-none">Downloads</a></li>
                <li><a href="#" className="text-secondary text-decoration-none">Lyrics</a></li>
              </ul>
            </Col>
            <Col md={4} className="mb-4">
              <h5 className="text-danger fw-bold">Community</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-secondary text-decoration-none">Discord</a></li>
                <li><a href="#" className="text-secondary text-decoration-none">Fan Forum</a></li>
                <li><a href="#" className="text-secondary text-decoration-none">Newsletter</a></li>
              </ul>
            </Col>
            <Col md={4} className="mb-4">
              <h5 className="text-danger fw-bold">Legal</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-secondary text-decoration-none">Privacy</a></li>
                <li><a href="#" className="text-secondary text-decoration-none">Terms</a></li>
                <li><a href="#" className="text-secondary text-decoration-none">Contact</a></li>
              </ul>
            </Col>
          </Row>
          <hr className="border-secondary" />
          <p className="text-center text-secondary small">&copy; 2026 Static the Gremlin. All rights reserved. | Admin: Ctrl+Shift+A</p>
        </Container>
      </footer>
    </div>
  );
}