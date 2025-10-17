// stores/subEventsStore.ts
import { create } from 'zustand';

interface SubEventsState {
  subEvents: string[];
  addSubEvent: (subEvent: string) => void;
  updateSubEvent: (index: number, subEvent: string) => void;
  removeSubEvent: (index: number) => void;
  moveSubEvent: (fromIndex: number, toIndex: number) => void;
  clearSubEvents: () => void;
  setSubEvents: (subEvents: string[]) => void;
}

export const useSubEventsStore = create<SubEventsState>((set) => ({
  subEvents: [],
  
  addSubEvent: (subEvent: string) => 
    set((state) => ({ 
      subEvents: [...state.subEvents, subEvent] 
    })),
  
  updateSubEvent: (index: number, subEvent: string) =>
    set((state) => ({
      subEvents: state.subEvents.map((event, i) => 
        i === index ? subEvent : event
      )
    })),
  
  removeSubEvent: (index: number) =>
    set((state) => ({
      subEvents: state.subEvents.filter((_, i) => i !== index)
    })),
  
  moveSubEvent: (fromIndex: number, toIndex: number) =>
    set((state) => {
      const newSubEvents = [...state.subEvents];
      const [movedEvent] = newSubEvents.splice(fromIndex, 1);
      newSubEvents.splice(toIndex, 0, movedEvent);
      return { subEvents: newSubEvents };
    }),
  
  clearSubEvents: () => set({ subEvents: [] }),
  
  setSubEvents: (subEvents: string[]) => set({ subEvents }),
}));