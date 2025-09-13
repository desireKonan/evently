import React from 'react';
import { useNavigate } from 'react-router-dom';

// types/order.ts
export interface Ticket {
  id: number;
  name: string;
  event: string;
  price: string;
  image: string;
}

export interface OrderDetails {
  referenceNumber: string;
  orderDate: string;
  totalAmount: string;
  tickets: Ticket[];
}

const ConfirmationPayment: React.FC = () => {

  const navigate = useNavigate();
  
  const handleReturnHome = () => navigate('/');
  // Données de la commande (pourraient venir d'un état ou de props)
  const orderDetails = {
    referenceNumber: '#123456789',
    orderDate: '15 mai 2024',
    totalAmount: '50,00 €',
    tickets: [
      {
        id: 1,
        name: 'Billet standard x2',
        event: 'Concert de musique électronique',
        price: '50,00 €',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpFL5400KXKw-BsoN1DUO3U9K4JzG4u3uWeClSpEVxKvzDkNjaNO1ZDRvfifMF_YtmdfEgjLA_bV7OMChlrBrMTst6maCykLrSnm0FBNrjAlgzKkq1s1w7qDOcyWywuMc7zsZezOgyf0X9YPwP9Nu1XTQD7BqC0IxxKq3fzYxBOlMHbhA8GsfR9dZcKfoKmmRr41bDCoGCHWzdwEJxjmox04OrYSiLncDNVUH77mCHGAkNBs8m96WwLnHnVRjgH7oq8Jyc4dkPIRc'
      }
    ]
  };

  const handleDownloadTickets = () => {
    // Logique pour télécharger les billets
    console.log('Téléchargement des billets...');
  };

  return (
    <div className="bg-[#ecf0f1] min-h-screen text-gray-800" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <div className="relative flex flex-col min-h-screen overflow-x-hidden">
        <div className="layout-container flex flex-col grow">
          {/* Header */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-300 px-10 py-4 bg-white">
            <div className="flex items-center gap-4 text-gray-900">
              <div className="size-8 text-[#27ae60]">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
                </svg>
              </div>
              <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-[-0.015em]">Eventify</h2>
            </div>
            
            <div className="flex flex-1 justify-end gap-6">
              <nav className="flex items-center gap-8">
                <a className="text-gray-600 hover:text-[#16a085] text-sm font-medium leading-normal" href="#">
                  Accueil
                </a>
                <a className="text-gray-600 hover:text-[#16a085] text-sm font-medium leading-normal" href="#">
                  Explorer
                </a>
                <a className="text-gray-600 hover:text-[#16a085] text-sm font-medium leading-normal" href="#">
                  Mes événements
                </a>
              </nav>
              
              <div className="flex items-center gap-4">
                <button className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-[#16a085]">
                  <span className="material-symbols-outlined">notifications</span>
                </button>
                
                <div 
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDWGvylBxizL8zj1WvuOeRuv-bVIgiE0QG0aWVD95qWp6voyr2T17NRbJ0pw7JI_1ywRNxkVh7S1hnVF0JSYRHqs7JOzJgOpfGA2Xu7PS0HyTIhQ0LHPLF69gR01MZgpEWnfZyAKPZo5BYzCwhECkwZeP99I-VTdQxgE_OvJDmAHPKw8sulH4GcbBieqWZnrZUbyX0AMbc9CyLFY7Mnc_eA5ItNYIq_tnG7hQ8eEKWxi_Uh7iwg2sxvgvSIHuFq6OZWERzSRmq868A")' }}
                ></div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex flex-1 justify-center py-16 px-4">
            <div className="flex w-full max-w-2xl flex-col items-center">
              {/* Icone de confirmation */}
              <div className="flex flex-col items-center justify-center rounded-full bg-[#27ae60] bg-opacity-20 size-20 mb-6">
                <span className="material-symbols-outlined text-4xl text-[#27ae60]">check</span>
              </div>
              
              {/* Titre et message */}
              <h1 className="text-gray-900 text-4xl font-bold leading-tight tracking-tight text-center mb-4">
                Votre commande est confirmée !
              </h1>
              
              <p className="text-gray-600 text-lg font-normal leading-normal text-center max-w-lg mb-8">
                Merci pour votre achat. Un e-mail de confirmation avec les détails de votre commande a été envoyé à votre adresse.
              </p>
              
              {/* Récapitulatif de la commande */}
              <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-[-0.015em] mb-6">
                  Récapitulatif de la commande
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-sm font-normal leading-normal">Numéro de référence</p>
                    <p className="text-gray-800 text-sm font-medium leading-normal">{orderDetails.referenceNumber}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-sm font-normal leading-normal">Date de la commande</p>
                    <p className="text-gray-800 text-sm font-medium leading-normal">{orderDetails.orderDate}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-sm font-normal leading-normal">Montant total</p>
                    <p className="text-gray-800 text-sm font-bold leading-normal text-[#16a085]">{orderDetails.totalAmount}</p>
                  </div>
                </div>
                
                <hr className="border-gray-200 my-6" />
                
                <h3 className="text-gray-900 text-lg font-bold leading-tight tracking-[-0.015em] mb-4">
                  Détails des billets
                </h3>
                
                {orderDetails.tickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center gap-4">
                    <div 
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-md size-16 shrink-0" 
                      style={{ backgroundImage: `url("${ticket.image}")` }}
                    ></div>
                    
                    <div className="flex-grow">
                      <p className="text-gray-900 text-base font-medium leading-normal">{ticket.name}</p>
                      <p className="text-gray-500 text-sm font-normal leading-normal">{ticket.event}</p>
                    </div>
                    
                    <p className="text-gray-900 text-base font-bold leading-normal">{ticket.price}</p>
                  </div>
                ))}
              </div>
              
              {/* Boutons d'action */}
              <div className="flex w-full gap-4">
                <button 
                  onClick={handleDownloadTickets}
                  className="flex flex-1 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md h-12 px-6 bg-[#16a085] text-white text-base font-bold leading-normal tracking-wide shadow-sm hover:bg-opacity-90"
                >
                  <span className="material-symbols-outlined">download</span>
                  <span className="truncate">Télécharger les billets</span>
                </button>
                
                <button 
                  onClick={handleReturnHome}
                  className="flex flex-1 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md h-12 px-6 bg-white text-gray-800 text-base font-bold leading-normal tracking-wide border border-gray-300 hover:bg-gray-100"
                >
                  <span className="truncate">Retour à l'accueil</span>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPayment;