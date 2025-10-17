// components/SubEventsGenerator.tsx
import React, { useState } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, Edit3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSubEvents } from '@/hooks/use-sub-events';

interface SubEventsGeneratorProps {
  onSubEventsChange?: (subEvents: string[]) => void;
  initialSubEvents?: string[];
}

const SubEventsGenerator: React.FC<SubEventsGeneratorProps> = ({
  onSubEventsChange,
  initialSubEvents = []
}) => {
  const {
    subEvents,
    addSubEvent,
    updateSubEvent,
    removeSubEvent,
    moveSubEvent,
  } = useSubEvents({ onSubEventsChange });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Initialiser avec les sous-événements initiaux
  React.useEffect(() => {
    if (initialSubEvents.length > 0) {
      initialSubEvents.forEach(event => addSubEvent(event));
    }
  }, []);

  const handleAddSubEvent = () => {
    const newIndex = subEvents.length;
    addSubEvent('');
    setEditingIndex(newIndex);
  };

  const handleUpdateSubEvent = (index: number, value: string) => {
    updateSubEvent(index, value);
  };

  const handleRemoveSubEvent = (index: number) => {
    removeSubEvent(index);
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const handleMoveSubEvent = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    moveSubEvent(index, newIndex);
    
    // Mettre à jour l'index d'édition si nécessaire
    if (editingIndex === index) {
      setEditingIndex(newIndex);
    }
  };

  const handleStartEditing = (index: number) => {
    setEditingIndex(index);
  };

  const handleStopEditing = () => {
    setEditingIndex(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sous-événements
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
            Ajoutez les différentes activités de votre événement
          </p>
        </div>

        <Button
          onClick={handleAddSubEvent}
          className="bg-event-primary hover:bg-event-primary/90 text-white flex items-center gap-2"
        >
          <Plus size={20} />
          Ajouter un sous-événement
        </Button>
      </div>

      {/* Liste des sous-événements */}
      <div className="space-y-4">
        {subEvents.map((subEvent, index) => (
          <SubEventItem
            key={index}
            index={index}
            subEvent={subEvent}
            isEditing={editingIndex === index}
            totalItems={subEvents.length}
            onUpdate={(value) => handleUpdateSubEvent(index, value)}
            onRemove={() => handleRemoveSubEvent(index)}
            onMove={handleMoveSubEvent}
            onStartEditing={() => handleStartEditing(index)}
            onStopEditing={handleStopEditing}
          />
        ))}

        {subEvents.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <div className="text-gray-400 dark:text-gray-500 mb-3">
              <Plus size={48} className="mx-auto" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Aucun sous-événement ajouté
            </p>
            <Button
              onClick={handleAddSubEvent}
              className="bg-event-primary hover:bg-event-primary/90 text-white"
            >
              Ajouter le premier sous-événement
            </Button>
          </div>
        )}
      </div>

      {/* Résumé */}
      {subEvents.length > 0 && (
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Résumé des sous-événements</h3>
          <div className="text-center">
            <div className="text-2xl font-bold text-event-primary">{subEvents.length}</div>
            <div className="text-gray-600 dark:text-gray-400">
              sous-événement{subEvents.length > 1 ? 's' : ''} programmé{subEvents.length > 1 ? 's' : ''}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant pour un seul sous-événement
interface SubEventItemProps {
  index: number;
  subEvent: string;
  isEditing: boolean;
  totalItems: number;
  onUpdate: (value: string) => void;
  onRemove: () => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
  onStartEditing: () => void;
  onStopEditing: () => void;
}

const SubEventItem: React.FC<SubEventItemProps> = ({
  index,
  subEvent,
  isEditing,
  totalItems,
  onUpdate,
  onRemove,
  onMove,
  onStartEditing,
  onStopEditing,
}) => {
  const [localValue, setLocalValue] = React.useState(subEvent);

  React.useEffect(() => {
    setLocalValue(subEvent);
  }, [subEvent]);

  const handleSave = () => {
    onUpdate(localValue.trim());
    onStopEditing();
  };

  const handleCancel = () => {
    setLocalValue(subEvent);
    onStopEditing();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        {/* Numéro d'ordre */}
        <div className="flex-shrink-0 w-8 h-8 bg-event-primary text-white rounded-full flex items-center justify-center font-semibold">
          {index + 1}
        </div>

        {/* Champ de texte */}
        <div className="flex-1">
          {isEditing ? (
            <Input
              value={localValue}
              onChange={(e) => setLocalValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              placeholder="Nom du sous-événement (ex: Session d'ouverture, Atelier technique, etc.)"
              className="w-full"
              autoFocus
            />
          ) : (
            <div
              onClick={onStartEditing}
              className="cursor-text p-2 rounded border border-transparent hover:border-gray-300 min-h-[42px] flex items-center"
            >
              {subEvent || (
                <span className="text-gray-400 italic">
                  Cliquez pour ajouter un nom de sous-événement...
                </span>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Bouton Monter */}
          <button
            onClick={() => onMove(index, 'up')}
            disabled={index === 0}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 transition-colors"
            title="Déplacer vers le haut"
          >
            <ChevronUp size={16} />
          </button>

          {/* Bouton Descendre */}
          <button
            onClick={() => onMove(index, 'down')}
            disabled={index === totalItems - 1}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 transition-colors"
            title="Déplacer vers le bas"
          >
            <ChevronDown size={16} />
          </button>

          {/* Bouton Éditer */}
          {!isEditing && (
            <button
              onClick={onStartEditing}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Modifier"
            >
              <Edit3 size={16} />
            </button>
          )}

          {/* Bouton Supprimer */}
          <button
            onClick={onRemove}
            className="p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors"
            title="Supprimer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Actions d'édition */}
      {isEditing && (
        <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancel}
          >
            Annuler
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!localValue.trim()}
          >
            Sauvegarder
          </Button>
        </div>
      )}
    </div>
  );
};

export default SubEventsGenerator;