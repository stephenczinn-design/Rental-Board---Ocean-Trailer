import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// This fixes the "React is not defined" error globally
window.React = React

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
