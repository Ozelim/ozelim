import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const useCartStore = create(persist((set, get) => ({
    cartItems: [],
    count: 0,
    cartTotalAmount: 0,
    addToCart: (product) => {
      set((state) => {
        const existingItemIndex = state.cartItems.findIndex(
          (item) => item.id === product.id
        );

        if (existingItemIndex >= 0) {
          // If product exists, increment the count
          const updatedCartItems = [...state.cartItems];
          updatedCartItems[existingItemIndex].count += 1;
  
          return { cartItems: updatedCartItems, count: state.count + 1 };
        } else {
          // Add new product to the cart
          const newProduct = { ...product, count: 1 };
          return {
            cartItems: [...state.cartItems, newProduct],
            count: state.count + 1,
          };
        }
      });
    },
  
    removeFromCart: (product) => {
      set((state) => {
        const existingItemIndex = state.cartItems.findIndex(
          (item) => item.id === product.id
        );
  
        if (existingItemIndex >= 0) {
          const updatedCartItems = [...state.cartItems];
          const existingItem = updatedCartItems[existingItemIndex];
  
          if (existingItem.count > 1) {
            // Decrease the count
            updatedCartItems[existingItemIndex].count -= 1;
            return { cartItems: updatedCartItems, count: state.count - 1 };
          } else {
            // Remove the product from the cart
            const filteredCartItems = state.cartItems.filter(
              (item) => item.id !== product.id
            );
            return { cartItems: filteredCartItems, count: state.count - 1 };
          }
        }
      });
    },

    removeItem: (product) => {
      set((state) => {
        const newCartItems = state.cartItems?.filter((q) => {
          return q?.id !== product?.id
        })
        
        return { cartItems: newCartItems}
      })
    }
    }),
    {name: 'duken-cart'}
  )
);

export {useCartStore}