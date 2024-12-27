import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import { AppTheme } from './components/features';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppTheme>
      <CssBaseline enableColorScheme />
      <App />
    </AppTheme>
  </StrictMode>
);
