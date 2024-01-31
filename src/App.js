// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/screens/Home';
import ShowDetails from '../src/screens/ShowDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
