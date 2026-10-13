import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CoursePage from './pages/CoursePage.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CoursePage />
  </StrictMode>,
)
