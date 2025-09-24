import { getDate } from '@/lib/date';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-6 px-10">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-gray-500">
          © {getDate()} Evently. Tous droits réservés.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
            Conditions d'utilisation
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
            Politique de confidentialité
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;