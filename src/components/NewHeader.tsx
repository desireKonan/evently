import EventlyLogo from '@/assets/evently.svg'
import { Link } from 'react-router-dom'

export function Header() { 
    return (
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
    )
}