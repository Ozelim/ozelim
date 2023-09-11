import React from 'react'

import { ProgramHeader } from './ui/ProgramHeader'
import { ProgramPros } from './ui/ProgramPros'
import { ProgramSuits } from './ui/ProgramSuits'
import { ProgramRules } from './ui/ProgramRules'
import { ProgramDocs } from './ui/ProgramDocs'
import { pb } from 'shared/api'
import { usePageData } from 'shared/hooks'
import { Image } from 'shared/ui'

export const Program = () => {

  const { headings, images, text } = usePageData('program')

  return (
    <div className="w-full">
      <ProgramHeader
        images={images}
        headings={headings}
        text={text}
      />

      <ProgramPros headings={headings} text={text} />
      <ProgramSuits headings={headings} text={text} />
      <div className="w-full mt-8">
        <div className="container">
          <div className='grid lg:grid-cols-2 gap-4 lg:gap-8'>
            <Image
              record={images}
              index={2}
              className='rounded-primary max-w-md w-full lg:max-w-full lg:mx-0 mx-auto'
            />
            <div>
              <h2 className='text-2xl md:text-3xl font-head mb-4'>
                {headings?.fck_heading}
              </h2>
              <ul className='space-y-4 mt-4 lg:mt-8'>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p >
                    {text?.fck1}
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p >
                    {text?.fck1}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ProgramRules headings={headings} text={text} />
      <ProgramDocs />
    </div>
  )
}
