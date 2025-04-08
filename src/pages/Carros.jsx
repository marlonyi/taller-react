import { useEffect, useState } from 'react';

export default function Carros() {
  const [carros, setCarros] = useState([]);

  useEffect(() => {
    const fetchCarros = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('https://carros-electricos.wiremockapi.cloud/carros', {
          headers: {
            Authentication: token,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los carros');
        }

        const data = await response.json();
        setCarros(data);
      } catch (error) {
        console.error('Error:', error);
        alert('No se pudo cargar la lista de carros.');
      }
    };

    fetchCarros();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Mis Carros Eléctricos</h1>
      <div className="space-y-4">
        {carros.map((carro, index) => (
          <div key={index} className="flex bg-white p-4 rounded-lg shadow items-center">
            <div className="w-20 h-20 bg-gray-300 flex items-center justify-center rounded mr-4">
              Foto
            </div>
            <div>
              <p><strong>Placa:</strong> {carro.placa}</p>
              <p><strong>Conductor:</strong> {carro.conductor}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
