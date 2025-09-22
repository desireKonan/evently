// hooks/useSubEvents.ts
import { useState } from 'react';

export interface SubEvent {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  date?: string;
}

export const useSubEvents = (initialSubEvents: SubEvent[] = []) => {
  const [subEvents, setSubEvents] = useState<SubEvent[]>(initialSubEvents);

  const generateId = () => `subevent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addSubEvent = (subEvent?: Partial<SubEvent>) => {
    const newSubEvent: SubEvent = {
      id: generateId(),
      name: subEvent?.name || '',
      description: subEvent?.description || '',
      startTime: subEvent?.startTime || '09:00',
      endTime: subEvent?.endTime || '10:00',
      date: subEvent?.date,
      ...subEvent
    };

    setSubEvents(prev => [...prev, newSubEvent]);
    return newSubEvent;
  };

  const updateSubEvent = (id: string, updates: Partial<SubEvent>) => {
    setSubEvents(prev =>
      prev.map(event => (event.id === id ? { ...event, ...updates } : event))
    );
  };

  const removeSubEvent = (id: string) => {
    setSubEvents(prev => prev.filter(event => event.id !== id));
  };

  const reorderSubEvents = (fromIndex: number, toIndex: number) => {
    setSubEvents(prev => {
      const newSubEvents = [...prev];
      const [movedEvent] = newSubEvents.splice(fromIndex, 1);
      newSubEvents.splice(toIndex, 0, movedEvent);
      return newSubEvents;
    });
  };

  const validateTimeOrder = (subEvents: SubEvent[]): boolean => {
    for (let i = 0; i < subEvents.length - 1; i++) {
      if (subEvents[i].endTime > subEvents[i + 1].startTime) {
        return false;
      }
    }
    return true;
  };

  return {
    subEvents,
    addSubEvent,
    updateSubEvent,
    removeSubEvent,
    reorderSubEvents,
    validateTimeOrder,
    setSubEvents
  };
};