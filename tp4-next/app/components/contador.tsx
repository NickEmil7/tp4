"use client";
import React, { useState, useEffect } from 'react';
import { fetchData, updateData } from '../services/button';

const Contador = () => {
  const [count, setCount] = useState(0);

  // Función para incrementar el contador y actualizar la base de datos
  const increment = async () => {
    const newCount = count + 1;
    setCount(newCount);
    await updateData(newCount);
  };

  // Obtener el valor inicial del contador de la base de datos
  useEffect(() => {
    const getCount = async () => {
      const data = await fetchData();
      if (data && data.valor !== undefined) {
        setCount(data.valor);
      }
    };
    getCount();
  }, []);

  console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8">
        <p className="text-2xl font-semibold mb-4 text-black">Contador: {count}</p>
        <button
          onClick={increment}
          className="px-4 py-2 bg-orange-500 text-white font-bold rounded hover:bg-orange-700 transition duration-300"
        >
          Incrementar
        </button>
      </div>
    </div>
  );
};

export default Contador;

