import React from 'react'
import { useMediaQuery } from '@mantine/hooks'
import { useLangContext } from 'app/langContext'
import { usePageData } from 'shared/hooks'
import { Image } from 'shared/ui'


export const Fund = () => {

  const { headings, images, text } = usePageData('fund')

  const matches = useMediaQuery(`(min-width: 767px)`)

  const { qq } = useLangContext()

  return (
    <>
      <div className='w-full'>
        <div className="container">
          <div className="w-full">

            <section className="w-full mt-4">
              <h1 className="text-4xl text-primary-500 font-bold">
                Эндаумент фонд
              </h1>
              <div className='flex flex-col md:flex-row gap-8 mt-6'>
                <Image
                  className="max-w-2xl w-full rounded-primary max-h-80 object-cover"
                  record={images}
                  index={4}
                />
                <div>
                  <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">
                    {text?.text1}
                  </ul>
                </div>
              </div>
            </section>

            <section className="mt-10 lg:mt-16">
              <div className="text-center">
                <h1 className="text-4xl font-medium text-primary-500">
                  {headings?.heading1} 
                </h1>
                <div className='grid gap-8 mt-5 max-w-3xl mx-auto'>
                  <p className="text text-left">{text?.text2}</p>
                </div>
              </div>
            </section>

            <section className='mt-6 text-center'>
              <h2 className='font-semibold text-[20px]'>
                {headings?.heading2}
              </h2>
              <p className='underline cursor-pointer text-primary-500' onClick={matches ? open : () => {}}>
                {matches 
                  ? qq(`Справка о гос.регистрации фонда, Устав фонда`, `Мемлекеттік тіркеу куәлік`)
                  : <a href={'/policynew.pdf'} target='_blank'>
                      {qq(`Справка о гос.регистрации фонда, Устав фонда`, `Мемлекеттік тіркеу куәлік`)}
                    </a>
                }
              </p>
            </section>

            <section className="mt-10 lg:mt-16">
              <div className="text-center">
                <h1 className="text-4xl font-medium text-primary-500">
                  {headings?.heading3} 
                </h1>
                <div className='grid gap-8 mt-5 max-w-3xl mx-auto'>
                  <p className="text text-left">{text?.text3}</p>
                </div>
              </div>
              <div className='grid lg:grid-cols-3 mt-4 gap-4'>
                <Image
                  record={images}
                  index={2}
                  className="max-w-[350px] w-full m-auto h-full max-h-64 rounded-primary object-cover"
                />
                <Image
                  record={images}
                  index={3}
                  className="max-w-[350px] w-full m-auto h-full max-h-64 rounded-primary object-cover"
                />
                <Image
                  record={images}
                  index={4}
                  className="max-w-[350px] w-full m-auto h-full max-h-64 rounded-primary object-cover"
                />
              </div>
            </section>
            
            <section className='mt-8'>
              <h1 className="text-4xl font-medium text-primary-500 my-4">
                {headings?.heading4} 
              </h1>
              <ul className="space-y-4 px-4">
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text">
                    {text?.text4}

                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text">
                    {text?.text5}

                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text">
                    {text?.text6}

                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                <p className="text">
                    {text?.text7}

                  </p>
                </li>
              </ul>
            </section>

            <section className='w-full pt-10'>
              <h1 className='heading text-primary-500 '>{headings?.heading5}</h1>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
                <div>
                  <h2 className='md:text-2xl lg:text-4xl text-primary-500 border-b-4 border-black pb-2 md:pb-4 font-bold'>
                    {headings?.heading6}
                  </h2>
                  <p className='mt-2 md:mt-4 text text-xl'>
                    {text?.text4}
                  </p>
                </div>
                <div>
                  <h2 className='md:text-2xl lg:text-4xl text-primary-500 border-b-4 border-black pb-2 md:pb-4 font-bold'>
                    {headings?.heading7}
                  </h2>
                  <p className='mt-2 md:mt-4 text text-xl'>
                    {text?.text5}
                  </p>
                </div>
                <div>
                  <h2 className='md:text-2xl lg:text-4xl text-primary-500 border-b-4 border-black pb-2 md:pb-4 font-bold'>
                    {headings?.heading8}
                  </h2>
                  <p className='mt-2 md:mt-4 text text-xl'>
                    {text?.text6}
                  </p>
                </div>
              </div>
            </section>

            <section className="w-full mt-8">
              <h1 className="text-4xl text-primary-500 font-bold">
                {headings?.heading9}
              </h1>
              <div className='flex flex-col md:flex-row gap-8 mt-6'>
                <Image
                  className="max-w-2xl w-full rounded-primary max-h-80 object-cover"
                  record={images}
                  index={5}
                />
                <div>
                  <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">
                    {text?.text7}
                  </ul>
                </div>
              </div>
            </section>

            <section className='mt-8'>
              <h1 className="text-4xl text-primary-500 font-bold text-center">
                {headings?.heading10}
              </h1>
              <div className='flex flex-col md:flex-row gap-8 mt-6'>
                <Image
                  className="max-w-2xl w-full rounded-primary max-h-80 object-cover"
                  record={images}
                  index={6}
                />
                <div>
                  <h2 className='font-semibold text-[20px]'>
                    {headings?.heading11}
                  </h2>
                  <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">
                    {text?.text8}
                  </ul>
                  <h2 className='text-slate-400 text-[14px] mt-4'>
                    {headings?.heading12}
                  </h2>
                  <p className='underline cursor-pointer text-primary-500'>
 
                      <a href={'/fund.pdf'} target='_blank'>
                        {qq(`Программу Эндаумент фонда, Свидетельства, Сертификат `, `Мемлекеттік тіркеу куәлік`)} asd
                      </a>
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  )
}
