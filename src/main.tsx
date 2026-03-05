import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'motion/react'
import App from './App.tsx'
import ScrollRestoration from './components/ScrollRestoration'
import './style/style.scss'

if ("scrollRestoration" in history) {
  try {
    history.scrollRestoration = "manual";
  } catch {
    // ignore silently
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LazyMotion features={domAnimation} strict>
        <ScrollRestoration />
        <App />
      </LazyMotion>
    </BrowserRouter>
  </StrictMode>,
)
