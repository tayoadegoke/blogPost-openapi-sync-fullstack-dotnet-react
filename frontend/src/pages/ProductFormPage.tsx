import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProductsService } from '../api'
import type { Product } from '../api'
import '../styles/Form.css'

function ProductFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEditMode = Boolean(id)

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    sku: '',
    price: 0,
    discountPrice: 0,
    category: '',
    brand: '',
    stockQuantity: 0,
    rating: 0,
    reviewCount: 0,
    imageUrl: '',
    isAvailable: true,
    tags: []
  })
  const [tagsInput, setTagsInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isEditMode && id) {
      fetchProduct(parseInt(id))
    }
  }, [id, isEditMode])

  const fetchProduct = async (productId: number) => {
    try {
      setLoading(true)
      const product = await ProductsService.getApiProducts1(productId)
      setFormData(product)
      product?.tags && setTagsInput(product.tags.join(', '))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const productData = {
      ...formData,
      tags: tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    } as Product

    try {
      setLoading(true)
      if (isEditMode && id) {
        await ProductsService.putApiProducts(parseInt(id), productData)
      } else {
        await ProductsService.postApiProducts(productData)
      }
      navigate('/products')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) :
              type === 'checkbox' ? (e.target as HTMLInputElement).checked :
              value
    }))
  }

  if (loading && isEditMode) return <div className="container"><h2>Loading...</h2></div>

  return (
    <div className="container">
      <div className="form-container">
        <h1>{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="sku">SKU *</label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={formData.sku || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="brand">Brand *</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price *</label>
              <input
                type="number"
                id="price"
                name="price"
                step="0.01"
                value={formData.price || 0}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="discountPrice">Discount Price *</label>
              <input
                type="number"
                id="discountPrice"
                name="discountPrice"
                step="0.01"
                value={formData.discountPrice || 0}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stockQuantity">Stock Quantity *</label>
              <input
                type="number"
                id="stockQuantity"
                name="stockQuantity"
                value={formData.stockQuantity || 0}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="rating">Rating *</label>
              <input
                type="number"
                id="rating"
                name="rating"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating || 0}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reviewCount">Review Count *</label>
              <input
                type="number"
                id="reviewCount"
                name="reviewCount"
                value={formData.reviewCount || 0}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Image URL *</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g., wireless, bluetooth, premium"
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable || false}
                onChange={handleChange}
              />
              Available
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/products')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductFormPage
