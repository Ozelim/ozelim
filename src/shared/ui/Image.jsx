import { clsx } from '@mantine/core'
import React from 'react'
import { getImageUrl } from 'shared/lib'

export const Image = ({record, index, className, ...rest}) => {

  // console.log(getImageUrl(record, record?.[index]), 'img');

  return getImageUrl(record, record?.[index]) 
    ? <img 
        src={getImageUrl(record, record?.[index])} 
        className={className} 
        alt={index} 
        {...rest}
      />
    : <div 
        className={clsx('bg-slate-300 w-full', className)}
        {...rest}
      />
}
