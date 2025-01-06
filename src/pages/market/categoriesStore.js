import { pb } from 'shared/api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const useCategoriesStore = create(persist((set, get) => ({
    categories: [],
    cats: [],
    getCategories: async () => {
      const cats = (await pb.collection('categories').getFullList())?.[0]?.categories ?? []
      const forInputs = cats?.map((e) => {
        return {
          label: e?.label,
          value: e?.label,
        }
      })
      set(() => ({categories: cats, cats: forInputs}))
    }
    }),
    {name: 'duken-categories'}
  )
);

export {useCategoriesStore}