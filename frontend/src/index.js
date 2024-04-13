import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NoticeProvider } from './components/NoticeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NoticeProvider>
        < App />
    </NoticeProvider>
  </React.StrictMode>
);

reportWebVitals();
