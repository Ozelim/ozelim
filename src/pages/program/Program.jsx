import React from 'react'

import { ProgramHeader } from './ui/ProgramHeader'
import { ProgramPros } from './ui/ProgramPros'
import { ProgramSuits } from './ui/ProgramSuits'
import { ProgramRules } from './ui/ProgramRules'
import { ProgramDocs } from './ui/ProgramDocs'
import { pb } from 'shared/api'
import { usePageData } from 'shared/hooks'

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
      <ProgramRules headings={headings} text={text} />
      <ProgramDocs />
    </div>
  )
}
