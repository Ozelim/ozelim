import React from 'react'
import { HealthPros } from './ui/HealthPros'
import { HealthHeader } from './ui/HealthHeader'
import { CourseCurrator } from 'pages/courses/ui/CourseCurrator'
import curratorHealth from 'shared/assets/images/curratorHealth.jpg'
import { HealthLink } from '../../shared/ui/HealthLink'
import { HealthCard } from 'entities/healthCard'
import { pb } from 'shared/api'
import { getImageUrl } from 'shared/lib'

async function getHealth() {
  const text = await pb
    .collection('text')
    .getFullList({ filter: `page = 'health'` })
  const images = await pb
    .collection('images')
    .getFullList({ filter: `page = 'health'` })
  return {
    text: text[0],
    images: images[0],
  }
}

export const Health = () => {
  const [health, setHealth] = React.useState({})

  const headings = health?.text?.headings
  const text = health?.text?.text

  const images = health?.images ?? {}

  React.useEffect(() => {
    getHealth().then((res) => {
      setHealth(res)
    })
  }, [])

  const array = [
    {
      flow: 'left',
      text: text?.flow1,
      image: getImageUrl(health?.images, images?.[3]),
    },
    {
      flow: 'right',
      text: text?.flow2,
      image: getImageUrl(health?.images, images?.[4]),
    },
    {
      flow: 'left',
      text: text?.flow3,
      image: getImageUrl(health?.images, images?.[5]),
    },
    {
      flow: 'right',
      text: text?.flow4,
      image: getImageUrl(health?.images, images?.[6]),
    },
  ]

  return (
    <main className="w-full">
      <HealthHeader headings={headings} text={text} />
      <HealthPros headings={headings} text={text} />
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
      <HealthLink />
    </main>
  )
}
