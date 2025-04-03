import React from 'react'
import { useShopStore } from './shopStore'
import { getImageUrl } from 'shared/lib'
import { Button, clsx, Collapse, Pagination, Rating, Textarea } from '@mantine/core'
import { pb } from 'shared/api'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { openConfirmModal } from '@mantine/modals'

async function getReviewsByProduct (prods, page = 1) {

  if (prods?.length === 0) return []

  const filterQuery = prods?.map(id => `product_id = "${id}" && status = 'posted'`).join(" || ")

  return await pb.collection('reviews').getList(page, 20, {
    filter: filterQuery,
    expand: 'user, product_id, customer'
  })
}

export const Reviews = () => {

  const {shop} = useShopStore()

  const [selected, setSelected] = React.useState({})

  const [review, setReview] = React.useState({})

  const [reply, setReply] = React.useState('')
  const [reason, setReason] = React.useState('')

  const [reviews, setReviews] = React.useState([])

  const [options, setOptions] = React.useState({
    reply: false,
    delete: false
  })

  function handleOptionsClick (type, q) {
    if (type === 'reply') setOptions({...options, reply: !options?.reply, delete: false})
    if (type === 'delete') setOptions({...options, delete: !options?.delete, reply: false})
  }

  function handleReviewReply (r) {
    if (review?.id === r?.id) setReview({})
    else setReview(r)
  }

  const products = shop?.expand?.products

  const prods = products?.map(p => p?.id)

  async function handleReviews (q) {
    // getReviewsByProduct(prods)
    // .then(res => {
    //   setReviews(res)
    //   setSelected(q)
    // })
  }

  function handleReviewSelect (q) {
    if (selected?.id === q?.id) return setSelected({})
    setSelected(q)
    setOptions({
      reply: false,
      delete: false
    })
    setReply('')
    setReason('')
  }

  async function replyToReview () {
    openConfirmModal({
      centered: true,
      title: 'Ответ на отзыв',
      labels: { confirm: 'Отправить', cancel: 'Отмена' },
      children: 'Вы действительно хотите отправить ответ на отзыв?',
      onConfirm: async () => {
        await pb.collection('reviews').update(selected?.id, {
          reply
        })
      },
      'aria-hidden': true,
    })
  }

  async function deleteReview () {
    openConfirmModal({
      centered: true,
      title: 'Удаление отзыва',
      labels: { confirm: 'Удалить', cancel: 'Отмена' },
      children: 'Вы действительно хотите удалить отзыв?',
      onConfirm: async () => {
        await pb.collection('reviews').update(selected?.id, {
          status: 'deleted',
        })
      },
      'aria-hidden': true,
    })
  }

  React.useEffect(() => { 
    getReviewsByProduct(prods)
    .then(res => {
      console.log(res);
      
      setReviews(res)
    })
  }, [])

  return (
    <div className='grid grid-cols-[75%_auto] gap-4'>
      <div className='flex flex-col gap-4'>
        {reviews?.items?.map((q, i) => {
          const p = q?.expand?.product_id
          return (
            <div 
              key={i} 
              className={clsx("cursor-pointer mx-auto w-full border rounded-primary flex gap-4 p-3 bg-white shadow-sm", {
                'border-2 border-red-500': selected?.id === q?.id
              })}
              onClick={() => handleReviewSelect(q)}
            >
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
                  <Link
                    to={`/duken/product/${p?.id}`}
                  >
                    <span className='underline'>
                      {p?.name}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
        <div className="flex justify-center">
          <Pagination

          />
        </div>
      </div>
      <div className='bg-white p-3 shadow-sm rounded-primary border'>
        <div className='flex flex-col space-y-3'>
          <Button
            disabled={!selected?.id}
            onClick={() => handleOptionsClick('reply')}
            variant={options?.reply && !options?.delete ? 'filled' : 'outline'}
          >
            Ответить
          </Button>
          <Button
            disabled={!selected?.id}
            onClick={() => handleOptionsClick('delete')}
            variant={options?.delete && !options?.reply ? 'filled' : 'outline'}
          >
            Удалить отзыв
          </Button>
        </div>
          <Collapse
            in={options?.reply && selected?.id}
          >
            <div className="mt-4">
              <Textarea
                label='Ответ на отзыв'
                value={reply}
                onChange={(e) => setReply(e?.currentTarget?.value)}
                autosize 
                minRows={4}
                placeholder='Введите ответ на отзыв'
                classNames={{
                  input: '!font-normal'
                }}
                variant='filled'
              />
              <Button 
                className='mt-3'
                disabled={!reply}
                onClick={replyToReview}
              >
                Отправить ответ
              </Button>
            </div>
          </Collapse>
          <Collapse
            in={options?.delete && selected?.id}
          >
            <div className="mt-4">
              <Textarea
                label='Причина удаления'
                value={reason}
                onChange={(e) => setReason(e?.currentTarget?.value)}
                autosize 
                minRows={4}
                variant='filled'
                placeholder='Укажите причину удаления отзыв'
                classNames={{
                  input: '!font-normal'
                }}
              />
              <Button 
                className='mt-3'
                disabled={!reason}
                onClick={deleteReview}
              >
                Отправить
              </Button>
            </div>
          </Collapse>
      </div>
    </div>
  )
}