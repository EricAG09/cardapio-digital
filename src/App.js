import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Usuario from './pages/user';
import { CartProvider } from './context/cartContext';
import Navbar from './components/navbar/navbar';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Usuario />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
