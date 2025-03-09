import React from 'react'
import { Button, Text } from '@mantine/core'
import dayjs from 'dayjs'
import { getImageUrl, formatNumber } from 'shared/lib'

const statuses = {
  waiting: 'Ожидает оплаты',
  processing: 'В обработке',
  paid: 'Оплачено',
  moving: 'В пути',
  delivered: 'Доставлено',
  received: 'Получено',
  returned: 'Возвращен',
  canceled: 'Отменен',
}

export const OrderItem = ({ order, handleCancelOrder }) => {

  const p = order?.expand?.product_id
  const user = order?.expand?.user_id
  

  const statusToCancel = order?.status === 'paid' || order?.status === 'waiting' || order?.status === 'processing'

  return (
    <div
      className="flex flex-col lg:flex-row gap-4 bg-white border shadow-sm rounded-primary overflow-hidden"
    >
      <img
        src={getImageUrl(p, p?.pics?.[0])}
        alt={''}
        className="mx-auto lg:mx-0 w-full sm:w-96 lg:w-36 object-cover"
      />
      <div className="space-y-2 py-2 w-full md:max-w-xs overflow-hidden px-4 lg:px-0">
        <Text lineClamp={1} className="text-lg md:text-base">
          {p?.name}
        </Text>
        <p className="text-base md:text-sm">Количество: {order?.product?.count}</p>
        <p className="text-base md:text-sm">Потрачено бонусов: {formatNumber(order?.bonuses_spent)}</p>
        {order?.pay_type === 'balance' && (
          <p className="text-base md:text-sm">
            Оплачено балансом: {formatNumber(order?.total_cost - order?.bonuses_spent)}
          </p>
        )}
        {order?.pay_type === 'card' && (
          <p className="text-base md:text-sm">
            Оплачено картой: {formatNumber(order?.total_cost - order?.bonuses_spent)}
          </p>
        )}
        {order?.pay_type === 'bonuses' && (
          <p className="text-base md:text-sm">
            Оплачено бонусами: {formatNumber(order?.bonuses_spent)}
          </p>
        )}
      </div>
      <div className="py-2 space-y-2 w-full md:w-auto px-4 lg:px-0">
        <p className="text-base md:text-sm space-x-2">
          <span className="text-lg md:text-base">Заказ:</span>
          <span className="tracking-wider text-lg md:text-base">{order?.id}</span>
        </p>
        <p className="text-base md:text-sm space-x-2">
          <span>Дата:</span>
          <span>{dayjs(order?.created).format('DD.MM.YYYY')}</span>
        </p>
        <p className="text-base md:text-sm">
          <span>Статус:</span>
          <Button compact variant="subtle">
            {statuses[order?.status]}
          </Button>
        </p>
        <p className="text-base md:text-sm space-x-2">
          <span>Оплачено:</span>
          <span>{formatNumber(order?.product?.price * order?.product?.count)} ₸</span>
        </p>
      </div>
      <div className="py-2 space-y-2 w-full md:w-auto px-4 lg:px-0">
        {p?.takeout && order?.takeout_code && (
          <p className="text-base md:text-sm space-x-2">
            <span className="text-lg md:text-base">Код самовывоза:</span>
            <span className="tracking-wider text-lg md:text-base">{order?.takeout_code}</span>
          </p>
        )}
        <p className="text-base md:text-sm space-x-2">
          <span className="text-lg md:text-base">Номер получателя:</span>
          <span className="tracking-wider text-lg md:text-base">
            {user?.delivery_address?.phone}
          </span>
        </p>
      </div>
      {statusToCancel && (
        <div className="md:ml-auto flex justify-center md:items-end mt-4 md:mt-0">
          <Button fullWidth size="sm" variant="white" onClick={() => handleCancelOrder(order)}>
            Отменить заказ
          </Button>
        </div>
      )}
    </div>
  )
}
