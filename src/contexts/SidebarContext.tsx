// contexts/SidebarContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from 'react';

// Types pour l'état de la sidebar
interface SidebarState {
  isOpen: boolean;
  selectedItem: string;
  isMobileOpen: boolean;
}

// Actions disponibles
interface SidebarActions {
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  setSelectedItem: (itemId: string) => void;
  toggleMobileSidebar: () => void;
}

// Contexte combiné
interface SidebarContextType {
  state: SidebarState;
  actions: SidebarActions;
}

// Création du contexte
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Props du provider
interface SidebarProviderProps {
  children: ReactNode;
  defaultSelectedItem?: string;
  defaultOpen?: boolean;
}

// Provider component
export const SidebarStateProvider: React.FC<SidebarProviderProps> = ({
  children,
  defaultSelectedItem = 'dashboard',
  defaultOpen = true
}) => {
  const [state, setState] = useState<SidebarState>({
    isOpen: defaultOpen,
    selectedItem: defaultSelectedItem,
    isMobileOpen: false
  });

  // Actions
  const toggleSidebar = () => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const openSidebar = () => {
    setState(prev => ({ ...prev, isOpen: true }));
  };

  const closeSidebar = () => {
    setState(prev => ({ ...prev, isOpen: false }));
  };

  const setSelectedItem = (itemId: string) => {
    setState(prev => ({ ...prev, selectedItem: itemId }));
  };

  const toggleMobileSidebar = () => {
    setState(prev => ({ ...prev, isMobileOpen: !prev.isMobileOpen }));
  };

  // Valeur du contexte
  const contextValue: SidebarContextType = {
    state,
    actions: {
      toggleSidebar,
      openSidebar,
      closeSidebar,
      setSelectedItem,
      toggleMobileSidebar
    }
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  
  return context;
};

// Hook pour la sélection d'item seulement
export const useSidebarSelection = () => {
  const { state: { selectedItem }, actions: { setSelectedItem } } = useSidebar();
  
  return { selectedItem, setSelectedItem };
};

// Hook pour l'état d'ouverture seulement
export const useSidebarState = () => {
  const { state: { isOpen, isMobileOpen }, actions: { toggleSidebar, openSidebar, closeSidebar, toggleMobileSidebar } } = useSidebar();
  
  return { 
    isOpen, 
    isMobileOpen,
    toggleSidebar, 
    openSidebar, 
    closeSidebar,
    toggleMobileSidebar
  };
};