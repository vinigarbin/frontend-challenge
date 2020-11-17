import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import 'leaflet/dist/leaflet.css';
import Routes from './routes';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes />
    </BrowserRouter>
  );
};
export default App;
