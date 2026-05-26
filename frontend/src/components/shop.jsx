import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../assets/api/api'; // Tu helper de Axios personalizado

const TiendaAutos = () => {
  const [autos, setAutos] = useState([]);

  // Traer los autos de la Base de Datos local al cargar el componente
  useEffect(() => {
    const cargarAutos = async () => {
      try {
        const data = await api.get('/autos');
        setAutos(data);
      } catch (error) {
        console.error('Error al cargar la tienda de autos', error);
      }
    };
    cargarAutos();
  }, []);

  // Función para manejar el clic del botón de compra
  const handleComprar = async (autoId) => {
    try {
      alert(`Compra del auto ${autoId} realizada`);
      // Aquí iría la lógica de compra cuando el backend lo implemente
    } catch (error) {
      alert('Ocurrió un error inesperado');
    }
  };

  return (
    
    <div className="tienda-container">
        <button type="button">
      <Link to="/home">home</Link>
    </button>
      {/* Tu grid original de autos en JSX */}
      {autos.map((auto) => (
        <div key={auto.id} className="auto-card">
          <span className="badge-rareza">{auto.rareza}</span>
          <h3>{auto.nombre}</h3>
          <p>⚡ {auto.HP} HP</p>
          <button onClick={() => handleComprar(auto.id)}>
            ${auto.Precio}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TiendaAutos;