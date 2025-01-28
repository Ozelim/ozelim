import React from 'react'
import { pb } from 'shared/api'

async function getOrders (id) {
  return await pb.collection('orders').getFullList({
    filter: `user = '${id}'`
  })
}

export const UserOrders = () => {

  const [orders, setOrders] = React.useState([])

  React.useEffect(() => {
    getOrders()
    .then(res => {
      setOrders(res)
    })
  }, [])

  console.log(orders, 'orders');

  return (
    <div>orders</div>
  )
}
