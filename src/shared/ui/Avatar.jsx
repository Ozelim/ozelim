import React from 'react'
import { Avatar as Avatr, clsx} from '@mantine/core';
import { getImageUrl } from 'shared/lib';
import { useLocation } from 'react-router-dom';

export const Avatar = ({src, record, cl, ...rest}) => {

  const [url, setUrl] = React.useState(null)

  function checkUrl (url) {
    if (url instanceof File) setUrl(URL.createObjectURL(url))
    if (record) setUrl(getImageUrl(record, url))
  }

  const {pathname} = useLocation()

  

  React.useEffect(() => {
    checkUrl(src)
  }, [])

  if (record?.agent && pathname.includes('aprofile')) return (
    <div className='rounded-full border-4 border-green-500 w-fit h-fit'>
      <Avatr
        src={url}
        alt='avatar'
        {...rest}
      >
        <div className={clsx('aspect-square h-full bg-slate-300 rounded-full', cl)}/>
      </Avatr>
    </div>
  )

  if (record?.verified && pathname.includes('aprofile')) return (
    <div className='rounded-full border-4 border-orange-500 w-fit h-fit'>
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
