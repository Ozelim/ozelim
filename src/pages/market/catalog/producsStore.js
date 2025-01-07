import { pb } from 'shared/api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const useProductsStore = create(persist((set, get) => ({
    products: [],
    productsLoading: false,
    getProductsByCategory: async (page = 1, category) => {
      set(() => ({productsLoading: true}))
      await pb.collection('products').getList(page, 25, {
        sort: '-created',
        expand: 'agent, market_id',
        filter: `status = 'posted' && category = '${category}'`
      })
      .then(res => {
        set(() => ({products: res, productsLoading: false}))
      })
    },
    getProductsBySubCategory: async (page, category) => {
      set(() => ({productsLoading: true}))
      await pb.collection('products').getList(page = 1, 25, {
        sort: '-created',
        expand: 'agent, market_id',
        filter: `status = 'posted' && sub_category = '${category}'`
      })
      .then(res => {
        set(() => ({products: res, productsLoading: false}))
      })
    },
    getAllProducts: async (page) => {
      set(() => ({productsLoading: true}))
      await pb.collection('products').getList(page = 1, 25, {
        sort: '-created',
        expand: 'agent, market_id',
        filter: `status = 'posted'`
      })
      .then(res => {
        set(() => ({products: res, productsLoading: false}))
      })
    },
    filterProducts: (option) => {

    },
    }),
    {name: 'duken-store'}
  )
);

export {useProductsStore}