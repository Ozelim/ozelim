import React from 'react'

import { ProgramHeader } from './ui/ProgramHeader'
import { ProgramPros } from './ui/ProgramPros'
import { ProgramSuits } from './ui/ProgramSuits'
import { ProgramRules } from './ui/ProgramRules'
import { ProgramDocs } from './ui/ProgramDocs'

export const Program = () => {
  return (
    <div className="w-full">
      <ProgramHeader />
      <ProgramPros />
      <ProgramSuits />
      <ProgramRules />
      <ProgramDocs />
    </div>
  )
}
