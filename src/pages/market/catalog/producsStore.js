import { pb } from 'shared/api';
import { create } from 'zustand';

const useProductsStore = create((set, get) => ({
    products: [],
    productsLoading: false,
    searched: '',
    clearSearched: () => {
      set(() => ({searched: ''}))
    },
    getProductsBySearch: async (name) => {
      set(() => ({productsLoading: true}))
      await pb.collection('products').getList(1, 20, {
        sort: '-created',
        expand: 'agent, market_id',
        filter: `status = 'posted' && (name ?~ '${name}' || name ?~ '${name}')`
      })
      .then(res => {
        set(() => ({products: res, productsLoading: false, searched: name}))
      })
    },
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
        filter : `status = 'posted' && sub_category = '${category}'`
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

    }})
);

export {useProductsStore}