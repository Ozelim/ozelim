import React from 'react'
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { useShopStore } from './shopStore';
import { CiGrid41, CiMoneyBill } from 'react-icons/ci';
import { pb } from 'shared/api';
import { formatNumber } from 'shared/lib';

const color = 'oklch(45.9% 0.187 3.815)'

const data = [
  {
    name: 'Page A',
    a: 2000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    a: 2100,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    a: 2200,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    a: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    a: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    a: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    a: 3490,
    pv: 4300,
    amt: 2100,
  },
];

async function getOrders(id) {
  const orders = await pb.collection('orders').getFullList({
    filter: `market_id = '${id}'`,
    fields: 'id, total_cost, created'
  })
  return orders
}

export const Stats = () => {

  const { shop } = useShopStore()

  const [orders, setOrders] = React.useState([])

  React.useEffect(() => {
    getOrders(shop.id)
    .then(res => {
      setOrders(res)
    })
  }, [shop])

  const revenue = orders.map(order => order.total_cost)

  const ordersData = Array(30).fill(0).map((_, i) => {
    return {
      a: orders.length,
    }
  })

  return (
    <div className='grid grid-cols-4 gap-4 w-full h-[400px]'>
      <div className='flex flex-col items-center justify-center border shadow-equal rounded-lg p-4 relative'>
        <p className='text-5xl font-bold'>{shop?.products?.length}</p>
        <p className='text-lg'>Товары</p>
        <CiGrid41 className='absolute top-6 right-6 text-4xl' color={color} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={ordersData}
          className='border shadow-equal rounded-lg'
        >
          <Area type="monotone" dataKey="a" stroke={color} fill={color}/>
          <div className='flex flex-col items-center justify-center border shadow-equal rounded-lg p-4 absolute top-0 left-0'>
            <p className='text-5xl font-bold'>{shop?.products?.length}</p>
            <p className='text-lg'>Товары</p>
            <CiGrid41 className='text-4xl' color={color} />
          </div>
        </AreaChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          className='border shadow-equal rounded-lg'
        >
          <Area type="monotone" dataKey="a" stroke={color} fill={color} />
        </AreaChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          className='border shadow-equal rounded-lg'
        >
          <Area type="monotone" dataKey="a" stroke={color} fill={color} />
        </AreaChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height="100%" className='col-span-2'>
        <AreaChart
          data={data}
          className='border shadow-equal rounded-lg'
        >
          <Area type="monotone" dataKey="a" stroke={color} fill={color} />
        </AreaChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height="100%" className='col-span-2'>
        <AreaChart
          data={data}
          className='border shadow-equal rounded-lg'
        >
          <Area type="monotone" dataKey="a" stroke={color} fill={color} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
