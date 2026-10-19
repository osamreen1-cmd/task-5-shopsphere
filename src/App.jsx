
import { useState } from 'react'
import './App.css'

const products = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 1999, icon: '🎧', description: 'Immersive sound for every day.' },
  { id: 2, name: 'Smart Watch', category: 'Electronics', price: 2499, icon: '⌚', description: 'Stay connected in style.' },
  { id: 3, name: 'Everyday Backpack', category: 'Fashion', price: 999, icon: '🎒', description: 'Your perfect daily companion.' },
  { id: 4, name: 'Instant Camera', category: 'Electronics', price: 4499, icon: '📸', description: 'Capture your favourite moments.' },
  { id: 5, name: 'Running Shoes', category: 'Fashion', price: 1799, icon: '👟', description: 'Comfort for every step.' },
  { id: 6, name: 'Coffee Mug', category: 'Home', price: 399, icon: '☕', description: 'Make every coffee break special.' },
  { id: 7, name: 'Desk Lamp', category: 'Home', price: 799, icon: '💡', description: 'Brighten up your workspace.' },
  { id: 8, name: 'Sunglasses', category: 'Fashion', price: 699, icon: '🕶️', description: 'A fresh look for sunny days.' },
]

function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('default')
  const [cart, setCart] = useState([])

  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(product =>
      category === 'All' || product.category === category
    )
    .sort((a, b) => {
      if (sort === 'low') return a.price - b.price
      if (sort === 'high') return b.price - a.price
      return a.id - b.id
    })

  function addToCart(product) {
    setCart(previousCart => [...previousCart, product])
  }

  return (
    <div className="app">
      <nav className="navbar">
        <a className="logo" href="#home">ShopSphere<span>.</span></a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
        </div>

        <button
          className="cart-button"
          onClick={() => alert(
            cart.length
              ? cart.map(item => `${item.name} - ₹${item.price}`).join('\n') +
                `\n\nTotal: ₹${cart.reduce((sum, item) => sum + item.price, 0)}`
              : 'Your cart is empty!'
          )}
        >
          🛒 Cart ({cart.length})
        </button>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="eyebrow">YOUR STYLE, YOUR WORLD</p>
          <h1>Discover Your<br />Next Favourite.</h1>
          <p className="hero-text">
            Explore products you'll love, all in one place.
          </p>
          <a href="#products" className="shop-button">
            Explore Products →
          </a>
        </div>
        <div className="hero-icon">🛍️</div>
      </section>

      <section className="products" id="products">
        <p className="eyebrow">HANDPICKED FOR YOU</p>
        <h2>Explore Our Collection</h2>
        <p>Great finds. Great prices. Just for you.</p>

        <div className="product-controls">
          <input
            type="search"
            placeholder="🔍 Search products..."
            value={search}
            onChange={event => setSearch(event.target.value)}
            aria-label="Search products"
          />

          <select
            value={category}
            onChange={event => setCategory(event.target.value)}
            aria-label="Filter by category"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
          </select>

          <select
            value={sort}
            onChange={event => setSort(event.target.value)}
            aria-label="Sort products"
          >
            <option value="default">Sort: Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        <p className="results-count">
          Showing {filteredProducts.length} products
        </p>

        <div className="product-grid">
          {filteredProducts.map(product => (
            <article className="product-card" key={product.id}>
              <div className="product-image">{product.icon}</div>
              <p className="product-category">{product.category}</p>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-bottom">
                <strong>₹{product.price.toLocaleString('en-IN')}</strong>
                <button
                  className="add-button"
                  onClick={() => addToCart(product)}
                >
                  + Add
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="empty-message">
            No products found. Try another search!
          </p>
        )}
      </section>

      <footer id="about">
        <h2>ShopSphere.</h2>
        <p>Discover more. Shop smarter.</p>
        <p>© 2026 ShopSphere. Built with React.</p>
      </footer>
    </div>
  )
}

export default App
