// hooks/usePricingCategories.ts
import { useState } from 'react';

export interface PriceCategory {
  id: string;
  name: string;
  price: number;
  description: string;
  capacity?: number;
  color: string;
}

export const usePricingCategories = (initialCategories: PriceCategory[] = []) => {
  const [categories, setCategories] = useState<PriceCategory[]>(initialCategories);

  const addCategory = (category?: Partial<PriceCategory>) => {
    const newCategory: PriceCategory = {
      id: Date.now().toString(),
      name: category?.name || '',
      price: category?.price || 0,
      description: category?.description || '',
      capacity: category?.capacity,
      color: category?.color || '#0fa985',
      ...category
    };

    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  };

  const updateCategory = (id: string, updates: Partial<PriceCategory>) => {
    setCategories(prev =>
      prev.map(cat => (cat.id === id ? { ...cat, ...updates } : cat))
    );
  };

  const removeCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const reorderCategories = (fromIndex: number, toIndex: number) => {
    setCategories(prev => {
      const newCategories = [...prev];
      const [movedCategory] = newCategories.splice(fromIndex, 1);
      newCategories.splice(toIndex, 0, movedCategory);
      return newCategories;
    });
  };

  return {
    categories,
    addCategory,
    updateCategory,
    removeCategory,
    reorderCategories,
    setCategories
  };
};