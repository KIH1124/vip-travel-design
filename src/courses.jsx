import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CoursesPage from './pages/CoursesPage.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CoursesPage />
  </StrictMode>,
)
