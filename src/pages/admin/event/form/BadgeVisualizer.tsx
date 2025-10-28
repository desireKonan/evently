// import { useState } from "react";
// import EnhancedBadge from "../components/EnhancedBadge";
// import type { Participant } from "@/app/model/participant.model";
// import type { Event } from "@/app/model/common.model";

// const BadgeVisualizer: React.FC = () => {
//   const [selectedEvent, setSelectedEvent] = useState<Event>();
//   const [selectedParticipant, setSelectedParticipant] = useState<Participant>();
//   const [showQrCode, setShowQrCode] = useState(true);

//   return (
//     <div className="min-h-screen bg-background-light dark:bg-background-dark p-4">
//       {/* Contrôles */}
//       <div className="max-w-md mx-auto mb-8 p-6 bg-card-light dark:bg-card-dark rounded-lg shadow">
//         <h2 className="text-xl font-bold mb-4">Configuration du badge</h2>
        
//         {/* <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-2">Événement</label>
//             <select 
//               className="w-full p-2 border rounded"
//               value={selectedEvent.id}
//               onChange={(e) => setSelectedEvent([].find(ev => ev.id === e.target.value) || SAMPLE_EVENTS[0])}
//             >
//               {[].map(event => (
//                 <option key={event.id} value={event.id}>{event.name}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Participant</label>
//             <select 
//               className="w-full p-2 border rounded"
//               value={selectedParticipant.id}
//               onChange={(e) => setSelectedParticipant([].find(p => p.id === e.target.value) || SAMPLE_PARTICIPANTS[0])}
//             >
//               {[].map(participant => (
//                 <option key={participant.id} value={participant.id}>{participant.name}</option>
//               ))}
//             </select>
//           </div>

//           <div className="flex items-center">
//             <input 
//               type="checkbox" 
//               id="showQrCode"
//               checked={showQrCode}
//               onChange={(e) => setShowQrCode(e.target.checked)}
//               className="mr-2"
//             />
//             <label htmlFor="showQrCode">Afficher le QR Code</label>
//           </div>
//         </div> */}
//       </div>

//       {/* Badge */}
//       <EnhancedBadge 
//         event={selectedEvent}
//         participant={selectedParticipant}
//         showQrCode={showQrCode}
//       />
//     </div>
//   );
// }


// export default BadgeVisualizer;