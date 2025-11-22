import { Link } from 'react-router-dom'
import '../styles/Pages.css'

function HomePage() {
  return (
    <div className="container">
      <div className="home-page">
        <h1>TypeScript Type Generation Demo</h1>
        <p className="subtitle">
          Full CRUD application with automatic type generation from OpenAPI spec
        </p>

        <div className="features">
          <div className="feature-card">
            <h2>Backend Features</h2>
            <ul>
              <li>.NET 8.0 Web API</li>
              <li>SQLite Database with Entity Framework Core</li>
              <li>Automatic OpenAPI/Swagger documentation</li>
              <li>Full CRUD operations</li>
              <li>RESTful API endpoints</li>
            </ul>
          </div>

          <div className="feature-card">
            <h2>Frontend Features</h2>
            <ul>
              <li>React 19 with TypeScript</li>
              <li>Automatically generated types from OpenAPI</li>
              <li>Type-safe API client</li>
              <li>React Router for navigation</li>
              <li>Full CRUD UI for Users and Products</li>
            </ul>
          </div>
        </div>

        <div className="quick-links">
          <h2>Get Started</h2>
          <div className="links-grid">
            <Link to="/users" className="link-card">
              <h3>Manage Users</h3>
              <p>View, create, edit, and delete users</p>
            </Link>
            <Link to="/products" className="link-card">
              <h3>Manage Products</h3>
              <p>View, create, edit, and delete products</p>
            </Link>
          </div>
        </div>

        <div className="info-section">
          <h2>How It Works</h2>
          <ol>
            <li>Backend exposes OpenAPI specification</li>
            <li>Run <code>npm run generate:api</code> to generate TypeScript types</li>
            <li>Frontend uses generated types for type-safe API calls</li>
            <li>Changes to backend automatically reflect in frontend after regeneration</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default HomePage
