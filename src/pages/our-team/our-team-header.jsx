import React from 'react'
import { Image } from 'shared/ui'
import { useLangContext } from 'app/langContext'

import q from 'shared/assets/images/team/1.png'
import { SiSitepoint } from 'react-icons/si'

export const OurTeamHeader = ({ headings, text }) => {
  const { qq } = useLangContext()

  return (
    <section className="w-full">
      <div className="container">
        <div className="flex flex-col lg:flex-row mt-4 gap-8 shadow-lg overflow-hidden rounded-lg bg-white p-4">
          <div className="w-full">
            <h1 className="text-2xl font-black leading-tight tracking-tight text-primary md:text-2xl lg:text-3xl">
              {qq(headings?.main ?? '', headings?.main_kk ?? '')}
            </h1>
            <h3 className="text-lg md:text-xl mt-3">
              {qq(headings?.submain ?? '', headings?.submain_kk ?? '')}
            </h3>
            <img
              src={q}
              className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
            />
          </div>

          <div className="w-full lg:text-left text-center">
            <div className="flex flex-col gap-6">
              <div className="flex items-center md:items-start gap-4">
                <SiSitepoint
                  size={20}
                  color="text-bg"
                  className="mt-1.5 flex-shrink-0 rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-base text-[#4c669a]">
                    {qq(
                      text?.text1 ?? '',
                      text?.text1_kk ?? ''
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center md:items-start gap-4">
                <SiSitepoint
                  size={20}
                  color="text-bg"
                  className="mt-1.5 flex-shrink-0 rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-base text-[#4c669a]">
                    {qq(
                      text?.text2 ?? '',
                      text?.text2_kk ?? ''
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center md:items-start gap-4">
                <SiSitepoint
                  size={20}
                  color="text-bg"
                  className="mt-1.5 flex-shrink-0 rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-base text-[#4c669a]">
                    {qq(
                      "Дорогой друг! Если у тебя есть навыки, энергия и стремление развиваться — ты именно тот, кого мы ищем. Присоединяйся к нашей команде и реализуй свой потенциал в деле, которое вдохновляет. Зарабатывай, раскрывай себя и расти вместе с нами!",
                      "Құрметті дос! Егер сенде дағдылар, энергия және дамуға ұмтылыс болса — сен біз іздеген адамсың. Біздің командаға қосылып, шабыттандыратын істе өз әлеуетіңді жүзеге асыр. Табысты бол, өз мүмкіндігіңді аш және бізбен бірге өс!"
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center md:items-start gap-4">
                <SiSitepoint
                  size={20}
                  color="text-bg"
                  className="mt-1.5 flex-shrink-0 rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-base text-[#4c669a]">
                    {qq(
                      "Приглашаем к сотрудничеству курортные комплексы, санатории, дома отдыха и гидов-экскурсоводов! Давайте вместе развивать внутренний туризм и формировать образ Казахстана как страны, где можно не только вдохновиться природой, узнать культуру, но и получить качественный отдых и оздоровление. Объединяя усилия — мы создаём ценность для гостей и усиливаем интерес к регионам нашей страны!",
                      "Ынтымақтастыққа курорттық кешендерді, санаторийлерді, демалыс үйлерін және гид-экскурсоводтарды шақырамыз! Ішкі туризмді бірге дамытып, Қазақстанды тек табиғатымен тәнті болып, мәдениетін танып қана қоймай, сапалы демалыс және сауықтыру алуға болатын ел ретінде бірге қалыптастырайық. Күш біріктіріп — қонақтар үшін құндылық жасаймыз, еліміздің өңірлеріне қызығушылықты арттырамыз!"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function OurTeamHeader2({ headings, text }) {
  return (
    <div className="relative flex w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex flex-1 justify-center px-4 py-8 sm:px-6 md:px-8 lg:py-16">
          <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1">
            <div className="@container">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                <div className="flex items-center justify-center">
                  <img
                    className="w-full rounded-xl bg-cover bg-center bg-no-repeat lg:max-w-none"
                    data-alt="Abstract colorful geometric shapes on a light background, conveying creativity and innovation."
                    src={q}
                  />
                </div>
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-black leading-tight tracking-tight text-[#0d121b] md:text-3xl lg:text-4xl">
                      {headings?.main}
                    </h1>
                    <h3 className="text-lg text-[#4c669a] md:text-xl">{headings?.submain}</h3>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-primary" />
                      <div className="flex flex-col gap-1">
                        <p className="text-base text-[#4c669a]">{text?.text1}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-primary" />
                      <div className="flex flex-col gap-1">
                        <p className="text-base text-[#4c669a]">{text?.text2}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-primary" />
                      <div className="flex flex-col gap-1">
                        <p className="text-base text-[#4c669a]">{text?.text3}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-primary" />
                      <div className="flex flex-col gap-1">
                        <p className="text-base text-[#4c669a]">{text?.text4}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
