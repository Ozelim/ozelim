import { Rating, Text } from '@mantine/core'
import dayjs from 'dayjs'
import React from 'react'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'
import { getImageUrl } from 'shared/lib'

async function getReviewsByUser(id) {
  return await pb.collection('reviews').getFullList({
    filter: `user = '${id}'`,
    expand: 'product_id'
  })
}

export const UserReviews = () => {
  const { user } = useAuth()

  const [reviews, setReviews] = React.useState([])

  React.useEffect(() => {
    getReviewsByUser(user?.id).then((res) => {
      setReviews(res)
    })
  }, [])

  return (
    <div className='flex flex-col gap-6 mt-4'>
      {reviews?.map((q, i) => {

        const p = q?.expand?.product_id

        return (
          <div key={i} className="grid grid-cols-[40%_auto]">

            <div className='flex gap-3 border p-3'>
              <img
                alt="avatar"
                src={getImageUrl(p, p?.pics?.[0])}
                className="w-20 h-20 aspect-square object-cover"
              />
              <div>
                <Text lineClamp={1}>{p?.name}</Text>
                <Text lineClamp={2} size='sm'>{p?.description}</Text>
              </div>     
              <div className='flex flex-col justify-between'>
                <div className='flex gap-2'>
                  <Rating readOnly value={3} fractions={3}  /> ({p?.reviews_count ?? 3})
                </div>
                <p className='mt-auto whitespace-nowrap'>
                  {p?.price} тг
                </p>
              </div>   
            </div>

            <div className='flex gap-4 border p-3 border-l-0'>
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
              <div>
                <p>{q?.expand?.user?.fio}</p>
                <div className="mt-1 flex gap-4">
                  <Rating size="sm" readOnly value={q?.rating} />
                  <p>{dayjs(q?.created).format('DD MMMM YYYY')}</p>
                </div>
                
                <p className="mt-2">{q?.comment}</p>
              </div>
            </div>
            
          </div>
        )
      })}
    </div>
  )
}
