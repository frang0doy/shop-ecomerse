import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/Herosection';
import Productos from './components/Productos';
import { LenguajeProvider } from './components/LenguajeContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  return (
    <LenguajeProvider>
      <Router>
        <div className="App flex flex-col min-h-screen">
          {/* Header con búsqueda */}
          <header className="App-header">
            <Header setSearchTerm={setSearchTerm} />
          </header>

          {/* HeroSection */}
          <HeroSection />

          <main className="flex-grow">
            <section id="productos">
              {/* Pasando searchTerm a Productos */}
              <Productos
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </section>

            {/* Rutas de la aplicación */}
            <Routes>
              {/* Aquí puedes agregar nuevas rutas si lo necesitas */}
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </LenguajeProvider>
  );
}

export default App;
