import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import type { EventClickArg, DateSelectArg, EventContentArg } from '@fullcalendar/core';

// Types pour les événements
interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end?: Date;
  color: string;
  extendedProps: {
    description?: string;
    location?: string;
  };
}

// Types pour les notifications
interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
}

const CalendarPage: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Données des événements
  const events: CalendarEvent[] = [
    { 
      id: 1, 
      title: 'Conférence Marketing', 
      start: new Date(2024, 6, 15, 10, 0), 
      end: new Date(2024, 6, 15, 12, 0),
      color: '#16a085',
      extendedProps: {
        description: 'Conférence sur les tendances du marketing digital',
        location: 'Salle A - Centre de conférences'
      }
    },
    { 
      id: 2, 
      title: 'Atelier Photo', 
      start: new Date(2024, 6, 20, 14, 0),
      end: new Date(2024, 6, 20, 17, 0),
      color: '#27ae60',
      extendedProps: {
        description: 'Atelier pratique de photographie pour débutants',
        location: 'Studio B - École des arts'
      }
    },
    { 
      id: 3, 
      title: 'Festival Musique', 
      start: new Date(2024, 6, 25, 18, 0),
      end: new Date(2024, 6, 26, 2, 0),
      color: '#f39c12',
      extendedProps: {
        description: 'Festival de musique avec artistes locaux et internationaux',
        location: 'Parc Central'
      }
    },
  ];

  // Données des notifications
  const notifications: Notification[] = [
    {
      id: 1,
      title: 'Nouveau billet vendu !',
      message: 'Jean Dupont a acheté un billet pour "Conférence sur le marketing numérique".',
      time: 'il y a 5 minutes',
    },
    {
      id: 2,
      title: 'Nouveau billet vendu !',
      message: 'Marie Claire a acheté un billet pour "Atelier de photographie".',
      time: 'il y a 2 heures',
    },
    {
      id: 3,
      title: 'Nouveau billet vendu !',
      message: 'Pierre Bernard a acheté un billet pour "Festival de musique".',
      time: 'il y a 1 jour',
    },
  ];

  // Gestionnaire de clic sur événement
  const handleEventClick = (clickInfo: EventClickArg) => {
    alert(`Événement: ${clickInfo.event.title}`);
  };

  // Gestionnaire de sélection de date
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt('Entrez le titre du nouvel événement:');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: Date.now().toString(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        color: '#16a085'
      });
    }
  };

  // Personnalisation du rendu des événements
  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div className="fc-event-main-frame">
        <div className="fc-event-title-container">
          <div className="fc-event-title fc-sticky">
            {eventInfo.event.title}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#ecf0f1] min-h-screen text-gray-800" style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}>
      <div className="relative flex flex-col min-h-screen overflow-x-hidden">
        <div className="layout-container flex flex-col grow">
          <div className="flex flex-1">
            {/* Sidebar */}
            <aside className="flex-shrink-0 w-64 bg-white p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <div 
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBuMCsLTAy64ceF0bWCDNUoRKnI0lEEg_ARhV-190r6dhURu6CFuoWycmb2pC0I5rgHFU-Mf8wsWCChNZRvoqRWOTxiHyqWpJ_WuYP9eAdCFPi82NbGzcrxkU-djU19tfo3LcAPiiDxXPLRmXXi4dQEluoujhVwbIxjW8RTSLQRk9h4BjqONFdHivJZWanO26V9btJTFlJsWcwAh3fHKkcDGoxzIgY9oCusFtVLNIJNIBUfk2DsZ2YmJYDZaksBOamGooQgHSuijkQ")' }}
                ></div>
                <div>
                  <h1 className="text-gray-900 text-base font-bold">Sophie Martin</h1>
                  <p className="text-gray-500 text-sm font-normal">Organisateur</p>
                </div>
              </div>
              
              <nav className="mt-8 flex flex-col gap-2">
                <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#16a085]" href="#">
                  <div className="text-gray-500 group-hover:text-[#16a085]">
                    <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                      <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Accueil</span>
                </a>
                
                <a className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#16a085] text-white" href="#">
                  <div className="text-white">
                    <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                      <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM112,184a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm56-8a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136a23.76,23.76,0,0,1-4.84,14.45L152,176ZM48,80V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80Z"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Événements</span>
                </a>
                
                <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#16a085]" href="#">
                  <div className="text-gray-500 group-hover:text-[#16a085]">
                    <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                      <path d="M227.19,104.48A16,16,0,0,0,240,88.81V64a16,16,0,0,0-16-16H32A16,16,0,0,0,16,64V88.81a16,16,0,0,0,12.81,15.67,24,24,0,0,1,0,47A16,16,0,0,0,16,167.19V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V167.19a16,16,0,0,0-12.81-15.67,24,24,0,0,1,0-47ZM32,167.2a40,40,0,0,0,0-78.39V64H88V192H32Zm192,0V192H104V64H224V88.8a40,40,0,0,0,0,78.39Z"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Billets</span>
                </a>
                
                <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#16a085]" href="#">
                  <div className="text-gray-500 group-hover:text-[#16a085]">
                    <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                      <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Finance</span>
                </a>
                
                <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#16a085]" href="#">
                  <div className="text-gray-500 group-hover:text-[#16a085]">
                    <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                      <path d="M240,120a48.05,48.05,0,0,0-48-48H152.2c-2.91-.17-53.62-3.74-101.91-44.24A16,16,0,0,0,24,40V200a16,16,0,0,0,26.29,12.25c37.77-31.68,77-40.76,93.71-43.3v31.72A16,16,0,0,0,151.12,214l11,7.33A16,16,0,0,0,186.5,212l11.77-44.36A48.07,48.07,0,0,0,240,120ZM40,199.93V40h0c42.81,35.91,86.63,45,104,47.24v65.48C126.65,155,82.84,164.07,40,199.93Z"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Marketing</span>
                </a>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <h2 className="text-gray-900 text-3xl font-bold">Calendrier des Événements</h2>
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <button 
                      className="relative text-gray-500 hover:text-[#16a085]"
                      onClick={() => setShowNotifications(!showNotifications)}
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                      </svg>
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
                        {notifications.length}
                      </span>
                    </button>
                    
                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-20">
                        <div className="py-2 px-4 text-sm font-bold text-gray-700 border-b">Notifications</div>
                        <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                          {notifications.map(notification => (
                            <a key={notification.id} className="flex items-center gap-4 p-4 hover:bg-gray-50" href="#">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex-shrink-0 flex items-center justify-center">
                                <svg className="w-6 h-6 text-[#27ae60]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-800">{notification.title}</p>
                                <p className="text-xs text-gray-500">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button className="flex items-center justify-center gap-2 rounded-full h-10 px-5 bg-[#27ae60] text-white text-sm font-bold shadow-md hover:bg-opacity-90">
                    <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                    </svg>
                    <span className="truncate">Créer un événement</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                {/* FullCalendar Component */}
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  locales={[frLocale]}
                  locale="fr"
                  //events={events}
                  eventClick={handleEventClick}
                  selectable={true}
                  select={handleDateSelect}
                  eventContent={renderEventContent}
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay'
                  }}
                  buttonText={{
                    today: "Aujourd'hui",
                    month: 'Mois',
                    week: 'Semaine',
                    day: 'Jour'
                  }}
                  height="auto"
                  editable={true}
                  droppable={true}
                  weekends={true}
                  dayMaxEvents={true}
                  moreLinkClick="popover"
                />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;