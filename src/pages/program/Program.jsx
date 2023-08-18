import React from 'react'

import { ProgramHeader } from './ui/ProgramHeader'
import { ProgramPros } from './ui/ProgramPros'
import { ProgramSuits } from './ui/ProgramSuits'
import { ProgramRules } from './ui/ProgramRules'
import { ProgramDocs } from './ui/ProgramDocs'
import { pb } from 'shared/api'

async function getProgram() {
  const text = await pb
    .collection('text')
    .getFullList({ filter: `page = 'program'` })
  const images = await pb
    .collection('images')
    .getFullList({ filter: `page = 'program'` })
  return {
    text: text[0],
    images: images[0],
  }
}

export const Program = () => {
  const [program, setProgram] = React.useState({})

  const headings = program?.text?.headings
  const text = program?.text?.text

  const images = program?.images ?? {}

  React.useEffect(() => {
    getProgram().then((res) => {
      setProgram(res)
    })
  }, [])

  return (
    <div className="w-full">
      <ProgramHeader
        headings={headings}
        text={text}
        program={program}
        images={images}
      />
      <ProgramPros headings={headings} text={text} />
      <ProgramSuits headings={headings} text={text} />
      <ProgramRules headings={headings} text={text} />
      <ProgramDocs />
    </div>
  )
}
