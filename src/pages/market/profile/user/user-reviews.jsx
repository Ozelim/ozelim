import React from 'react'
import { Button, Rating, Collapse } from '@mantine/core'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'
import { getImageUrl } from 'shared/lib'

async function getReviewsByUser(id) {

  return await pb.collection('reviews').getFullList({
    filter: `user = '${id}' || customer = '${id}'`,
    expand: 'product_id, user, customer'
  })
}

export const UserReviews = () => {

  const { user } = useAuth()

  const [reviews, setReviews] = React.useState([])

  const [openedReplies, setOpenedReplies] = React.useState([])

  function handleOpenReply(id) {
    if (openedReplies.includes(id)) {
      setOpenedReplies((prev) => prev.filter((item) => item !== id))
    } else {
      setOpenedReplies((prev) => [...prev, id])
    }
  }

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

        const u = q?.expand?.user
        const c = q?.expand?.customer

        return (
          <div className="max-w-2xl mx-auto w-full border rounded-primary flex gap-4 p-3 shadow-equal" key={i}>
            {u?.avatar && (
                <img
                alt="avatar"
                src={getImageUrl(u, u?.avatar)}
                className="w-20 h-20 aspect-square object-cover rounded-full"
              />
            )}

            {c?.avatar && (
              <img
                alt="avatar"
                src={getImageUrl(c, c?.avatar)}
                className="w-20 h-20 aspect-square object-cover rounded-full"
              />
            )}
            {!u?.avatar && !c?.avatar && (
              <div className="w-20 h-20 aspect-square object-cover rounded-full bg-slate-300" />
            )}
            <div className='relative w-full'>
              <p>{u?.fio || c?.name}</p>
              <div className="mt-1 flex gap-4">
                <Rating size="sm" readOnly value={q?.rating} />
                <p>{dayjs(q?.created).format('DD MMMM YYYY, HH:mm')}</p>
              </div>
              
              <p className="mt-2">{q?.comment}</p>
              <div className='flex justify-end gap-3'>
                <Button
                  compact
                  variant='white'
                  onClick={() => handleOpenReply(q?.id)}
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
              <Collapse in={openedReplies.includes(q?.id)}>
                <p className='mt-2'>{q?.reply}</p>
              </Collapse>
            </div>
          </div>
        )
      })}
    </div>
  )
}

