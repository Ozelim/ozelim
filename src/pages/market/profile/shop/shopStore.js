import { pb } from 'shared/api'
import { create } from 'zustand'

const useShopStore = create((set) => ({
  shop: {},
  getShopById: async (id) => {
    await pb.collection('markets').getFirstListItem(`merchant = '${id}' && status = 'posted'`, {
      expand: 'products, merchant, customers'
    })
    .then(res => {
      set(state => ({shop: res}))
    })
  },
}))

export { useShopStore }