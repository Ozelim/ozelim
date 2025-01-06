import { pb } from 'shared/api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const useProductsStore = create(persist((set, get) => ({
    products: [],
    getProductsByCategory: async () => {

    },
    getProductsBySubCategory: async () => {

    },
    getAllProducts: async (page) => {
      await pb.collection('products').getList(page = 1, 25, {
        sort: '-created',
        expand: 'agent, market_id',
        filter: `status = 'posted'`
      })
      .then(res => {
        set(() => ({products: res}))
      })
    },
    filterProducts: (option) => {

    },
    }),
    {name: 'duken-store'}
  )
);

export {useProductsStore}