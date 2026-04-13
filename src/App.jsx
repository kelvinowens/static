import React, { useState } from 'react';
import { Menu, X, Play, ShoppingCart, Mail, Home, Music, BookOpen, Store } from 'lucide-react';

export default function ArtistWebsite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState('');

  const songs = [
    { id: 1, title: 'Chains Don\'t Hold', genre: 'Alternative Rock', plays: 1240, cover: '🎸' },
    { id: 2, title: 'Hollow', genre: 'Hard Rock', plays: 980, cover: '🎸' },
    { id: 3, title: 'Roll the Dice', genre: 'Nu Metal', plays: 1520, cover: '🎲' },
    { id: 4, title: 'Neon Wasteland', genre: 'Synthwave', plays: 856, cover: '🌆' },
    { id: 5, title: 'Fallen Gods', genre: 'Alternative Metal', plays: 1100, cover: '⚡' },
    { id: 6, title: 'Fractured', genre: 'Nu Metal', plays: 743, cover: '🔗' },
  ];

  const blogPosts = [
    { id: 1, title: 'Creating Dark Rock in the Age of AI', date: '2026-04-10', excerpt: 'Exploring the process of using Suno AI for authentic metal music creation...' },
    { id: 2, title: '3D Printing Custom Dice for Tabletop Gaming', date: '2026-04-05', excerpt: 'A deep dive into designing and printing polyhedral dice sets with specialty filaments...' },
    { id: 3, title: 'Quantum Physics and Metal Music: A Strange Connection', date: '2026-03-28', excerpt: 'How complex scientific concepts inspire darker, more intricate songwriting...' },
  ];

  const merchandise = [
    { id: 1, name: 'Album Vinyl', price: 25.99, desc: 'Full album on vinyl with heavy artwork' },
    { id: 2, name: 'Band T-Shirt', price: 19.99, desc: 'Premium quality dark metal aesthetic' },
    { id: 3, name: 'Polyhedral Dice Set', price: 34.99, desc: 'Custom 3D-printed gaming dice' },
    { id: 4, name: 'Digital Album Bundle', price: 9.99, desc: 'All songs in lossless audio format' },
  ];

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    setEmail('');
    alert('Thanks for subscribing!');
  };

  const renderHome = () => (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col justify-center items-center text-center py-20 px-4 bg-gradient-to-b from-slate-900 via-slate-950 to-black">
        <div className="mb-8 text-6xl">🎸</div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">Dark Resonance</h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8">Breaking Benjamin meets Linkin Park. Nu Metal. Alternative Rock. Raw. Unfiltered.</p>
        <button
          onClick={() => setCurrentPage('music')}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition"
        >
          Explore Music
        </button>
      </div>

      {/* Featured Tracks */}
      <div className="px-4 md:px-8">
        <h2 className="text-3xl font-bold mb-8 text-white">Featured Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {songs.slice(0, 3).map(song => (
            <div key={song.id} className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition cursor-pointer border border-slate-700">
              <div className="text-4xl mb-4">{song.cover}</div>
              <h3 className="text-xl font-bold text-white mb-2">{song.title}</h3>
              <p className="text-gray-400 mb-4">{song.genre}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{song.plays} plays</span>
                <Play size={20} className="text-red-600" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="px-4 md:px-8 py-12 bg-slate-900 rounded-lg border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
        <form onSubmit={handleNewsletter} className="flex gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
          />
          <button type="submit" className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );

  const renderMusic = () => (
    <div className="px-4 md:px-8 py-8">
      <h1 className="text-4xl font-bold mb-12 text-white">Music Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {songs.map(song => (
          <div key={song.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-red-600 transition">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">{song.cover}</div>
              <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">{song.genre}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{song.title}</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">{song.plays} plays</span>
              <div className="flex gap-2">
                <button className="p-2 bg-red-600 hover:bg-red-700 rounded text-white transition">
                  <Play size={20} />
                </button>
                <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-white transition">
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBlog = () => (
    <div className="px-4 md:px-8 py-8">
      <h1 className="text-4xl font-bold mb-12 text-white">Blog & Insights</h1>
      <div className="space-y-6">
        {blogPosts.map(post => (
          <div key={post.id} className="bg-slate-800 rounded-lg p-8 border border-slate-700 hover:border-red-600 transition cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{post.title}</h2>
                <p className="text-gray-400 text-sm">{post.date}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">{post.excerpt}</p>
            <button className="text-red-600 hover:text-red-400 font-bold transition">Read More →</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStore = () => (
    <div className="px-4 md:px-8 py-8">
      <h1 className="text-4xl font-bold mb-12 text-white">Merchandise Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {merchandise.map(item => (
          <div key={item.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-red-600 transition">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
            <p className="text-gray-400 mb-4">{item.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-red-600">${item.price}</span>
              <button
                onClick={addToCart}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition flex items-center gap-2"
              >
                <ShoppingCart size={18} /> Add
              </button>
            </div>
          </div>
        ))}
      </div>
      {cartCount > 0 && (
        <div className="bg-green-900 border border-green-600 rounded-lg p-6 text-center">
          <p className="text-white text-lg">Items in cart: <span className="font-bold text-2xl text-green-400">{cartCount}</span></p>
        </div>
      )}
    </div>
  );

  const renderContact = () => (
    <div className="px-4 md:px-8 py-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-12 text-white">Get In Touch</h1>
      <form className="space-y-6 bg-slate-800 rounded-lg p-8 border border-slate-700">
        <div>
          <label className="block text-white font-bold mb-2">Name</label>
          <input type="text" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-red-600" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-white font-bold mb-2">Email</label>
          <input type="email" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-red-600" placeholder="your@email.com" />
        </div>
        <div>
          <label className="block text-white font-bold mb-2">Message</label>
          <textarea className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-red-600 h-32" placeholder="Your message..."></textarea>
        </div>
        <button type="submit" className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition">
          Send Message
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950 border-b border-slate-800 z-50">
        <div className="px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-red-600">🎸 Dark Resonance</div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {[
              { label: 'Home', page: 'home', icon: Home },
              { label: 'Music', page: 'music', icon: Music },
              { label: 'Blog', page: 'blog', icon: BookOpen },
              { label: 'Store', page: 'store', icon: Store },
              { label: 'Contact', page: 'contact', icon: Mail },
            ].map(item => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`flex items-center gap-2 font-bold transition ${
                  currentPage === item.page
                    ? 'text-red-600'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <ShoppingCart size={24} className="cursor-pointer hover:text-red-600 transition" />
              {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </div>
              )}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:text-red-600 transition"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-4">
            {[
              { label: 'Home', page: 'home' },
              { label: 'Music', page: 'music' },
              { label: 'Blog', page: 'blog' },
              { label: 'Store', page: 'store' },
              { label: 'Contact', page: 'contact' },
            ].map(item => (
              <button
                key={item.page}
                onClick={() => {
                  setCurrentPage(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left font-bold transition ${
                  currentPage === item.page
                    ? 'text-red-600'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Content */}
      <div className="pt-20">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'music' && renderMusic()}
        {currentPage === 'blog' && renderBlog()}
        {currentPage === 'store' && renderStore()}
        {currentPage === 'contact' && renderContact()}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 mt-20 px-4 md:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-red-600 mb-4">Music</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Streaming</a></li>
                <li><a href="#" className="hover:text-white transition">Downloads</a></li>
                <li><a href="#" className="hover:text-white transition">Lyrics</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-red-600 mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Discord</a></li>
                <li><a href="#" className="hover:text-white transition">Fan Forum</a></li>
                <li><a href="#" className="hover:text-white transition">Newsletter</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-red-600 mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2026 Dark Resonance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}