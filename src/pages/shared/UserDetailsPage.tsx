// UserDetail.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// Interface pour les props du composant (si nécessaire)
interface UserDetailProps {
  // Vous pouvez ajouter des props ici si nécessaire
}

const UserDetail: React.FC<UserDetailProps> = () => {
  return (
    <div className="bg-gray-950 text-white" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden">
        <Header />
        <MainContent />
      </div>
    </div>
  );
};

// Composant Header
const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-800 px-10 py-4">
      <div className="flex items-center gap-4">
        <svg className="h-8 w-8 text-[var(--primary-600)]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
        </svg>
        <h1 className="text-xl font-bold">Eventify</h1>
      </div>
      <nav className="flex items-center gap-8">
        <Link className="text-sm font-medium text-gray-300 transition-colors hover:text-white" to="/explore">Explorer</Link>
        <Link className="text-sm font-medium text-gray-300 transition-colors hover:text-white" to="/">Mes événements</Link>
        <Link className="text-sm font-medium text-gray-300 transition-colors hover:text-white" to="/create/event">Créer un événement</Link>
      </nav>
      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white">
          <span className="material-symbols-outlined"> notifications </span>
        </button>
        <div className="h-10 w-10 rounded-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuADp85gWKE-i2bx1YNU6VVQfg5o4eU3VlIfoLcmTwpz7lByC4hiI0Otts-QqurYv41ZX9UOBylDOyvSV9W0l1k0VVFRfpuBQLGQwAVUoqBTUkGfLJ4WqOh3iPsOXQWYiil4xEQY3wW2SWDMX8mpkkGJULzsnnX2__r2iu9Ojqgx1KZsfFgD9Kf5wSWIySqroyW6WZKHq9oFPIASMN_RFQT5Usne6ljWgWjsvB8CZijRlbK71wsSiZB4kt63J_TnhGjAk33TkB66Sow")' }}></div>
      </div>
    </header>
  );
};

// Composant MainContent
const MainContent: React.FC = () => {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-12">
        <h1 className="text-4xl font-bold tracking-tight">Mon profil</h1>
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          <div className="flex flex-1 flex-col gap-8">
            <UserProfile />
            <UserTickets />
          </div>
          <div className="flex w-full flex-col gap-8 md:w-80">
            <QRCodeSection />
            <AccountManagement />
          </div>
        </div>
      </div>
    </main>
  );
};

// Composant UserProfile
const UserProfile: React.FC = () => {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
      <div className="flex items-center gap-6">
        <div className="h-24 w-24 rounded-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDnMRJ95OIATf0B0r4D_Eq84WaBwJsk_gxlz_skmZqa4j9KmP3uAN8OyVXxiiLB9oIhYi0jk0roomVCYAhXF9wtE7qKmyyA_6CftiwA6WIugSJ5aabw4uK_uSnBPwoNOMhYgP7e-prunfxQTaQ-0aCwgH4dOPmJwXODzR88ZGqmzlDnyuxDZv9gGKDJmzWCwUIS42jhNIsKzPzIZ8-nnnM5_pIOdcZsXB4ZtAw4R0ytkZoxG4LlBdQxPLgMsCYn6KXZMGq7ZSa1qL8")' }}></div>
        <div className="space-y-1">
          <p className="text-2xl font-bold">Sophie Martin</p>
          <p className="text-gray-400">sophie.martin@email.com</p>
        </div>
      </div>
    </div>
  );
};

// Composant UserTickets
const UserTickets: React.FC = () => {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-6 text-xl font-bold">Mes billets</h2>
      <div className="flex flex-col items-center justify-center gap-6 rounded-lg border-2 border-dashed border-gray-700 p-12 text-center">
        <img alt="No tickets illustration" className="w-full max-w-xs object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIBWc8dh_Dbkq2ETxLLNTmxJz5nNn7KdcOTHFJypyYjBX3Fu4cGZ-0DxhsfDMQ0rBQtOQjSDMZqVA55az2OFdu5v7Jvv1gkc3v-WeR0xyL-heTfjGRGz3KyzJUqED0A04-RntNaRToLL6em8VSne32XxQEL7JRG4fo4Q7yoKegLwyPIXswNbIXvWwcIzNCvlz3Ki51Nsv7-QAE05ZmhzBFuUEpiU_BFpaYe5VMOE1RlZMBcHNKBWj-K5YbFk8F3jSnPL2hSQrqitQ" />
        <div className="space-y-2">
          <p className="text-lg font-semibold">Aucun billet trouvé</p>
          <p className="max-w-md text-sm text-gray-400">Vous n'avez pas encore de billets. Explorez les événements et trouvez votre prochaine aventure.</p>
        </div>
      </div>
    </div>
  );
};

// Composant QRCodeSection
const QRCodeSection: React.FC = () => {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-xl font-bold">Code QR personnel</h2>
      <div className="flex justify-center">
        <div className="rounded-lg bg-white p-2">
          <img alt="Personal QR Code" className="h-48 w-48 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvZIRs8_-foW2IcNZPRtYpjqRFb9aTlhzpi6gpnzJmweL-yynAM18BLYUzefBZGUNvOd4OcPonOhh78I-FEAfmjPSWM7faGirhswLNcZKeMRVxt2z3TRFmaECliMc-tPwUsZyq55ijxIdtydtbouzjDSaiGJWA2ReJyou3zYmnVJDfQ9TIkmVaxRL_hiNRRIh8g5nqgcPQ70Vtiew4dbXUE4Kbr-ve6JJ6NPjBtV04oXnJVxt2Zv6sjtV-qzhJ9IINBjc5okKPRQo" />
        </div>
      </div>
    </div>
  );
};

// Composant AccountManagement
const AccountManagement: React.FC = () => {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900">
      <h2 className="border-b border-gray-800 p-6 text-xl font-bold">Gestion du compte</h2>
      <div className="divide-y divide-gray-800">
        <a className="group flex items-center justify-between p-4 transition-colors hover:bg-gray-800" href="#">
          <span className="text-sm">Modifier le profil</span>
          <span className="material-symbols-outlined text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-white"> chevron_right </span>
        </a>
        <a className="group flex items-center justify-between p-4 transition-colors hover:bg-gray-800" href="#">
          <span className="text-sm">Paramètres</span>
          <span className="material-symbols-outlined text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-white"> chevron_right </span>
        </a>
        <a className="group flex items-center justify-between p-4 transition-colors hover:bg-gray-800" href="#">
          <span className="text-sm">Aide et support</span>
          <span className="material-symbols-outlined text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-white"> chevron_right </span>
        </a>
      </div>
      <div className="p-4">
        <button className="w-full rounded-md bg-[var(--primary-600)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--primary-700)]">
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default UserDetail;