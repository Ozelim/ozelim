import { pb } from 'shared/api';
import { create } from 'zustand';

const useChatStore = create((set, get) => ({
    discounts: {},
    support: {},
    notified: 0,
    getChats: async (id) => {

      const discounts = (await pb.collection('chats').getFullList({
        filter: `type = 'notifications'`
      }))?.[0]

      await pb.collection('chats').getFullList({
        filter: `type = 'default' && user = '${id}'`
      })
      .then(async q => {
        if (q?.length === 0) {
          await pb.collection('chats').create({
            user: id,
            type: 'default',
          })
          .then(res => {
            return set(() => ({support: res, discounts}))
          })
        }
        return set(() => ({support: q?.[0], discounts}))
      })
    },
    subsribeToNotifications: async (id) => {
      await pb.collection('chats').subscribe('*', ({record}) => {
        if (record?.type === 'notificaitons') {
          return set(() => ({discounts: record}))
        }
        if (record?.user === 'id' && record?.type === 'default') {
          return set(() => ({support: record}))
        }
      })
    },
    // isNotified: async () => {
    //   const newMessages = get().nots?.messages?.filter(q => {
    //     return q?.status = 'new'
    //   }) 
    //   if (newMessages?.length >= 1) {
    //     set(() => ({notified: newMessages?.length}))
    //   }
    // }
  })
);

export {useChatStore}