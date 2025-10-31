import React from 'react';
import { Ticket, Facebook, Twitter, Instagram } from 'lucide-react';
import { EventlyLogo } from '../icons/EventlyLogo';


const Footer: React.FC = () => {
  const socialIcons = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
  ];

  return (
    <footer className="bg-[#0b5651] border-t border-solid border-[var(--border-color)] mt-10">
      <div className="px-4 sm:px-10 md:px-20 lg:px-40 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo et description */}
          <div className="flex flex-col gap-4 items-start">
            <a className="flex items-center gap-3 text-white" href="#">
              <EventlyLogo />
              <h2 className="text-white text-2xl font-bold leading-tight tracking-[-0.015em]">
                Evently
              </h2>
            </a>
            <p className="text-white text-sm">
              La plateforme de référence pour des expériences inoubliables.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold tracking-wider">Navigation</h3>
            <nav className="flex flex-col gap-3">
              {['À propos', 'Fonctionnalités', 'Découvrir', 'Pour les organisateurs'].map((item) => (
                <a
                  key={item}
                  className="text-white hover:text-white text-sm font-medium leading-normal transition-colors"
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold tracking-wider">Support</h3>
            <nav className="flex flex-col gap-3">
              {['Contactez-nous', 'FAQ', 'Conditions d\'utilisation', 'Politique de confidentialité'].map((item) => (
                <a
                  key={item}
                  className="text-white hover:text-white text-sm font-medium leading-normal transition-colors"
                  href="#"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Réseaux sociaux */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold tracking-wider">Suivez-nous</h3>
            <div className="flex items-center gap-4">
              {socialIcons.map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="text-white hover:text-[var(--primary-color)] transition-colors"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white mt-12 pt-8 text-white text-center">
          <p>© {new Date().getFullYear()} Evently. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;