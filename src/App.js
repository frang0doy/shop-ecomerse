import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/Herosection';
import Productos from './components/Productos';
import { LenguajeProvider } from './components/LenguajeContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart'; // Nuevo componente para el carrito
import { CarritoProvider } from './components/CarritoContext'; // Ajusta la ruta a 'components'
 // Importamos el CarritoProvider

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  return (
    <LenguajeProvider>
      <CarritoProvider> {/* Envuelve con el CarritoProvider */}
        <Router>
          <div className="App flex flex-col min-h-screen">
            <header className="App-header">
              <Header setSearchTerm={setSearchTerm} />
            </header>

            <HeroSection />

            <main className="flex-grow">
              <section id="productos">
                <Productos
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </section>

              {/* Rutas de la aplicación */}
              <Routes>
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </CarritoProvider>
    </LenguajeProvider>
  );
}

export default App;
