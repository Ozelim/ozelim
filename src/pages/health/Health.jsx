import React from 'react'
import { HealthPros } from './ui/HealthPros'
import { HealthHeader } from './ui/HealthHeader'
import { CourseCurrator } from 'pages/courses/ui/CourseCurrator'
import { HealthLink } from '../../shared/ui/HealthLink'
import { HealthCard } from 'entities/healthCard'
import { pb } from 'shared/api'
import { usePageData } from 'shared/hooks'
import { Link } from 'react-router-dom'
import { useLangContext } from 'app/langContext'

export const Editor = ({data}) => {

  return (
    <div className='w-full mt-10'>
      <div className="max-w-2xl mx-auto">
        <div dangerouslySetInnerHTML={{__html: data}}/>
      </div>
    </div>
  )
}

export const Health = () => {

  const {kz} = useLangContext() 
  
  const { headings, images, text } = usePageData('health')

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
      <div className="container">
        <div className="grid grid-cols-1 gap-6 mt-10">
          {array.map((val, i) => {
            return <HealthCard card={val} key={i} images={images}/>
          })}
        </div>
      </div>

      <div className="container">
        <Editor data={text?.editor} />
      </div>

      {headings?.z1 && (
        <CourseCurrator
          headings={headings}
          images={images}
          text={text}
        />
      )}

      <div className='text-center mt-10'>
        <Link to={'/price'} className='text-blue-500 underline'>
          {kz ? `Бағалар туралы көбірек біліңіз` : `Узнать подробнее о ценах`}
        </Link>
      </div>
    </main>
  )
}
