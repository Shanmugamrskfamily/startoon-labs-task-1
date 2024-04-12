import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserContext } from './Context/UserContext.jsx';

const rootElement=document.getElementById('root');

const root=createRoot(rootElement);

root.render(
  <UserContext.Provider>
  <App/>
  </UserContext.Provider>
)

