import React from 'react'
import { NewsCard } from 'entities/newsCard'
import { pb } from 'shared/api'

async function getNews() {
  return await pb.collection('news').getFullList()
}

export const News = () => {
  
  const [news, setNews] = React.useState([])

  React.useEffect(() => {
    getNews().then((res) => {
      setNews(res)
    })
  }, [])

  return (
    <div className="w-full">
      <div className="container">
        <div className="grid grid-cols-1 gap-6">
          {news?.length !== 0 ? news?.map((n, i) => {
            return <NewsCard news={n} />
          }) : (
            <div className='flex justify-center items-center w-full h-screen'>
              Пока что нет новостей
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
