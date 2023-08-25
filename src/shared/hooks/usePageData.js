import React from 'react'
import { pb } from 'shared/api'

async function getData (page) {

  const images = await pb.collection('images').getFullList({filter: `page = '${page}'`})
  const text = await pb.collection('text').getFullList({filter: `page = '${page}'`})

  return {
    // slider: slider[0], 
    images: images[0], 
    text: text[0]
  }
}

export const usePageData = (page) => {

  const [text, setText] = React.useState({})
  const [images, setImages] = React.useState({})
  const [headings, setHeadings] = React.useState({})

  React.useEffect(() => {
    getData(page)
    .then(res => {
      setImages(res.images)
      setText(res.text.text)
      setHeadings(res.text.headings)
    })
  }, [])

  return {
    text,
    images,
    headings
  }
}



