// components/CategoricalPricing.tsx
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { useEventStore } from '@/stores/eventStore';
import type { PriceTicket } from '@/app/schema/event.schema';

// Types basés sur PriceTicket
interface PriceCategory extends Omit<PriceTicket, 'price'> {
  id: string;
  index: number;
  price: number;
  capacity?: number;
  color: string;
}

interface CategoricalPricingProps {
  onCategoriesChange?: (categories: PriceTicket[]) => void;
  initialCategories?: PriceTicket[];
  isDisabled?: boolean;
}

// Couleurs prédéfinies pour les catégories
const PREDEFINED_COLORS = [
  '#0fa985', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6',
  '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
];

const CategoricalPricing: React.FC<CategoricalPricingProps> = ({
  onCategoriesChange,
  initialCategories = [],
  isDisabled = false
}) => {
  const { currentEvent, addTicketPrices, updateTicketPrices, removeTicketPrices } = useEventStore();
  const [count, setCount] = useState<number>(0);
  
  // Initialiser les catégories depuis les props ou le store
  const initializeCategories = (): PriceCategory[] => {
    if (initialCategories.length > 0) {
      return initialCategories.map((cat, index) => ({
        ...cat,
        id: cat.name + index,
        index,
        color: PREDEFINED_COLORS[index % PREDEFINED_COLORS.length],
        capacity: (cat as any).capacity
      }));
    }
    
    if (currentEvent?.ticket_prices && currentEvent.ticket_prices.length > 0) {
      return currentEvent.ticket_prices.map((cat, index) => ({
        ...cat,
        id: cat.name + index,
        index,
        color: PREDEFINED_COLORS[index % PREDEFINED_COLORS.length],
        capacity: (cat as any).capacity
      }));
    }
    
    return [];
  };

  const [categories, setCategories] = useState<PriceCategory[]>(initializeCategories);
  const [isAdding, setIsAdding] = useState(false);

  // Convertir PriceCategory vers PriceTicket
  const convertToPriceTicket = (category: PriceCategory): PriceTicket => {
    return {
      name: category.name,
      description: category.description,
      price: category.price
    };
  };

  // Notifier le parent des changements
  const notifyChanges = (newCategories: PriceCategory[]) => {
    const priceTickets: PriceTicket[] = newCategories.map(convertToPriceTicket);
    onCategoriesChange?.(priceTickets);
  };

  // Gestionnaire central pour les mises à jour
  const updateCategories = (newCategories: PriceCategory[]) => {
    setCategories(newCategories);
    notifyChanges(newCategories);
    newCategories.forEach((category, index) => {
      updateTicketPrices(index, {
        name: category.name,
        description: category.description || '',
        price: category.price
      });
    })
  };

  // Ajouter une nouvelle catégorie
  const addCategory = () => {
    const newCategory: PriceCategory = {
      id: Date.now().toString(),
      name: '',
      price: 0,
      description: '',
      index: count,
      capacity: undefined,
      color: PREDEFINED_COLORS[categories.length % PREDEFINED_COLORS.length]
    };
    setCount(count + 1);
    
    const newCategories = [...categories, newCategory];
    updateCategories(newCategories);
    setIsAdding(true);
    addTicketPrices({
      name: newCategory.name,
      description: newCategory.description || '',
      price: newCategory.price
    })
  };

  // Mettre à jour une catégorie
  const updateCategory = (id: string, field: keyof PriceCategory, value: string | number) => {
    const newCategories = categories.map(cat =>
      cat.id === id ? { ...cat, [field]: value } : cat
    );
    updateCategories(newCategories);
    newCategories.forEach((category) => {
      updateTicketPrices(category.index, {
        name: category.name,
        description: category.description || '',
        price: category.price
      })
    })
  };

  // Supprimer une catégorie
  const removeCategory = (id: string, index: number) => {
    const newCategories = categories.filter(cat => cat.id !== id);
    updateCategories(newCategories);
    removeTicketPrices(index);
  };

  // Réorganiser les catégories
  const moveCategory = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === categories.length - 1)
    ) {
      return;
    }

    const newCategories = [...categories];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newCategories[index], newCategories[newIndex]] = [newCategories[newIndex], newCategories[index]];
    updateCategories(newCategories);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-base font-bold text-event-foreground dark:text-white">
            Tarification Catégorielle
          </h2>
          <p className="text-sm text-event-foreground dark:text-gray-400 mt-1">
            Configurez les différentes catégories de prix pour votre événement
          </p>
        </div>
        
        <button
          onClick={addCategory}
          disabled={isDisabled}
          type="button"
          className="bg-event-primary hover:bg-event-primary/90 text-sm text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
        >
          Ajouter une catégorie
        </button>
      </div>

      {/* Liste des catégories */}
      <div className="space-y-4">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            index={index}
            totalCategories={categories.length}
            onUpdate={(field, value) => updateCategory(category.id, field, value)}
            onRemove={() => removeCategory(category.id, index)}
            onMove={moveCategory}
            isEditing={isAdding && index === categories.length - 1}
            onBlur={() => setIsAdding(false)}
          />
        ))}
      </div>

      {/* Message si aucune catégorie */}
      {categories.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Aucune catégorie de prix définie. Cliquez sur "Ajouter une catégorie" pour commencer.</p>
        </div>
      )}

      {/* Résumé */}
      {categories.length > 0 && (
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Résumé des prix</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{categories.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Catégories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.min(...categories.map(c => c.price))} FCFA
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Prix minimum</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {Math.max(...categories.map(c => c.price))} FCFA
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Prix maximum</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant pour chaque carte de catégorie
interface CategoryCardProps {
  category: PriceCategory;
  index: number;
  totalCategories: number;
  onUpdate: (field: keyof PriceCategory, value: string | number) => void;
  onRemove: () => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
  isEditing: boolean;
  onBlur: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  index,
  totalCategories,
  onUpdate,
  onRemove,
  onMove,
  isEditing,
  onBlur
}) => {
  const [isExpanded, setIsExpanded] = useState(isEditing);

  return (
    <div 
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      style={{ borderLeft: `4px solid ${category.color}` }}
    >
      <div className="p-6">
        {/* En-tête de la carte */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <input
              type="text"
              value={category.name}
              onChange={(e) => onUpdate('name', e.target.value)}
              placeholder="Nom de la catégorie"
              className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary/50 rounded px-2 py-1"
              onFocus={() => setIsExpanded(true)}
              onBlur={onBlur}
              autoFocus={isEditing}
            />
          </div>
          
          <div className="flex items-center gap-2">
            {/* Boutons de déplacement */}
            <button
              type="button"
              onClick={() => onMove(index, 'up')}
              disabled={index === 0}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30"
              title="Déplacer vers le haut"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => onMove(index, 'down')}
              disabled={index === totalCategories - 1}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30"
              title="Déplacer vers le bas"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            
            <button
              onClick={onRemove}
              className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600"
              title="Supprimer la catégorie"
            >
              <Trash className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Contenu dépliable */}
        {isExpanded && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Prix */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prix (FCFA)
                </label>
                <input
                  type="number"
                  value={category.price}
                  onChange={(e) => onUpdate('price', parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-gray-700"
                  placeholder="0.00"
                />
              </div>

              {/* Capacité */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Capacité (optionnel)
                </label>
                <input
                  type="number"
                  value={category.capacity || ''}
                  onChange={(e) => onUpdate('capacity', e.target.value ? parseInt(e.target.value) : 0)}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-gray-700"
                  placeholder="Illimité"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={category.description}
                onChange={(e) => onUpdate('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-gray-700 resize-none"
                placeholder="Description de cette catégorie de prix..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoricalPricing;