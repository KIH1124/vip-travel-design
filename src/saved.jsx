import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SavedPage from './pages/SavedPage.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SavedPage />
  </StrictMode>,
)
