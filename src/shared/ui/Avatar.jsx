import React from 'react'
import { Avatar as Avatr} from '@mantine/core';
import { getImageUrl } from 'shared/lib';

export const Avatar = ({src, record, ...rest}) => {

  const [url, setUrl] = React.useState(null)

  function checkUrl (url) {
    if (url instanceof File) setUrl(URL.createObjectURL(url))
    if (record) setUrl(getImageUrl(record, url))
  }

  React.useEffect(() => {
    checkUrl(src)
  }, [])

  return (
    <Avatr
      src={url}
      alt='avatar'
      {...rest}
    >
      <div className='aspect-square h-full bg-slate-300 rounded-full'/>
    </Avatr>
  )
}
