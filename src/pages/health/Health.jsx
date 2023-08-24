import React from 'react'
import { HealthPros } from './ui/HealthPros'
import { HealthHeader } from './ui/HealthHeader'
import { CourseCurrator } from 'pages/courses/ui/CourseCurrator'
import curratorHealth from 'shared/assets/images/curratorHealth.jpg'
import { HealthLink } from '../../shared/ui/HealthLink'
import { HealthCard } from 'entities/healthCard'
import { pb } from 'shared/api'

async function getHealth() {
  const text = await pb
    .collection('text')
    .getFullList({ filter: `page = 'health'` })
  const images = await pb
    .collection('images')
    .getFullList({ filter: `page = 'health'` })
  const slider = await pb
    .collection('slider')
    .getFullList({ filter: `page = 'health'` })
  return {
    text: text[0],
    images: images[0],
    slider: slider[0],
  }
}

export const Health = () => {

  const onSubmit = async (data) => {
    await pb.collection('bids').create({
      ...data,
      type: 'health'
    })
  }

  const [health, setHealth] = React.useState({})

  const headings = health?.text?.headings
  const text = health?.text?.text
  const slider = health?.slider?.image
  const images = health?.images ?? {}

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

  React.useEffect(() => {
    getHealth().then((res) => {
      setHealth(res)
    })
  }, [])

  return (
    <main className="w-full">
      <HealthHeader
        health={health}
        images={images}
        headings={headings}
        text={text}
      />
      <HealthPros
        headings={headings}
        health={health}
        images={images}
        text={text}
      />
      <div className="grid grid-cols-1 gap-6 mt-10">
        {array.map((val, i) => {
          return <HealthCard card={val} key={i} />
        })}
      </div>
      <CourseCurrator
        name="Байзакова Гульнара Сериковна"
        img={curratorHealth}
        desc="Терапевт-кардиолог высшей категории, действующий врач-эксперт Кардиологического центра города Павлодар, врач-консультант по иммунопрофилактике и оздоровлению через санаторно-курортные комплексы."
      />
      <HealthLink onSubmit={onSubmit} />
    </main>
  )
}
