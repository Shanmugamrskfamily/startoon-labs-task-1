import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { UserProvider } from './Context/UserContext.jsx';

const rootElement = document.getElementById('root');

const root = createRoot(rootElement);

root.render(
  <UserProvider>
    <App />
    </UserProvider>
);
