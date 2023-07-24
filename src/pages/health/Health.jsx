import React from 'react'
import { HealthPros } from './ui/HealthPros'
import { HealthHeader } from './ui/HealthHeader'
import { HealthWhatGives } from './ui/HealthWhatGives'

export const Health = () => {
  return (
    <main className="w-full">
      <HealthHeader />
      <HealthPros />
      <HealthWhatGives />
    </main>
  )
}
