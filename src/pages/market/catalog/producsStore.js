import { pb } from 'shared/api'
import { create } from 'zustand'

const useProductsStore = create((set) => ({
  products: [],
  productsLoading: false,
  searched: '',
  rareProducts: [],
  discountProducts: [],
  setDiscountProducts: (productsData) => {
    set(() => ({ discountProducts: productsData }))
  },
  getRareProducts: async () => {
    await pb
      .collection('products')
      .getFullList({
        sort: '-created',
        expand: 'market_id',
        filter: `status = 'posted' && rare = true`,
      })
      .then((res) => {
        set(() => ({ rareProducts: res }))
      })
  },
  getDiscountProducts: async () => {
    await pb
      .collection('products')
      .getFullList({
        sort: '-created',
        expand: 'market_id',
        filter: `status = 'posted' && discount.status = 'active'`,
      })
      .then((res) => {
        set(() => ({ discountProducts: res }))
      })
  },
  clearSearched: () => {
    set(() => ({ searched: '' }))
  },
  getProductsBySearch: async (name) => {
    set(() => ({ productsLoading: true }))
    await pb
      .collection('products')
      .getList(1, 20, {
        sort: '-created',
        expand: 'agent, market_id',
        filter: `status = 'posted' && (name ?~ '${name}' || name ?~ '${name}')`,
      })
      .then((res) => {
        set(() => ({ products: res, productsLoading: false, searched: name }))
      })
  },
  getProductsByCategory: async (page = 1, category) => {
    set(() => ({ productsLoading: true }))
    await pb
      .collection('products')
      .getList(page, 25, {
        sort: '-created',
        expand: 'agent, market_id',
        filter: `status = 'posted' && category = '${category}'`,
      })
      .then((res) => {
        set(() => ({ products: res, productsLoading: false }))
      })
  },
  getProductsBySubCategory: async (page, category) => {
    set(() => ({ productsLoading: true }))
    await pb
      .collection('products')
      .getList((page = 1), 25, {
        sort: '-created',
        expand: 'agent, market_id',
        filter: `status = 'posted' && sub_category = '${category}'`,
      })
      .then((res) => {
        set(() => ({ products: res, productsLoading: false }))
      })
  },
  getAllProducts: async (page = 1) => {
    set(() => ({ productsLoading: true }))
    await pb
      .collection('products')
      .getList(page, 25, {
        sort: '-created',
        expand: 'merchant, market_id',
        filter: `status = 'posted'`,
      })
      .then((res) => {
        set(() => ({ products: res, productsLoading: false }))
      })
  },
  filterProducts: () => {},
}))

export { useProductsStore }
