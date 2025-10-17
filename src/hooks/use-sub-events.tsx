// hooks/useSubEvents.ts
import { useEffect } from 'react';
import { useSubEventsStore } from '@/stores/subEventStore';

interface UseSubEventsProps {
  onSubEventsChange?: (subEvents: string[]) => void;
}

export const useSubEvents = ({ onSubEventsChange }: UseSubEventsProps = {}) => {
  const { subEvents, addSubEvent, updateSubEvent, removeSubEvent, moveSubEvent, clearSubEvents, setSubEvents } = useSubEventsStore();

  // Notifier le parent quand les sous-événements changent
  useEffect(() => {
    onSubEventsChange?.(subEvents);
  }, [subEvents, onSubEventsChange]);

  return {
    subEvents,
    addSubEvent,
    updateSubEvent,
    removeSubEvent,
    moveSubEvent,
    clearSubEvents,
    setSubEvents,
  };
};