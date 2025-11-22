import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage'
import UserFormPage from './pages/UserFormPage'
import ProductsPage from './pages/ProductsPage'
import ProductFormPage from './pages/ProductFormPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-brand">Type Generation Demo</Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/users" className="nav-link">Users</Link>
              <Link to="/products" className="nav-link">Products</Link>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/new" element={<UserFormPage />} />
            <Route path="/users/edit/:id" element={<UserFormPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/new" element={<ProductFormPage />} />
            <Route path="/products/edit/:id" element={<ProductFormPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
