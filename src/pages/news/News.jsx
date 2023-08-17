import React from 'react'
import { NewsCard } from 'entities/newsCard'
import { pb } from 'shared/api'

async function getNews() {
  const text = await pb
    .collection('text')
    .getFullList({ filter: `page = 'news'` })
  const images = await pb
    .collection('images')
    .getFullList({ filter: `page = 'news'` })
  const slider = await pb
    .collection('slider')
    .getFullList({ filter: `page = 'news'` })
  return {
    text: text[0],
    images: images[0],
    slider: slider[0],
  }
}

export const News = () => {
  const [news, setNews] = React.useState({})

  const headings = news?.text?.headings
  const text = news?.text?.text
  const slider = news?.slider?.image
  const images = news?.images ?? {}

  React.useEffect(() => {
    getNews().then((res) => {
      setNews(res)
    })
  }, [])

  return (
    <div className="w-full">
      <div className="container">
        <div className="grid grid-cols-1 gap-6">
          {Array(6)
            .fill(1)
            .map((_, i) => {
              return (
                <NewsCard
                  images={images}
                  news={news}
                  headings={headings}
                  text={text}
                  key={i}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}
