import { pb } from 'shared/api'
import { create } from 'zustand'

const useShopStore = create((set) => ({
  shop: {},
  getShopById: async (id) => {
    await pb.collection('markets').getFirstListItem(`agent = '${id}'`, {
      expand: 'products, agent'
    })
    .then(res => {
      set(state => ({shop: res}))
    })
  },
}))

export { useShopStore }