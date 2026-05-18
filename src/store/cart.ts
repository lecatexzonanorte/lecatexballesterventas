'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/lib/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, color?: string, size?: string) => void;
  removeItem: (productId: string, color: string, size: string) => void;
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTotalWeight: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, color = '', size = '') => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedColor === color &&
              item.selectedSize === size
          );

          if (existingIndex >= 0) {
            const newItems = [...state.items];
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              quantity: newItems[existingIndex].quantity + 1,
            };
            return { items: newItems, isOpen: true };
          }

          return {
            items: [
              ...state.items,
              { product, quantity: 1, selectedColor: color, selectedSize: size },
            ],
            isOpen: true,
          };
        });
      },

      removeItem: (productId, color, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedColor === color &&
                item.selectedSize === size
              )
          ),
        }));
      },

      updateQuantity: (productId, color, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, color, size);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getTotalWeight: () => {
        return get().items.reduce(
          (total, item) => total + item.product.weight * item.quantity,
          0
        );
      },
    }),
    {
      name: 'lecatex-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
