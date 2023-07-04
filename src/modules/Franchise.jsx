import { Button } from '@mantine/core'
import React from 'react'

export const Franchise = () => {
  return (
    <div className='flex justify-between items-center bg-[#fff]  px-4 rounded-primary'>
        <div className='ml-8'>
            <div className='text-4xl text-[#424242]'>Франшиза</div>
            <div className='text-4xl mt-2 text-[#424242]'>"ПОЕХАЛИ С НАМИ"</div>
            <p className='mt-5 text-2xl text-[#424242] '>Откройте свое туристическое агентство</p>
            <Button className='mt-5'>Подробнее</Button>
        </div>
        <img src="https://img.poehalisnami.kz/images/franchise-banner.jpg" alt="" />
    </div>

  )
}
