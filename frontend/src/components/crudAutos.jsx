import React, { useEffect, useState } from 'react';
import api from '../assets/api/api';
import { Link } from 'react-router-dom';

const CrudAutos = () => {
  const [autos, setAutos] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', HP: '', Torque: '', Agarre: '', Precio: '', rareza: '' });
  const [searchId, setSearchId] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchAutos = async () => {
    try {
      const data = await api.get('/autos');
      setAutos(data);
    } catch (error) {
      console.error('Error cargando autos', error);
    }
  };

  useEffect(() => {
    fetchAutos();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchId.trim()) {
      fetchAutos();
      return;
    }

    try {
      const auto = await api.get(`/autos/${searchId}`);
      setAutos([auto]);
    } catch (error) {
      alert(error.message || 'No se pudo buscar el auto');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/autos/${editId}`, formData);
        setEditId(null);
      } else {
        await api.post('/autos', formData);
      }

      setFormData({ nombre: '', HP: '', Torque: '', Agarre: '', Precio: '', rareza: '' });
      setSearchId('');
      fetchAutos();
    } catch (error) {
      alert(error.message || 'Error en el servidor');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Seguro que quieres eliminarlo?')) {
      await api.delete(`/autos/${id}`);
      fetchAutos();
    }
  };

  const startEdit = (a) => {
    setEditId(a.id);
    setFormData({ nombre: a.nombre, HP: a.HP, Torque: a.Torque, Agarre: a.Agarre, Precio: a.Precio, rareza: a.rareza });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/home">volver</Link>
      <Link to="/shop">Shop</Link>
      <h2>CRUD de Autos (MySQL)</h2>

      <form onSubmit={handleSearch}>
        <input
          placeholder="Buscar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="submit">Buscar</button>
        <button type="button" onClick={fetchAutos}>Mostrar todos</button>
      </form>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        />
        <input
          placeholder="HP"
          value={formData.HP}
          onChange={(e) => setFormData({ ...formData, HP: e.target.value })}
        />
        <input
          placeholder="Torque"
          value={formData.Torque}
          onChange={(e) => setFormData({ ...formData, Torque: e.target.value })}
        />
        <input
          placeholder="Agarre"
          value={formData.Agarre}
          onChange={(e) => setFormData({ ...formData, Agarre: e.target.value })}
        />
        <input
          placeholder="Precio"
          value={formData.Precio}
          onChange={(e) => setFormData({ ...formData, Precio: e.target.value })}
        />
        <input
          placeholder="Rareza"
          value={formData.rareza}
          onChange={(e) => setFormData({ ...formData, rareza: e.target.value })}
        />
        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setFormData({ nombre: '', HP: '', Torque: '', Agarre: '', Precio: '', rareza: '' });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <hr />

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>HP</th>
            <th>Torque</th>
            <th>Agarre</th>
            <th>Precio</th>
            <th>Rareza</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {autos.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.nombre}</td>
              <td>{a.HP}</td>
              <td>{a.Torque}</td>
              <td>{a.Agarre}</td>
              <td>{a.Precio}</td>
              <td>{a.rareza}</td>
              <td>
                <button onClick={() => startEdit(a)}>Editar</button>
                <button onClick={() => handleDelete(a.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudAutos;
