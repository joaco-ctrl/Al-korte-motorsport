import React, { useEffect, useState } from 'react';
import api from '../assets/api/api';
import { Link } from 'react-router-dom';

const Home = () => {
  

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/">Logout</Link>
      <Link to="/shop">Shop</Link>
      <h2>CRUD de Autos (MySQL)</h2>

      <Link to="/crudAutos">Gestionar Autos</Link>
      <br />
      <Link to="/crudPiezas">Gestionar Piezas</Link>
    </div>
  );
};

export default Home;
