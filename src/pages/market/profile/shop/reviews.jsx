import React from 'react'
import { useShopStore } from './shopStore'
import { getImageUrl } from 'shared/lib'
import { Button, Collapse, Rating, Table, Text, Textarea } from '@mantine/core'
import { pb } from 'shared/api'
import dayjs from 'dayjs'

async function getReviewsByProduct (id, page = 1) {
  return await pb.collection('reviews').getList(page, 20, {
    filter: `product_id = '${id}'`,
    expand: 'user'
  })
}

export const Reviews = () => {

  const {shop} = useShopStore()

  const [selected, setSelected] = React.useState({})

  const [review, setReview] = React.useState({})

  const [reply, setReply] = React.useState('')

  const [reviews, setReviews] = React.useState([])

  function handleReviewReply (r) {
    if (review?.id === r?.id) setReview({})
    else setReview(r)
  }

  async function handleReviews (q) {
    getReviewsByProduct(q?.id)
    .then(res => {
      setReviews(res)
      setSelected(q)
    })
  }

  const products = shop?.expand?.products

  return (
    <div className='grid grid-cols-2 gap-4'>
      {products?.map((q, i) => {
        return (
          <div className='border p-3 h-fit' key={i}>
            <div className='grid grid-cols-[13%_auto_20%] gap-3'>
              <img
                alt="avatar"
                src={getImageUrl(q, q?.pics?.[0])}
                className="w-20 h-20 aspect-square object-cover"
              />
              <div>
                <Text lineClamp={1}>{q?.name}</Text>
                <Text lineClamp={2}>{q?.description}</Text>
              </div>
              <div className='flex flex-col justify-between items-end'>
                <Button 
                  onClick={() => handleReviews(q)}
                >
                  Отзывов {(q?.reviews_count)}
                </Button>
                <Rating fractions={3} readOnly value={3.3} />
              </div>
            </div>
            <Collapse 
              in={selected?.id === q?.id}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Имя</th>
                    <th>Оценка</th>
                    <th>Комментарий</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews?.items?.map((r) => {

                    const u = r?.expand?.user

                    return (
                      <tr key={r?.id}>
                        <td>{dayjs(r?.created).format(`DD.MM.YYYY`)}</td>
                        <td className='break-words max-w-[100px]'>{u?.fio}</td>
                        <td className='flex flex-col gap-2 items-center '>
                          <p>
                            {r?.rating}
                          </p>
                          <Rating readOnly value={r?.rating} />
                        </td>
                        <td>
                          {r?.comment}
                          <Button
                            compact
                            variant='subtle'
                            onClick={() => handleReviewReply(r)}
                          >
                            {review?.id === r?.id ? 'Свернуть' : 'Ответить'}
                          </Button>
                          <Collapse
                            in={review?.id === r?.id}
                          >
                            <Textarea
                              label='Комментарий'
                              variant='filled'
                              classNames={{
                                label: '!font-bold',
                                input: '!font-normal'
                              }}
                              autosize
                            />
                            <div className='flex justify-end mt-2'>
                              <Button
                                compact
                                variant='outline'
                              >
                                Ответить
                              </Button>
                            </div>
                          </Collapse>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Collapse>
          </div>
        )
      })}
    </div>
  )
}
