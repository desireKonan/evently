import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EventlyLogo from '@/assets/evently.svg'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gérer la soumission du formulaire ici
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="relative flex flex-col min-h-screen bg-[#ecf0f1] overflow-x-hidden" style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}>
        <div className="layout-container flex flex-col grow">
          {/* Header */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#29382f] px-10 py-3">
            <div className="flex items-center gap-4 text-gray-800">
              <div className="size-6 text-[#38e07b]">
                <img src={EventlyLogo} />
              </div>
              <h2 className="text-gray-800 text-xl font-bold leading-tight tracking-[-0.015em]">Eventify</h2>
            </div>
            
            <div className="flex flex-1 justify-end gap-8">
              <nav className="flex items-center gap-9">
                <Link className="text-gray-800 hover:text-gray-400 text-base font-medium leading-normal transition-colors" to="/explore">
                  Explorer
                </Link>
                <Link className="text-gray-800 hover:text-gray-400 text-base font-medium leading-normal transition-colors" to="/create/event">
                  Créer un événement
                </Link>
                <Link className="text-gray-800 hover:text-gray-400 text-base font-medium leading-normal transition-colors" to="/confirmation">
                  Tarifs
                </Link>
              </nav>
              
              <div className="flex gap-2">
                <button className="flex min-w-[100px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-transparent border-2 border-[#27ae60] text-[#27ae60] hover:bg-[#27ae60] hover:text-[#111714] text-base font-bold leading-normal tracking-[0.015em] transition-colors">
                  <span className="truncate">S'inscrire</span>
                </button>
                <button className="flex min-w-[100px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-[#27ae60] text-[#111714] hover:bg-opacity-80 text-base font-bold leading-normal tracking-[0.015em] transition-colors">
                  <span className="truncate">Connexion</span>
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex flex-1 justify-center items-center py-10">
            <div className="flex flex-col w-full max-w-md p-8 rounded-2xl bg-primary shadow-2xl shadow-black/20">
              <h2 className="text-white text-3xl font-bold text-center mb-2">Connexion</h2>
              <p className="text-white/60 text-center mb-8">Accédez à votre compte organisateur.</p>
              
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label className="text-white text-base font-medium" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white bg-[#111714] border-2 border-[#3d5245] focus:border-[#27ae60] focus:ring-0 h-14 placeholder:text-white/40 p-4 text-base font-normal transition-colors"
                    id="email"
                    placeholder="exemple@email.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-white text-base font-medium" htmlFor="password">
                    Mot de passe
                  </label>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white bg-[#111714] border-2 border-[#3d5245] focus:border-[#27ae60] focus:ring-0 h-14 placeholder:text-white/40 p-4 text-base font-normal transition-colors"
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <a className="text-sm font-normal text-right text-white/60 hover:text-[#38e07b] hover:underline transition-colors" href="#">
                  Mot de passe oublié ?
                </a>
                
                <button
                  className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-4 bg-[#27ae60] text-[#111714] text-lg font-bold leading-normal tracking-[0.015em] hover:bg-opacity-80 transition-colors"
                  type="submit"
                >
                  <span className="truncate">Se connecter</span>
                </button>
                
                <p className="text-center text-sm font-normal text-white/60">
                  Vous n'avez pas de compte ?{" "}
                  <a className="font-medium text-[#27ae60] hover:underline" href="#">
                    Inscrivez-vous
                  </a>
                </p>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;