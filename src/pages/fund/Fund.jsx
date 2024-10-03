import React from 'react'
import { useMediaQuery } from '@mantine/hooks'
import { useLangContext } from 'app/langContext'
import { usePageData } from 'shared/hooks'
import { Image } from 'shared/ui'
import fund1 from 'shared/assets/images/fund-01.png'
import fund2 from 'shared/assets/images/fund-37.png'
import { Button } from '@mantine/core'

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
                  index={1}
                />
                <div>
                  <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">
                    {text?.text1}cha
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

            {/* <section className='mt-6 text-center'>
              <h2 className='font-semibold text-[20px]'>
                Документы фонда
              </h2>
              <p className='underline cursor-pointer text-primary-500' onClick={matches ? open : () => {}}>
                {matches 
                  ? qq(`Справка о гос.регистрации фонда, Устав фонда`, `Мемлекеттік тіркеу куәлік`)
                  : <a href={'/policynew.pdf'} target='_blank'>
                      {qq(`Справка о гос.регистрации фонда, Устав фонда`, `Мемлекеттік тіркеу куәлік`)}
                    </a>
                }
              </p>
            </section> */}

            <section className="mt-10 lg:mt-16">
              <div className="text-center">
                <h1 className="text-4xl font-medium text-primary-500">
                  {headings?.heading3} 
                </h1>
                <div className='grid gap-8 mt-5 max-w-3xl mx-auto'>
                  <p className="tracking-wider text-left underline text-primary-500 text-xl">{text?.text3}</p>
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
                    {text?.text8}
                  </p>
                </div>
                <div>
                  <h2 className='md:text-2xl lg:text-4xl text-primary-500 border-b-4 border-black pb-2 md:pb-4 font-bold'>
                    {headings?.heading7}
                  </h2>
                  <p className='mt-2 md:mt-4 text text-xl'>
                    {text?.text9}
                  </p>
                </div>
                <div>
                  <h2 className='md:text-2xl lg:text-4xl text-primary-500 border-b-4 border-black pb-2 md:pb-4 font-bold'>
                    {headings?.heading8}
                  </h2>
                  <p className='mt-2 md:mt-4 text text-xl'>
                    {text?.text10}
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
                <div className='flex flex-col'>
                  <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">
                    {text?.text11}
                  </ul>
                  <a href={'/fund-1-2.pdf'} target='_blank'>
                    <Button className='mt-4'>
                      Свидетельство о авторском праве
                    </Button>
                  </a>
                  <a href={'/fund-3-37.pdf'} target='_blank'>
                    <Button className='mt-4'>
                    ⁠Авторская система создания и управления Эндаумент фондами в Казахстане
                    </Button>
                  </a>
                </div>
              </div>
            </section>

            <section className="mt-10 lg:mt-16">
              {/* <div className='text-center'>
                  <h2 className='text-slate-400 text-[14px]'>
                    Документы
                  </h2>
                <img src={'/fund1.png'} alt="" />
                <p className='underline cursor-pointer text-primary-500'>
                  <div className='flex gap-4 flex-wrap my-3'>
                    <img src={fund1} alt="" className='max-w-[280px] mx-auto'/>
                  </div>

                </p>
              </div> */}
              <div className="text-center flex justify-center items-center flex-col">
                <h1 className="text-4xl font-medium text-primary-500">
                  {headings?.heading99} 
                </h1>

                <ul className="mt-5 font-medium paragraph list-disc max-w-3xl mx-auto">
                  <li className='text'>{text?.text991}</li>
                  <li className='text'>{text?.text992}</li>
                  <li className='text'>{text?.text993}</li>
                  <li className='text'>{text?.text994}</li>
                  <li className='text'>{text?.text995}</li>
                  <li className='text'>{text?.text996}</li>
                  <li className='text'>{text?.text997}</li>
                  <li className='text'>{text?.text998}</li>
                </ul>
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
                  <h2 className='font-semibold text-[20px] text-primary-500'>
                    {headings?.heading11}
                  </h2>
                  <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">
                    {text?.text12}
                  </ul>

                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
