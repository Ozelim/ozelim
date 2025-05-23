import React from 'react'
import { pb } from 'shared/api'
import { useShopStore } from './shopStore'
import { Button, Menu, Table, Tabs } from '@mantine/core'
import dayjs from 'dayjs'
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from 'react-router-dom'
import { formatNumber, getImageUrl, pushNotification } from 'shared/lib'
import { showNotification } from '@mantine/notifications'

async function getOrdersByMarket (marketId) {
  return await pb.collection('orders').getFullList({
    filter: `market_id = '${marketId}'`,
    expand: 'product_id, user'
  })
}

const statuses = {
  waiting: 'Ожидает оплаты',
  processing: 'В обработке',
  paid: 'Оплачено',
  moving: 'В пути',
  delivered: 'Доставлено', 
  received: 'Получено',
  returned: 'Возвращен',
  canceled: 'Отменен'
}

export const Orders = () => {

  const {shop} = useShopStore()  
  const [orders, setOrders] = React.useState([])

  async function handleOrders () {
    if (shop?.id) {
      await getOrdersByMarket(shop?.id)
      .then(res => {
        setOrders(res)
      })
    } 
  }

  React.useEffect(() => {
    handleOrders()
  }, [shop])

  async function changeStatus (order, status) {
    await pb.collection('orders').update(order?.id, {
      status,
    })
    .then(async () => {
      await handleOrders()
      await pushNotification(order?.user, 'order')
      showNotification({
        title: 'Статус заказа',
        message: 'Статус заказа успешно изменен',
        color: 'teal',
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className='w-full'>
      <Tabs
        defaultValue='orders'
      >
        <Tabs.List>
          <Tabs.Tab value='orders'>Актуальные</Tabs.Tab>
          <Tabs.Tab value='ended'>Завершенные</Tabs.Tab>
          <Tabs.Tab value='canceled'>Отмененные</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='orders' pt={16}>
          <Table
            className='bg-white p-3 border shadow-sm rounded-primary'
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Дата</th>
                <th>Товар</th>
                <th>Кол-во (шт)</th>
                <th>Сумма</th>
                <th>Имя покупателя</th>
                <th>Адрес доставки</th>
                <th>Код самовывоза</th>
                <th>Статус</th>
                <th>Действие</th>
              </tr>
            </thead>  
            <tbody>
              {orders?.map((q, i) => {
                const p = q?.expand?.product_id
                const u = q?.expand?.user
                return (
                  <tr key={i}>
                    <td>{q?.id}</td>
                    <td>{dayjs(q?.created).format('DD.MM.YYYY, HH:mm')}</td>
                    <td>
                      <Link to={`/duken/product/${p?.id}`} target='_blank'>
                        <div className='flex gap-2 items-center cursor-pointer'>
                          <img src={getImageUrl(p, p?.pics?.[0])} className='w-14 h-14 object-cover'/>   
                          {p?.name}                 
                        </div>
                      </Link>
                    </td>
                    <td>{q?.product?.count}</td>
                    <td>{formatNumber(q?.product?.price * q?.product?.count)}</td>
                    <td>{u?.fio}</td>
                    <td>
                      <p>
                        <span>Город:</span>
                        <span> {u?.delivery_address?.city}</span>
                      </p>
                      <p>
                        <span>Адрес:</span>
                        <span> {u?.delivery_address?.address}</span>
                      </p>
                      <p>
                        <span>Телефон:</span>
                        <span> {u?.delivery_address?.phone}</span>
                      </p>
                    </td>
                    <td>
                      {q?.takeout_code || '-'}
                    </td>
                    <td>
                      <Menu>
                        <Menu.Target>
                          <Button
                            color='teal'
                            size='xs'
                            radius='xl'
                          >
                            {statuses?.[q?.status]}
                          </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item
                            onClick={() => changeStatus(q, 'created')}
                          >
                            В обработке
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => changeStatus(q, 'moving')}
                          >
                            В пути
                          </Menu.Item>
                          <Menu.Item 
                            onClick={() => changeStatus(q, 'received')}
                          >
                            Получено
                          </Menu.Item>
                          <Menu.Item 
                            onClick={() => changeStatus(q, 'delivered')}
                          >
                            Доставлено
                          </Menu.Item>
                          <Menu.Item 
                            onClick={() => changeStatus(q, 'returned')}
                          >
                            Возвращен
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </td>
                    <td>
                      <Menu
                        shadow='sm'
                        width={200}
                      >
                        <Menu.Target>
                          <Button
                            compact
                            variant='white'
                          >
                            <BsThreeDotsVertical size={25} />
                          </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item
                            color='red'
                          >
                            Отменить заказ
                          </Menu.Item>
                          <Menu.Item color='green'>
                            Завершить заказ
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>      
        </Tabs.Panel>
        <Tabs.Panel value='ended' pt={16}>

        </Tabs.Panel>
        <Tabs.Panel value='canceled' pt={16}>

        </Tabs.Panel>
      </Tabs>
    </div>
  )
}