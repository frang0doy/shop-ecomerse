import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/Herosection';
import Productos from './components/Productos';
import { LenguajeProvider } from './components/LenguajeContext';
import { BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  return (
    <LenguajeProvider>
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

            {/* Aquí puedes agregar más rutas si es necesario */}
            <Routes>
              {/* Por ahora, sin rutas adicionales */}
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </LenguajeProvider>
  );
}

export default App;
