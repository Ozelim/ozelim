import React from 'react'
import { useLangContext } from 'app/langContext'
import { pb } from 'shared/api'

async function getData (page) {

  const images = await pb.collection('images').getFullList({filter: `page = '${page}'`})
  const text = await pb.collection('text').getFullList({filter: `page = '${page}'`})

  return {
    images: images[0], 
    text: text[0]
  }
}

export const usePageData = (page) => {

  const {lang, kz} = useLangContext()

  const [text, setText] = React.useState({})
  const [images, setImages] = React.useState({})
  const [headings, setHeadings] = React.useState({})

  async function saveToLocalStorage () {
    const storedDataString  = localStorage.getItem(kz ? `${page}_kz` : `${page}`)

    if (storedDataString) {
      const { images, text, headings } = JSON.parse(storedDataString)
      setImages(images)
      setText(text)
      setHeadings(headings)
    }

    if (!storedDataString) {
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 1 * 24 * 60 * 60 * 1000); 


      let data = {}
      await getData(page)
      .then(res => {
        data = {
          images: kz ? res.text?.images : res?.images,
          text: kz ? res.text?.text_kz : res.text?.text,
          headings: kz ? res.text?.headings_kz : res.text?.headings,
          page: kz ? `${page}_kz` : page
        }
        setImages(kz ? res.images : res.images)
        setText(kz ? res.text.text_kz : res.text.text)
        setHeadings(kz ? res.text.headings_kz : res.text.headings)
      })

      const dataString = JSON.stringify({...data, expires: expirationDate.getTime()});
      kz 
        ? localStorage.setItem(`ozelim_${page}_kz`, dataString)
        : localStorage.setItem(`ozelim_${page}`, dataString)
      
    } else {
      const storedData = JSON.parse(storedDataString);
      const currentTime = new Date().getTime();

      if (storedData.expires <= currentTime) {
        localStorage.removeItem(page);
      }
    }
  }

  React.useEffect(() => {
    saveToLocalStorage(page)
  }, [lang])

  return {
    text,
    images,
    headings
  }
}