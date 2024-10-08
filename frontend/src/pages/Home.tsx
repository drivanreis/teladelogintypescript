// src/pages/Home.tsx

import React from 'react';
import './Home.css'; // Importando estilos da página
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default Home;
