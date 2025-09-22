// components/SubEventsGenerator.tsx
import React, { useState } from 'react';
import { Plus, Trash2, Clock, Calendar, Edit3, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Types
interface SubEvent {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  date?: string;
}

interface SubEventsManagerProps {
  onSubEventsChange?: (subEvents: SubEvent[]) => void;
  initialSubEvents?: SubEvent[];
  eventDate?: string; // Date principale de l'événement
}

const SubEventsGenerator: React.FC<SubEventsManagerProps> = ({
  onSubEventsChange,
  initialSubEvents = [],
  eventDate
}) => {
  const [subEvents, setSubEvents] = useState<SubEvent[]>(initialSubEvents);
  const [isAdding, setIsAdding] = useState(false);

  // Générer un ID unique
  const generateId = () => `subevent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Ajouter un nouveau sous-événement
  const addSubEvent = () => {
    const newSubEvent: SubEvent = {
      id: generateId(),
      name: '',
      description: '',
      startTime: '09:00',
      endTime: '10:00',
      date: eventDate
    };

    setSubEvents(prev => {
      const newSubEvents = [...prev, newSubEvent];
      onSubEventsChange?.(newSubEvents);
      return newSubEvents;
    });
    setIsAdding(true);
  };

  // Mettre à jour un sous-événement
  const updateSubEvent = (id: string, field: keyof SubEvent, value: string) => {
    setSubEvents(prev => {
      const newSubEvents = prev.map(event =>
        event.id === id ? { ...event, [field]: value } : event
      );
      onSubEventsChange?.(newSubEvents);
      return newSubEvents;
    });
  };

  // Supprimer un sous-événement
  const removeSubEvent = (id: string) => {
    setSubEvents(prev => {
      const newSubEvents = prev.filter(event => event.id !== id);
      onSubEventsChange?.(newSubEvents);
      return newSubEvents;
    });
  };

  // Déplacer un sous-événement
  const moveSubEvent = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === subEvents.length - 1)
    ) {
      return;
    }

    setSubEvents(prev => {
      const newSubEvents = [...prev];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newSubEvents[index], newSubEvents[newIndex]] = [newSubEvents[newIndex], newSubEvents[index]];
      onSubEventsChange?.(newSubEvents);
      return newSubEvents;
    });
  };

  // Valider les heures
  const validateTime = (startTime: string, endTime: string): boolean => {
    if (!startTime || !endTime) return true;
    return startTime < endTime;
  };

  // Calculer la durée
  const calculateDuration = (startTime: string, endTime: string): string => {
    if (!startTime || !endTime) return '0h';

    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    const durationMinutes = endTotalMinutes - startTotalMinutes;

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    if (hours === 0) return `${minutes}min`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h${minutes}min`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-lg text-gray-900 dark:text-white">
            Sous-événements
          </h2>
          <p className="text-gray-600 text-sm dark:text-gray-400 mt-1">
            Organisez le programme détaillé de votre événement
          </p>
        </div>

        <button
          onClick={addSubEvent}
          className="bg-event-primary hover:bg-event-primary/90 text-white text-sm px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Ajouter un sous-événement
        </button>
      </div>

      {/* Liste des sous-événements */}
      <div className="space-y-4">
        {subEvents.map((subEvent, index) => (
          <SubEventCard
            key={subEvent.id}
            subEvent={subEvent}
            index={index}
            totalSubEvents={subEvents.length}
            onUpdate={(field, value) => updateSubEvent(subEvent.id, field, value)}
            onRemove={() => removeSubEvent(subEvent.id)}
            onMove={moveSubEvent}
            isEditing={isAdding && index === subEvents.length - 1}
            onBlur={() => setIsAdding(false)}
            calculateDuration={calculateDuration}
            validateTime={validateTime}
          />
        ))}

        {subEvents.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <div className="text-gray-400 dark:text-gray-500 mb-3">
              <Calendar size={48} className="mx-auto" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Aucun sous-événement programmé
            </p>
            <button
              onClick={addSubEvent}
              className="bg-event-primary hover:bg-event-primary/90 text-white text-sm px-4 py-2 rounded-lg font-medium"
            >
              Planifier le premier sous-événement
            </button>
          </div>
        )}
      </div>

      {/* Résumé */}
      {subEvents.length > 0 && (
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Résumé du programme</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{subEvents.length}</div>
              <div className="text-gray-600 dark:text-gray-400">Sous-événements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {subEvents[0]?.startTime || '--:--'}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Début</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {subEvents[subEvents.length - 1]?.endTime || '--:--'}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Fin</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {calculateDuration(
                  subEvents[0]?.startTime || '00:00',
                  subEvents[subEvents.length - 1]?.endTime || '00:00'
                )}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Durée totale</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant Carte de sous-événement
interface SubEventCardProps {
  subEvent: SubEvent;
  index: number;
  totalSubEvents: number;
  onUpdate: (field: keyof SubEvent, value: string) => void;
  onRemove: () => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
  isEditing: boolean;
  onBlur: () => void;
  calculateDuration: (start: string, end: string) => string;
  validateTime: (start: string, end: string) => boolean;
}

const SubEventCard: React.FC<SubEventCardProps> = ({
  subEvent,
  index,
  totalSubEvents,
  onUpdate,
  onRemove,
  onMove,
  isEditing,
  onBlur,
  calculateDuration,
  validateTime
}) => {
  const [isExpanded, setIsExpanded] = useState(isEditing);
  const isTimeValid = validateTime(subEvent.startTime, subEvent.endTime);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* En-tête de la carte */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            {/* Numéro d'ordre */}
            <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
              {index + 1}
            </div>

            {/* Nom du sous-événement */}
            <input
              type="text"
              value={subEvent.name}
              onChange={(e) => onUpdate('name', e.target.value)}
              placeholder="Nom du sous-événement"
              className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary/50 rounded px-2 py-1 flex-1"
              onFocus={() => setIsExpanded(true)}
              onBlur={onBlur}
              autoFocus={isEditing}
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Indicateur de durée */}
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Clock size={16} />
              {calculateDuration(subEvent.startTime, subEvent.endTime)}
            </div>

            {/* Boutons d'action */}
            <button
              onClick={() => onMove(index, 'up')}
              disabled={index === 0}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 transition-colors"
              title="Déplacer vers le haut"
            >
              <ChevronUp size={16} />
            </button>

            <button
              onClick={() => onMove(index, 'down')}
              disabled={index === totalSubEvents - 1}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 transition-colors"
              title="Déplacer vers le bas"
            >
              <ChevronDown size={16} />
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Edit3 size={16} />
            </button>

            <button
              onClick={onRemove}
              className="p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors"
              title="Supprimer le sous-événement"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Horaires */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="date">
              Heure de debut
            </label>
            <div className="mt-2">
              <Input
                id="date"
                name="date"
                type="date"
                value={new Date().toDateString()}
                onChange={() => { }}
                className="block w-full rounded-xl border-0 bg-white py-3 px-4 text-event-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-event-primary sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-event-foreground" htmlFor="time">
              Heure de fin
            </label>
            <div className="mt-2">
              <Input
                id="time"
                name="time"
                type="time"
                value={new Date().toDateString()}
                onChange={() => { }}
                className="block w-full rounded-xl border-0 bg-white py-3 px-4 text-event-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-event-primary sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>
        </div>

        {/* Contenu dépliable */}
        {isExpanded && (
          <div className="animate-fadeIn">
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={subEvent.description}
                onChange={(e) => onUpdate('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-gray-700 resize-none"
                placeholder="Description détaillée de ce sous-événement..."
              />
            </div>

            {/* Aperçu de la plage horaire */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Plage horaire:</strong> {subEvent.startTime} - {subEvent.endTime}
                <span className="ml-2">({calculateDuration(subEvent.startTime, subEvent.endTime)})</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubEventsGenerator;