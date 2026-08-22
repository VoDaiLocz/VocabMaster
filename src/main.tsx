import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './styles/globals.css'
import { initWebDatabase } from './services/webDatabasePolyfill'

// Add global error handler
window.onerror = (message, _source, _lineno, _colno, error) => {
  console.error('Global Error in Renderer:', message, error)
}

async function bootstrap() {
  // Ensure SQLite database polyfill is ready on Android & Web
  await initWebDatabase()

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>,
  )
}

bootstrap()
