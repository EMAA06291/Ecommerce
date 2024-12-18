import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fortawesome/fontawesome-free/css/all.min.css"
import './index.css'
import "react-image-gallery/styles/css/image-gallery.css"
import '@fontsource-variable/cairo';
import App from './App.jsx'
import '@fontsource/encode-sans-expanded';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
