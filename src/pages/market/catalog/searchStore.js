import { pb } from 'shared/api';
import { create } from 'zustand';

const useProductsStore = create((set, get) => ({
    search: '',
    searchByName: async (name) => {
      set(() => ({search: name}))
      await pb.collection('products').getList(1, 20, {
        sort: '-created',
        expand: 'agent, market_id',
        filter: `status = 'posted' && name LIKE '%${name}%'`
      })
      .then(res => {
        set(() => ({products: res}))
      })
    }  
  })
);

export {useProductsStore}