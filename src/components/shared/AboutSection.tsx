import { LandingCard } from "../LandingCard";
import { LandingIcon } from "./IconMapping";

export const AboutSection = () => {
  const features = [
    {
      icon: 'done_all' as const,
      title: 'Simplicité d\'utilisation',
      description: 'Une interface claire et épurée pour une navigation sans effort.'
    },
    {
      icon: 'groups' as const,
      title: 'Communauté engagée',
      description: 'Rejoignez des milliers d\'utilisateurs passionnés par les événements.'
    },
    {
      icon: 'security' as const,
      title: 'Transactions sécurisées',
      description: 'Achetez et vendez vos billets en toute confiance grâce à nos systèmes de paiement fiables.'
    }
  ];

  return (
    <section className="px-4 sm:px-10 md:px-20 lg:px-40 py-10 sm:py-20" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-[var(--secondary-color)] font-bold tracking-widest uppercase">
            Notre Mission
          </span>
          <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight tracking-tight mt-2 mb-6">
            Connecter les gens à travers des expériences uniques
          </h2>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-4">
            PMI Côte d'Ivoire Events est né d'une passion : celle de rassembler les gens autour d'événements qui marquent les esprits.
            Notre mission est de simplifier la découverte et la gestion d'événements pour tous.
          </p>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
            Notre proposition de valeur est simple : offrir une plateforme centralisée, intuitive et puissante.
          </p>
        </div>
        
        <LandingCard className="bg-[#3c6328]">
          <h3 className="text-white text-2xl font-bold mb-6 text-center">
            Pourquoi choisir PMI Côte d'Ivoire Events ?
          </h3>
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-4">
                <LandingIcon 
                  name={feature.icon} 
                  className="text-2xl text-[var(--primary-color)] mt-1" 
                  size={24}
                />
                <div>
                  <h4 className="font-bold text-white">{feature.title}</h4>
                  <p className="text-[var(--text-secondary)]">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </LandingCard>
      </div>
    </section>
  );
};