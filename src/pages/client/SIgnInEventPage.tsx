import { useState } from 'react';

const SignInEventPage = () => {
  const [ticketCount, setTicketCount] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Marie Dubois',
    email: 'marie.dubois@email.com',
    phone: '',
    createAccount: false,
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    promoCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const ticketPrice = 45.00;
  const serviceFee = 3.50;
  const subtotal = ticketPrice * ticketCount;
  const total = subtotal + serviceFee;

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTicketChange = (increment: number) => {
    const newCount = ticketCount + increment;
    if (newCount >= 1 && newCount <= 10) {
      setTicketCount(newCount);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Logique de soumission du formulaire
    console.log('Données du formulaire:', formData);
    console.log('Nombre de tickets:', ticketCount);
    console.log('Méthode de paiement:', paymentMethod);
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 min-h-screen">
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 px-4 md:px-10 py-3 bg-white dark:bg-background-dark/50 sticky top-0 z-10 backdrop-blur-sm">
          <div className="flex items-center gap-4 text-slate-900 dark:text-white">
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">EventApp</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-sm font-medium leading-normal text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
                href="#">
                <span className="hidden md:inline">Retour à l'événement</span>
                <span aria-label="Retour à l'événement" className="material-symbols-outlined md:hidden">arrow_back</span>
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 md:px-10 flex flex-1 justify-center py-5 md:py-10">
          <div className="flex flex-col w-full max-w-6xl flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
                Finalisez votre commande
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-6">
              {/* Left Column - Summary */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                  <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
                    Récapitulatif
                  </h2>
                  <div className="flex flex-col gap-4 rounded-lg">
                    <div 
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                      style={{
                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDoRwktBq7K2jr4TbceMxWs8TBilk9-jxN2bAQPZIHXxDU-JB4SEd0v2q2vwH1HAvDTmH2-UfANIUOKZczo4I8fFSHv-irXi3z2PxOJG6YAzEb0WzRXYL2U6jQEQKOP_ZE28lWTPp51kwVfwVeHsYjkJpJgA9wxjFQ8mOrx1YiNa2EHx5NSxS40-QS7mfto2I2D0cwhwYt57kLSYix9-Tv1Fn7dHW2UuQQnBfCHj-zPbgKO98lx8ltnwBcThhZzfZn4uCto6PKXU3o")'
                      }}
                    ></div>
                    <div className="flex flex-col gap-1">
                      <p className="text-slate-900 dark:text-white text-base font-bold leading-tight">
                        Festival de Musique Électronique
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                        Sam. 28 Octobre 2024 à 19:00
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                        Grand Parc de la Ville, Paris
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-4">
                    <div className="flex gap-4 py-3 justify-between items-center">
                      <div className="flex items-start gap-4">
                        <div className="text-primary flex items-center justify-center rounded-lg bg-primary/20 shrink-0 size-12">
                          <span className="material-symbols-outlined">confirmation_number</span>
                        </div>
                        <div className="flex flex-1 flex-col justify-center">
                          <p className="text-slate-900 dark:text-white text-base font-medium leading-normal">
                            Billet Standard
                          </p>
                          <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                            45,00 € / billet
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0">
                        <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                          <button
                            onClick={() => handleTicketChange(-1)}
                            className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                          >
                            -
                          </button>
                          <input
                            className="text-base font-medium leading-normal w-4 p-0 text-center bg-transparent focus:outline-0 focus:ring-0 focus:border-none border-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            type="number"
                            value={ticketCount}
                            onChange={(e) => setTicketCount(parseInt(e.target.value) || 1)}
                            min="1"
                            max="10"
                          />
                          <button
                            onClick={() => handleTicketChange(1)}
                            className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-slate-200 dark:border-slate-800 pt-4 flex flex-col gap-2">
                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                      <span>Sous-total</span>
                      <span>{subtotal.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                      <span>Frais de service</span>
                      <span>{serviceFee.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white mt-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                      <span>Total</span>
                      <span>{total.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>

                <footer className="text-center text-xs text-slate-500 dark:text-slate-500 px-6">
                  <a className="hover:underline" href="#">Conditions Générales</a> •{' '}
                  <a className="hover:underline" href="#">Politique de Confidentialité</a>
                  <p className="mt-2 flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-base">lock</span> Paiement 100% sécurisé
                  </p>
                </footer>
              </div>

              {/* Right Column - Forms */}
              <div className="lg:col-span-3 flex flex-col gap-8">
                {/* Buyer Information */}
                <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                  <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-5">
                    1. Informations de l'acheteur
                  </h2>
                  <div className="mb-6 space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Nombre de tickets</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{ticketCount}</span>
                    </div>
                  </div>
                  <form className="flex flex-col gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="name">
                        Nom complet
                      </label>
                      <input
                        className="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/50 text-sm"
                        id="name"
                        name="name"
                        placeholder="Marie Dubois"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
                        Adresse e-mail
                      </label>
                      <input
                        className="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/50 text-sm"
                        id="email"
                        name="email"
                        placeholder="marie.dubois@email.com"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="phone">
                        Contact (numéro de téléphone)
                      </label>
                      <input
                        className="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/50 text-sm"
                        id="phone"
                        name="phone"
                        placeholder="+33 6 12 34 56 78"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mt-2 flex items-center">
                      <input
                        className="size-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary/50 bg-slate-100 dark:bg-slate-800"
                        id="create-account-checkbox"
                        name="createAccount"
                        type="checkbox"
                        checked={formData.createAccount}
                        onChange={handleInputChange}
                      />
                      <label className="ml-2 text-sm text-slate-700 dark:text-slate-300" htmlFor="create-account-checkbox">
                        Créer un compte pour un suivi plus facile de vos commandes.
                      </label>
                    </div>
                  </form>
                </div>

                {/* Payment */}
                <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                  <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-5">
                    2. Paiement
                  </h2>
                  <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 p-1 mb-6">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-md ${
                        paymentMethod === 'card' 
                          ? 'bg-primary text-white' 
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">credit_card</span>
                      Carte
                    </button>
                    <button
                      onClick={() => setPaymentMethod('paypal')}
                      className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-md ${
                        paymentMethod === 'paypal' 
                          ? 'bg-primary text-white' 
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.485 15.023c.373.287.828.455 1.34.455h.338c.386 0 .736-.233.882-.584l.972-2.31c.108-.258.41-.258.518 0l.972 2.31c.146.35.496.584.882.584h.338c.512 0 .967-.168 1.34-.455.746-.575 1.05-1.554.808-2.45l-1.3-4.832c-.11-.41-.476-.693-.9-.693h-4.3c-.424 0-.79.283-.9.694l-1.3 4.832c-.242.896.062 1.875.808 2.45zM22.5 14.155c-.242.896-.948 1.543-1.808 1.543h-.338c-.386 0-.736-.233-.882-.584l-.972-2.31c-.108-.258-.41-.258-.518 0l-.972 2.31c-.146.35-.496.584-.882.584h-.338c-.86 0-1.566-.647-1.808-1.543l-1.36-5.04c-.11-.41.2-.816.633-.816h4.3c.434 0 .742.405.633.816l-1.36 5.04zM2.5 15.698h.338c.386 0 .736-.233.882-.584l.972-2.31c.108-.258.41-.258.518 0l.972 2.31c.146.35.496.584.882.584h.338c.86 0 1.566-.647 1.808-1.543l1.36-5.04c.11-.41-.2-.816-.633-.816h-4.3c-.434 0-.742.405-.633.816l-1.36 5.04c-.242.896.464 1.543 1.324 1.543z"></path>
                      </svg>
                      PayPal
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <form className="flex flex-col gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="card-name">
                          Nom sur la carte
                        </label>
                        <input
                          className="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/50 text-sm"
                          id="card-name"
                          name="cardName"
                          placeholder="Marie Dubois"
                          type="text"
                          value={formData.cardName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="card-number">
                          Numéro de carte
                        </label>
                        <div className="relative mt-1">
                          <input
                            className="block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/50 text-sm pl-4 pr-10"
                            id="card-number"
                            name="cardNumber"
                            placeholder="4974 2400 0000 0000"
                            type="text"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                          />
                          <span className="material-symbols-outlined absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                            credit_card
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="expiry-date">
                            Expiration
                          </label>
                          <input
                            className="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/50 text-sm"
                            id="expiry-date"
                            name="expiryDate"
                            placeholder="MM/AA"
                            type="text"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="cvc">
                            CVC
                          </label>
                          <input
                            className="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/50 text-sm"
                            id="cvc"
                            name="cvc"
                            placeholder="123"
                            type="text"
                            value={formData.cvc}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="relative mt-2">
                        <input
                          className="peer h-10 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 text-sm text-slate-900 dark:text-white placeholder-transparent outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/50"
                          id="promo-code"
                          name="promoCode"
                          placeholder="Code promotionnel"
                          type="text"
                          value={formData.promoCode}
                          onChange={handleInputChange}
                        />
                        <label
                          className="absolute -top-2 left-2 -translate-y-1/2 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900/50 px-1 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary"
                          htmlFor="promo-code"
                        >
                          Code promotionnel
                        </label>
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm font-semibold text-primary hover:text-primary/80"
                        >
                          Appliquer
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-primary text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors focus:ring-4 focus:ring-primary/50"
                >
                  Payer {total.toFixed(2)} € et finaliser
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignInEventPage;