import React, { useEffect, useState } from 'react';
import api from '../assets/api/api';
import { Link } from 'react-router-dom';

const CrudPiezas = () => {
  const [piezas, setPiezas] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', HP: '', Torque: '', Agarre: '', Precio: '' });
  const [searchId, setSearchId] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchPiezas = async () => {
    try {
      const data = await api.get('/piezas');
      setPiezas(data);
    } catch (error) {
      console.error('Error cargando piezas', error);
    }
  };

  useEffect(() => {
    fetchPiezas();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchId.trim()) {
      fetchPiezas();
      return;
    }

    try {
      const pieza = await api.get(`/piezas/${searchId}`);
      setPiezas([pieza]);
    } catch (error) {
      alert(error.message || 'No se pudo buscar la pieza');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/piezas/${editId}`, formData);
        setEditId(null);
      } else {
        await api.post('/piezas', formData);
      }

      setFormData({ nombre: '', HP: '', Torque: '', Agarre: '', Precio: '' });
      setSearchId('');
      fetchPiezas();
    } catch (error) {
      alert(error.message || 'Error en el servidor');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Seguro que quieres eliminarlo?')) {
      await api.delete(`/piezas/${id}`);
      fetchPiezas();
    }
  };

  const startEdit = (p) => {
    setEditId(p.id);
    setFormData({ nombre: p.nombre, HP: p.HP, Torque: p.Torque, Agarre: p.Agarre, Precio: p.Precio });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/home">volver</Link>
      <Link to="/shop">Shop</Link>
      <h2>CRUD de Piezas (MySQL)</h2>

      <form onSubmit={handleSearch}>
        <input
          placeholder="Buscar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="submit">Buscar</button>
        <button type="button" onClick={fetchPiezas}>Mostrar todos</button>
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
        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setFormData({ nombre: '', HP: '', Torque: '', Agarre: '', Precio: '' });
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {piezas.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.HP}</td>
              <td>{p.Torque}</td>
              <td>{p.Agarre}</td>
              <td>{p.Precio}</td>
              <td>
                <button onClick={() => startEdit(p)}>Editar</button>
                <button onClick={() => handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudPiezas;
