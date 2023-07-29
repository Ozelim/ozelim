import { clsx } from '@mantine/core'
import React from 'react'
import { getImageUrl } from 'shared/lib'

export function ImageModal({innerProps}) {

  const [image, setImage] = React.useState(null)
  const [pdf, setPdf] = React.useState(null)

  React.useEffect(() => {
    if (innerProps?.url instanceof File) {
      if (innerProps?.url?.type === 'application/pdf') {
        setPdf(URL.createObjectURL(innerProps?.url))
        return
      }
      setImage(URL.createObjectURL(innerProps?.url))
      return
    }

    if (!innerProps?.record) {
      setImage(innerProps?.url)
      return
    }

    setImage(getImageUrl(innerProps?.record, innerProps?.url))
  }, [innerProps])

  if (pdf) return (
    <iframe 
      src={pdf} 
      frameborder="0"
      className='w-full h-screen'
    />
  )

  return (
    <img src={image} alt="" className={clsx('w-full h-auto', innerProps.className ?? '')} />
  )
}
