import React from 'react'
import { Product } from 'pages/market/product'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'

async function getOrders (orders) {
  const filterQuery = orders.map(id => `id = "${id}"`).join(" || ")

  return await pb.collection('products').getFullList({
    filter: filterQuery
  })
}

export const OrderHistory = () => {

  const {user} = useAuth()

  const [orders, setOrders] = React.useState([])

  React.useEffect(() => {
    if (user?.order_history) {
      getOrders(user?.order_history)
      .then(res => {
        setOrders(res)
      })
    }
  }, [])

  return (
    <div className='grid grid-cols-5 gap-4 mt-4'>
      {orders?.map((q, i) => {
        return (
          <Product product={q} key={i}/>
        )
      })}
    </div>
  )
}