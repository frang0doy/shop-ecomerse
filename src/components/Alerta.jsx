import { CheckIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

export default function Alerta({ mensaje, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (mensaje) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose(); // Cierra la alerta después de 3 segundos
      }, 3000); // La alerta se cierra después de 3 segundos

      return () => clearTimeout(timer);
    }
  }, [mensaje, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-[72px] left-1/2 transform -translate-x-1/2 z-50 w-96 p-4 bg-green-500 text-white rounded-lg shadow-lg flex items-center justify-between space-x-4">
      <CheckIcon className="h-6 w-6 text-white" />
      <span className="flex-1 text-center">{mensaje}</span>
      <button onClick={() => setVisible(false)} className="text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
