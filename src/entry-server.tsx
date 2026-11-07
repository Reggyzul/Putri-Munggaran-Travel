import React, { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { SiteContent } from './data/defaultSiteContent';

export function render(initialContent: SiteContent, initialPath: string = '/') {
  return renderToString(
    <StrictMode>
      <App initialContent={initialContent} initialPath={initialPath} />
    </StrictMode>
  );
}

