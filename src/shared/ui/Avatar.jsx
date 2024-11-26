import React from 'react'
import { Avatar as Avatr, clsx} from '@mantine/core';
import { getImageUrl } from 'shared/lib';

export const Avatar = ({src, record, cl, ...rest}) => {

  const [url, setUrl] = React.useState(null)

  function checkUrl (url) {
    if (url instanceof File) setUrl(URL.createObjectURL(url))
    if (record) setUrl(getImageUrl(record, url))
  }

  React.useEffect(() => {
    checkUrl(src)
  }, [])


  if (record?.agent) return (
    <div className='rounded-full border-4 border-green-500'>
      <Avatr
        src={url}
        alt='avatar'
        {...rest}
      >
        <div className={clsx('aspect-square h-full bg-slate-300 rounded-full', cl)}/>
      </Avatr>
    </div>
  )

  return (
    <div className='rounded-full'>
      <Avatr
        src={url}
        alt='avatar'
        {...rest}
      >
        <div className={clsx('aspect-square h-full bg-slate-300 rounded-full', cl)}/>
      </Avatr>
    </div>
  )
}
