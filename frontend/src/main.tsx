import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { client } from './api'

// Configure the API base URL from environment variable
client.setConfig({
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
