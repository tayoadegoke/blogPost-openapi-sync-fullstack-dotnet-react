import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UsersService } from '../api'
import type { User } from '../api'
import '../styles/Pages.css'

function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await UsersService.getApiUsers()
      setUsers(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      await UsersService.deleteApiUsers(id)
      await fetchUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user')
    }
  }

  if (loading) return <div className="container"><h2>Loading...</h2></div>
  if (error) return <div className="container"><h2 className="error">Error: {error}</h2></div>

  return (
    <div className="container">
      <div className="page-header">
        <h1>Users Management</h1>
        <Link to="/users/new" className="btn btn-primary">Add New User</Link>
      </div>

      <div className="grid">
        {users.map((user) => (
          <div key={user.id} className="card">
            <h3>{user.firstName || 'Unknown'} {user.lastName || 'User'}</h3>
            <div className="details">
              <p><strong>Email:</strong> {user.email || 'N/A'}</p>
              <p><strong>Phone:</strong> {user.phoneNumber || 'N/A'}</p>
              <p><strong>Location:</strong> {user.city || 'N/A'}, {user.state || 'N/A'} {user.zipCode || ''}</p>
              <p><strong>Address:</strong> {user.address || 'N/A'}</p>
              <p><strong>Country:</strong> {user.country || 'N/A'}</p>
              <p><strong>Role:</strong> {user.role || 'User'}</p>
              <p><strong>Status:</strong> {user.isActive ? 'Active' : 'Inactive'}</p>
              {user.dateOfBirth && (
                <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
              )}
              {user.createdAt && (
                <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
              )}
              {user.lastLoginAt && (
                <p><strong>Last Login:</strong> {new Date(user.lastLoginAt).toLocaleString()}</p>
              )}
            </div>
            <div className="card-actions">
              <Link to={`/users/edit/${user.id}`} className="btn btn-secondary">Edit</Link>
              <button onClick={() => handleDelete(user.id!)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UsersPage
