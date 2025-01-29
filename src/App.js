import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/Herosection';
import Productos from './components/Productos';
import Sidebar from './components/Sidebar';
import { LenguajeProvider } from './components/LenguajeContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckoutPage from './components/CheckoutPage'; // Nueva página de checkout


function App() {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [cart, setCart] = useState([]); // Estado para el carrito
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para mostrar/ocultar la barra lateral

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct.quantity > 1) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter((item) => item.id !== product.id);
    });
  };

  return (
    <LenguajeProvider>
      <Router>
        <div className="App flex flex-col min-h-screen">
          <header className="App-header">
            <Header cart={cart} setIsSidebarOpen={setIsSidebarOpen} />
          </header>

          <main className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <section id="productos">
                      <Productos
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        addToCart={addToCart}
                      />
                    </section>
                  </>
                }
              />
              <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
            </Routes>
          </main>

          <Footer />
        </div>

        {/* Sidebar */}
        <Sidebar
          cart={cart}
          isOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          removeFromCart={removeFromCart}
        />
      </Router>
    </LenguajeProvider>
  );
}

export default App;
