import { useMediaQuery } from '@mantine/hooks'
import { useLangContext } from 'app/langContext'
import React from 'react'
import { usePageData } from 'shared/hooks'
import { Image } from 'shared/ui'

export const Results = () => {

  const {text, headings, images} = usePageData('home')

  const matches = useMediaQuery(`(min-width: 767px)`)

  const { qq } = useLangContext()

  return (
    <div className='w-full pt-10'>
      <div className="container">
        <h1 className='heading text-primary-500 '>{headings?.[1]}</h1>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
          <div>
            <Image
              record={images}
              index={2}
              className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
            />
            {/* <h2 className='md:text-2xl lg:text-4xl text-primary-500 border-b-4 border-black pb-2 md:pb-4 font-bold'>
              {text?.[1]} 
            </h2> */}
            <p className='mt-2 md:mt-4 text text-xl'>
              {text?.[4]}
            </p>
          </div>
          <div>
            <Image
              record={images}
              index={3}
              className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
            />
            {/* <h2 className='md:text-2xl lg:text-4xl text-primary-500 border-b-4 border-black pb-2 md:pb-4 font-bold'>
              {text?.[2]}
            </h2> */}
            <p className='mt-2 md:mt-4 text text-xl'>
              {text?.[5]}
            </p>
          </div>
          <div>
            <Image
              record={images}
              index={4}
              className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
            />
            {/* <h2 className='md:text-2xl lg:text-4xl text-primary-500 border-b-4 border-black pb-2 md:pb-4 font-bold'>
              {text?.[3]}
            </h2> */}
            <p className='mt-2 md:mt-4 text text-xl'>
              {text?.[6]}
            </p>
          </div>
        </div>

        <section className='mt-6 text-center'>
          <h2 className='font-semibold text-[20px]'>
            Документы Ассоциации
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
        
        <section className='mt-8'>
          <div className="grid lg:grid-cols-2 mt-4 gap-8">
            <Image
              record={images}
              index={2}
              className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
            />
            
            {/* {getImageUrl(images, images?.[1]) ? (
              <img
                className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0"
                src={getImageUrl(images, images?.[1])}
                loading="lazy"
                alt="travel"
              />
            ) : (
              <div className="lg:max-w-xl w-full m-auto bg-zinc-200" />
            )} */}
            <h1 className="text-center text-2xl md:text-3xl font-bold font-head text-teal-500 flex justify-center items-center h-full">
              {headings?.main}
              Преимущества и возможности Ассоциации
            </h1>
          </div>
          <div className="grid grid-cols-5 gap-6">
            <p className=' border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas suscipit eaque ipsum culpa harum distinctio doloribus esse? Sequi repudiandae facere in impedit laboriosam aperiam, obcaecati voluptate ad, nulla earum vitae.</p>
            <p className=' border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas suscipit eaque ipsum culpa harum distinctio doloribus esse? Sequi repudiandae facere in impedit laboriosam aperiam, obcaecati voluptate ad, nulla earum vitae.</p>
            <p className=' border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas suscipit eaque ipsum culpa harum distinctio doloribus esse? Sequi repudiandae facere in impedit laboriosam aperiam, obcaecati voluptate ad, nulla earum vitae.</p>
            <p className=' border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas suscipit eaque ipsum culpa harum distinctio doloribus esse? Sequi repudiandae facere in impedit laboriosam aperiam, obcaecati voluptate ad, nulla earum vitae.</p>
            <p className=' border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas suscipit eaque ipsum culpa harum distinctio doloribus esse? Sequi repudiandae facere in impedit laboriosam aperiam, obcaecati voluptate ad, nulla earum vitae.</p>
          </div>
        </section>

        <section className="w-full mt-40">
          <h1 className="text-4xl text-primary-500 font-bold">
            {headings?.task}
            Руководитель Ассоциации туристов Казахстана
          </h1>
          <div className='flex flex-col md:flex-row gap-8 mt-6'>
            <Image
              className="max-w-2xl w-full rounded-primary max-h-80 object-cover"
              record={images}
              index={4}
            />
            <div>
              <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">
                <li>• {text?.task1} Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur delectus tempora dolores culpa enim eius beatae, laboriosam exercitationem ducimus nam blanditiis aliquid est iste impedit debitis eos repudiandae dicta illum.</li>
                <li>• {text?.task2} Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur delectus tempora dolores culpa enim eius beatae, laboriosam exercitationem ducimus nam blanditiis aliquid est iste impedit debitis eos repudiandae dicta illum.</li>
                <li>• {text?.task3} Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur delectus tempora dolores culpa enim eius beatae, laboriosam exercitationem ducimus nam blanditiis aliquid est iste impedit debitis eos repudiandae dicta illum.</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
