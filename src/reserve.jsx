import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReservePage from './pages/ReservePage.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReservePage />
  </StrictMode>,
)
