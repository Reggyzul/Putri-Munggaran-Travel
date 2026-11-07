import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootEl = document.getElementById('root')!;
const initialContent = window.__INITIAL_CONTENT__;
const initialPath = window.location.pathname + window.location.hash;

if (rootEl.hasChildNodes() && rootEl.innerHTML.trim().length > 0) {
  hydrateRoot(
    rootEl,
    <StrictMode>
      <App initialContent={initialContent} initialPath={initialPath} />
    </StrictMode>
  );
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <App initialContent={initialContent} initialPath={initialPath} />
    </StrictMode>
  );
}
