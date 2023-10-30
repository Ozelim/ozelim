import Cookies from 'js-cookie'
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

  async function get () {
    saveToLocalStorage(page)
    // await getData(page)
    // .then(res => {
    //   saveToLocalStorage({
    //     images: res.images,
    //     text: res.text.text,
    //     headings: res.text.headings,
    //     page
    //   })
    //   // setImages(res.images)
    //   // setText(res.text.text)
    //   // setHeadings(res.text.headings)
    // })
  }

  async function saveToLocalStorage () {
    const storedDataString  = localStorage.getItem(page)

    if (storedDataString) {
      const { images, text, headings } = JSON.parse(storedDataString )
      setImages(images)
      setText(text)
      setHeadings(headings)
    }

    if (!storedDataString) {
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 2 * 24 * 60 * 60 * 1000); 


      let data = {}
      await getData(page)
      .then(res => {
        data = {
          images: res.images,
          text: res.text.text,
          headings: res.text.headings,
          page
        }
        setImages(res.images)
        setText(res.text.text)
        setHeadings(res.text.headings)
      })

      const dataString = JSON.stringify({...data, expires: expirationDate.getTime()});

      localStorage.setItem(page, dataString);
    } else {
      const storedData = JSON.parse(storedDataString);
      const currentTime = new Date().getTime();

      if (storedData.expires <= currentTime) {
        localStorage.removeItem(page);
      }
    }
  }

  React.useEffect(() => {
    get()
  }, [])

  return {
    text,
    images,
    headings
  }
}



