import React from 'react'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'
import { Product } from '../product'
import { useDisclosure } from '@mantine/hooks'
import { LoadingOverlay } from '@mantine/core'

async function getFavorites (favs) {

  const filterQuery = favs.map(id => `id = "${id}"`).join(" || ")

  return await pb.collection('products').getFullList({
    filter: filterQuery
  })
}

export const Favorites = () => {

  const {user} = useAuth()

  const [favorites, setFavorites] = React.useState([])

  const [favoritesLoading, favoritesLoading_h] = useDisclosure(false)

  React.useEffect(() => {
    if (user?.favorites) {
      if (user?.favorites?.length === 0) return
      favoritesLoading_h.open()
      getFavorites(user?.favorites)
      .then(async res => {
        if (res?.length !== user?.favorites?.length) {
          const newFavories = user?.favorites.filter(id => res.some(q => q.id === id))

          await pb.collection('agents').update(user?.id, {
            favorites: newFavories
          })
        }
        setFavorites(res)
      })  
      .finally(() => {
        favoritesLoading_h.close()
      })
    }
  }, [])

  return (
    <>
      <LoadingOverlay visible={favoritesLoading}/>
      {favorites?.length === 0 && (
        <div className='flex justify-center items-center h-full'>
          <p className='text-lg'>У вас нет избранных товаров</p>
        </div>
      )}
      <div className='container-market market'>
        {favorites?.length > 0 && <p className='mt-4'>Избранные</p>}
        <div className="grid sm:grid-cols-2 min-[768px]grid-cols-3 min-[1200px]:grid-cols-4 min-[1450px]:grid-cols-5 gap-4 mt-4">
          {favorites?.map((q, i) => {
            return (
              <Product product={q} key={i}/>
            )
          })}
        </div>
      </div>
    </>
  )
}
