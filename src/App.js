import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Usuario from './pages/user';
import Header from './components/header';
import { CartProvider } from './components/carrinho/cartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Usuario />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
