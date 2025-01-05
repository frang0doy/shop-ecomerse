import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/Herosection';
import Productos from './components/Productos';
import { LenguajeProvider } from './components/LenguajeContext'; // Cambié LanguageProvider a LenguajeProvider

function App() {
  // Estado para manejar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <LenguajeProvider> {/* Ahora utilizamos LenguajeProvider */}
      <div className="App flex flex-col min-h-screen">
        <header className="App-header">
          <Header setSearchTerm={setSearchTerm} /> {/* Pasamos setSearchTerm al Header */}
        </header>
        <HeroSection />

        {/* Resto del contenido de la app */}
        <main className="flex-grow">
          <section id="productos">
            <Productos searchTerm={searchTerm} /> {/* Pasamos el searchTerm a Productos */}
          </section>
        </main>

        <Footer />
      </div>
    </LenguajeProvider>
  );
}

export default App;
