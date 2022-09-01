import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//components
import { AddCar, CarPage, Dashboard } from './components';

function App() {
  return (
    <div className="container__app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/car/:car_id" element={<CarPage />} />
          <Route exact path="/new" element={<AddCar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
