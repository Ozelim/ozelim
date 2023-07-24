import React from 'react'

import { ProgramHeader } from './ui/ProgramHeader'
import { ProgramPros } from './ui/ProgramPros'
import { FcInfo } from 'react-icons/fc'
import { ProgramSuits } from './ui/ProgramSuits'
import { ProgramRules } from './ui/ProgramRules'

export const Program = () => {
  return (
    <div className="w-full">
      <ProgramHeader />
      <ProgramPros />
      <ProgramSuits />
      <ProgramRules />
    </div>
  )
}
