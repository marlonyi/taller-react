import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Carros() {
  const navigate = useNavigate();
  const [carros, setCarros] = useState<{ id: number; marca: string; modelo: string; autonomia: string; }[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      // Simulamos datos de carros
      setCarros([
        { id: 1, marca: 'Tesla', modelo: 'Model S', autonomia: '652 km' },
        { id: 2, marca: 'Nissan', modelo: 'Leaf', autonomia: '384 km' },
        { id: 3, marca: 'BYD', modelo: 'Han EV', autonomia: '550 km' }
      ]);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Mis Carros Eléctricos</h2>
      <button onClick={handleLogout} style={{ marginBottom: 20 }}>Cerrar Sesión</button>
      <ul>
        {carros.map(carro => (
          <li key={carro.id}>
            <strong>{carro.marca}</strong> - {carro.modelo} ({carro.autonomia})
          </li>
        ))}
      </ul>
    </div>
  );
}
