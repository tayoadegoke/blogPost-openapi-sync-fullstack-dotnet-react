import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ProductsService } from '../api'
import type { Product } from '../api'
import '../styles/Pages.css'

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await ProductsService.getApiProducts()
      setProducts(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      await ProductsService.deleteApiProducts(id)
      await fetchProducts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product')
    }
  }

  if (loading) return <div className="container"><h2>Loading...</h2></div>
  if (error) return <div className="container"><h2 className="error">Error: {error}</h2></div>

  return (
    <div className="container">
      <div className="page-header">
        <h1>Products Management</h1>
        <Link to="/products/new" className="btn btn-primary">Add New Product</Link>
      </div>

      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <h3>{product.name || 'Unnamed Product'}</h3>
            <div className="details">
              <p><strong>Description:</strong> {product.description || 'N/A'}</p>
              <p><strong>SKU:</strong> {product.sku || 'N/A'}</p>
              <p><strong>Price:</strong> ${product.price?.toFixed(2) || '0.00'}</p>
              <p><strong>Discount Price:</strong> ${product.discountPrice?.toFixed(2) || '0.00'}</p>
              <p><strong>Category:</strong> {product.category || 'N/A'}</p>
              <p><strong>Brand:</strong> {product.brand || 'N/A'}</p>
              <p><strong>Stock:</strong> {product.stockQuantity ?? 0} units</p>
              <p><strong>Rating:</strong> {product.rating ?? 0} ({product.reviewCount ?? 0} reviews)</p>
              <p><strong>Available:</strong> {product.isAvailable ? 'Yes' : 'No'}</p>
              {product.createdAt && (
                <p><strong>Created:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
              )}
              {product.updatedAt && (
                <p><strong>Updated:</strong> {new Date(product.updatedAt).toLocaleDateString()}</p>
              )}
              {product.tags && product.tags.length > 0 && (
                <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
              )}
            </div>
            <div className="card-actions">
              <Link to={`/products/edit/${product.id}`} className="btn btn-secondary">Edit</Link>
              <button onClick={() => handleDelete(product.id!)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsPage
