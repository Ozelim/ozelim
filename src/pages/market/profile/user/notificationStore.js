import { pb } from "shared/api";
import { create } from 'zustand';

const useNotificationStore = create((set, get) => ({
    nots: {},
    getNotifications: async (id) => {
      await pb.collection('notifications').getOne(id)
      .then(res => {
        set(() => ({nots: res}))
      })
      .catch(async err => {
        await pb.collection('notifications').create({
          id
        })
        .then(res => {
          set(() => ({nots: res}))
        })
      })
    },
    subsribeToNotifications: async (id) => {
      await pb.collection('notifications').subscribe(id || get()?.nots?.id, ({record}) => {
        set(() => ({nots: record}))
      })
    },
  })
);

export { useNotificationStore }