import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const useCartStore = create(persist((set, get) => ({
    cartItems: [],
    count: 0,
    cartTotalAmount: 0,
    updateCartItems: (cartItems) => {
      set({ cartItems });
    },
    // addToCart: (product) => {
    //   set((state) => {
    //     const existingItemIndex = state.cartItems.findIndex(
    //       (item) => item.id === product.id
    //     );

    //     if (existingItemIndex >= 0) {
    //       const updatedCartItems = [...state.cartItems];
    //       updatedCartItems[existingItemIndex].count += 1;
  
    //       return { 
    //         cartItems: updatedCartItems, 
    //         count: state.count + 1, 
    //         using_bonuses: false,
    //         bonuses_spent: 0,
    //       }; 
    //     } else {
    //       const newProduct = { ...product, count: product?.count || 1 };
    //       return {
    //         cartItems: [...state.cartItems, newProduct],
    //         count: state.count + 1,
    //       };
    //     }
    //   });
    // },

    addToCart: (product) => {
      set((state) => {
        const existingItemIndex = state.cartItems.findIndex(
          (item) => item.id === product.id
        );

        if (existingItemIndex >= 0) {
          const updatedCartItems = [...state.cartItems];
          updatedCartItems[existingItemIndex].count += 1;
          updatedCartItems[existingItemIndex].using_bonuses = false;
          updatedCartItems[existingItemIndex].bonuses_spent = 0;

          return { cartItems: updatedCartItems, count: state.count + 1 };
        } else {
          return {
            cartItems: [
              ...state.cartItems,
              { ...product, count: 1, using_bonuses: false, bonuses_spent: 0 },
            ],
            count: state.count + 1,
          };
        }
      });
    },
  
    // removeFromCart: (product) => {
    //   set((state) => {
    //     const existingItemIndex = state.cartItems.findIndex(
    //       (item) => item.id === product.id
    //     );
  
    //     if (existingItemIndex >= 0) {
    //       const updatedCartItems = [...state.cartItems];
    //       const existingItem = updatedCartItems[existingItemIndex];
  
    //       if (existingItem.count > 1) {
    //         updatedCartItems[existingItemIndex].count -= 1;
    //         return { 
    //           cartItems: updatedCartItems, 
    //           count: state.count - 1, 

    //         };
    //       } else {
    //         const filteredCartItems = state.cartItems.filter(
    //           (item) => item.id !== product.id
    //         );
    //         return { 
    //           cartItems: filteredCartItems, 
    //           count: state.count - 1, 
    //         };;
    //       }
    //     }
    //   });
    // },

    removeFromCart: (product) => {
      set((state) => {
        const existingItemIndex = state.cartItems.findIndex(
          (item) => item.id === product.id
        );

        if (existingItemIndex >= 0) {
          const updatedCartItems = [...state.cartItems];
          const existingItem = updatedCartItems[existingItemIndex];

          if (existingItem.count > 1) {
            updatedCartItems[existingItemIndex].count -= 1;
            updatedCartItems[existingItemIndex].using_bonuses = false;
            updatedCartItems[existingItemIndex].bonuses_spent = 0;
            return { cartItems: updatedCartItems, count: state.count - 1 };
          } else {
            return {
              cartItems: state.cartItems.filter((item) => item.id !== product.id),
              count: state.count - 1,
            };
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
    },
    }),
    {name: 'duken-cart'}
  )
);

export {useCartStore}