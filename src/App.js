

import React from 'react';
import NasaImageSearch from './components/NasaImageSearch';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<NasaImageSearch />} />
          {}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
