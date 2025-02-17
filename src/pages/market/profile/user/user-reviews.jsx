import React from 'react'
import { Button, Rating, Text } from '@mantine/core'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'
import { getImageUrl } from 'shared/lib'

async function getReviewsByUser(id) {

  return await pb.collection('reviews').getFullList({
    filter: `user = '${id}'`,
    expand: 'product_id, user'
  })
}

export const UserReviews = () => {

  const { user } = useAuth()

  const [reviews, setReviews] = React.useState([])

  React.useEffect(() => {
    getReviewsByUser(user?.id)
    .then((res) => {
      setReviews(res)
    })
  }, [])

  return (
    <div className='flex flex-col gap-6 mt-4'>
      {reviews?.map((q, i) => {

        const p = q?.expand?.product_id

        return (
          <div key={i} className="max-w-2xl mx-auto w-full border rounded-primary flex gap-4 p-3">
            {q?.expand?.user?.avatar && (
              <img
                alt="avatar"
                src={getImageUrl(q?.expand?.user, q?.expand?.user?.avatar)}
                className="w-20 h-20 aspect-square object-cover rounded-full"
              />
            )}
            {!q?.expand?.user?.avatar && (
              <div className="w-20 h-20 aspect-square object-cover rounded-full bg-slate-300" />
            )}
            <div className='relative w-full'>
              <p>{q?.expand?.user?.fio}</p>
              <div className="mt-1 flex gap-4">
                <Rating size="sm" readOnly value={q?.rating} />
                <p>{dayjs(q?.created).format('DD MMMM YYYY, HH:mm')}</p>
              </div>
              
              <p className="mt-2">{q?.comment}</p>
              <div className='flex justify-end gap-3'>
                <Button
                  compact
                  variant='white'
                >
                  Посмотреть ответ
                </Button>
                <Button
                  compact
                  variant='white'
                  component={Link}
                  to={`/duken/product/${p?.id}`}
                >
                  Перейти к товару
                </Button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
