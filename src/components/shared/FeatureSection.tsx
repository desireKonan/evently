import { LandingCard } from "../LandingCard";
import { LandingIcon } from "./IconMapping";

export const FeaturesSection = () => {
  const features = [
    {
      icon: 'confirmation_number' as const,
      title: 'Pour les Consommateurs',
      description: 'Vivez pleinement chaque instant. Avec Evently, l\'accès à vos passions n\'a jamais été aussi simple.',
      items: [
        'Achat de billets rapide et sécurisé',
        'Recommandations personnalisées',
        'Calendrier d\'événements intégré',
        'Partage facile avec vos amis'
      ]
    },
    {
      icon: 'campaign' as const,
      title: 'Pour les Organisateurs',
      description: 'Créez, gérez et promouvez vos événements pour atteindre le succès que vous méritez.',
      items: [
        'Tableau de bord de ventes en temps réel',
        'Outils de marketing et promotion',
        'Gestion facile des participants',
        'Analyses et rapports détaillés'
      ],
      highlighted: true
    },
    {
      icon: 'admin_panel_settings' as const,
      title: 'Pour les Administrateurs',
      description: 'Supervisez l\'ensemble de la plateforme avec des outils puissants pour une gestion optimale.',
      items: [
        'Vue d\'ensemble de l\'activité',
        'Gestion des utilisateurs et des permissions',
        'Validation et modération des événements',
        'Support technique et maintenance'
      ]
    }
  ];

  return (
    <section className="px-4 sm:px-10 md:px-20 lg:px-40 py-10 sm:py-20 bg-black/20" id="features">
      <div className="text-center mb-16">
        <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
          Une plateforme conçue pour{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)]">
            tous
          </span>
        </h2>
        <p className="text-[var(--text-secondary)] text-lg mt-2 max-w-3xl mx-auto">
          Que vous soyez participant, organisateur ou administrateur, découvrez les fonctionnalités qui transformeront votre expérience événementielle.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <LandingCard 
            key={index} 
            variant={feature.highlighted ? 'highlighted' : 'default'}
            className="flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center size-12 bg-[var(--primary-color)]/20 rounded-full">
                <LandingIcon 
                  name={feature.icon} 
                  className="text-3xl text-[var(--primary-color)]" 
                  size={32}
                />
              </div>
              <h3 className="text-white text-2xl font-bold">{feature.title}</h3>
            </div>
            
            <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-6">
              {feature.description}
            </p>
            
            <ul className="space-y-3 text-[var(--text-secondary)] mt-auto">
              {feature.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-center gap-3">
                  <LandingIcon 
                    name="check_circle" 
                    className="text-xl text-[var(--primary-color)]" 
                    size={20}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </LandingCard>
        ))}
      </div>
    </section>
  );
};