import React from 'react'
import { HealthPros } from './ui/HealthPros'
import { HealthHeader } from './ui/HealthHeader'
import { HealthWhatGives } from './ui/HealthWhatGives'
import { CourseCurrator } from 'pages/courses/ui/CourseCurrator'
import curratorHealth from 'shared/assets/images/curratorHealth.jpg'
import { HealthLink } from '../../shared/ui/HealthLink'

export const Health = () => {
  return (
    <main className="w-full">
      <HealthHeader />
      <HealthPros />
      <HealthWhatGives />
      <CourseCurrator
        name="Байзакова Гульнара Сериковна"
        img={curratorHealth}
        desc="Терапевт-кардиолог высшей категории, действующий врач-эксперт Кардиологического центра города Павлодар, врач-консультант по иммунопрофилактике и оздоровлению через санаторно-курортные комплексы."
      />
      <HealthLink />
    </main>
  )
}
