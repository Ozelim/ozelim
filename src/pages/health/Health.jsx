import React from 'react'
import { HealthPros } from './ui/HealthPros'
import { HealthHeader } from './ui/HealthHeader'
import { CourseCurrator } from 'pages/courses/ui/CourseCurrator'
import curratorHealth from 'shared/assets/images/curratorHealth.jpg'
import { HealthLink } from '../../shared/ui/HealthLink'
import { HealthCard } from 'entities/healthCard'
import { pb } from 'shared/api'
import { usePageData } from 'shared/hooks'

export const Health = () => {

  const { headings, images, text } = usePageData('health')

  const onSubmit = async (data) => {
    await pb.collection('bids').create({
      ...data,
      type: 'health'
    })
  }

  const array = [
    {
      flow: 'left',
      text: text?.flow1,
      index: 3,
    },
    {
      flow: 'right',
      text: text?.flow2,
      index: 4,
    },
    {
      flow: 'left',
      text: text?.flow3,
      index: 5,
    },
    {
      flow: 'right',
      text: text?.flow4,
      index: 6,
    },
  ]

  return (
    <main className="w-full">
      <HealthHeader
        images={images}
        headings={headings}
        text={text}
      />
      <HealthPros
        headings={headings}
        images={images}
        text={text}
      />
      <div className="grid grid-cols-1 gap-6 mt-10">
        {array.map((val, i) => {
          return <HealthCard card={val} key={i} images={images}/>
        })}
      </div>
      <CourseCurrator
        name="Байзакова Гульнара Сериковна"
        img={curratorHealth}
        desc="Терапевт-кардиолог высшей категории, действующий врач-эксперт Кардиологического центра города Павлодар, врач-консультант по иммунопрофилактике и оздоровлению через санаторно-курортные комплексы."
      />
      <HealthLink onSubmit={onSubmit} label={'Оставить заявку'} heading={'Узнать больше'} />
    </main>
  )
}
