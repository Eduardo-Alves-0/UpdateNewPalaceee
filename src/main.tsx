import "@fontsource/julius-sans-one/400.css";          // Julius só tem weight 400
import "@fontsource/kantumruy-pro/400.css";
import "@fontsource/kantumruy-pro/700.css";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
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
    <HelmetProvider>
      <BrowserRouter>
        <LazyMotion features={domAnimation} strict>
          <ScrollRestoration />
          <App />
        </LazyMotion>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
