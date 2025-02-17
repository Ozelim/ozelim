import React from 'react'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'
import { Product } from '../product'

async function getFavorites (favs) {

  const filterQuery = favs.map(id => `id = "${id}"`).join(" || ")

  return await pb.collection('products').getFullList({
    filter: filterQuery
  })
}

export const Favorites = () => {

  const {user} = useAuth()

  const [favorites, setFavorites] = React.useState([])

  React.useEffect(() => {
    if (user?.favorites) {
      if (user?.favorites?.length === 0) return
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
    }
  }, [])

  return (
    <div className='container-market market'>
      <p className='mt-4'>Избранные</p>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {favorites?.map((q, i) => {
          return (
            <Product product={q} key={i}/>
          )
        })}
      </div>
    </div>
  )
}
