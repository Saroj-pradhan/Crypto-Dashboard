import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CryptoProvider } from './context/ContextApp.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CryptoProvider>
    <App />
    </CryptoProvider>
  </StrictMode>,
)
