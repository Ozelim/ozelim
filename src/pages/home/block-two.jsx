import { Carousel } from '@mantine/carousel'
import { Image } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'

import Autoplay from 'embla-carousel-autoplay'

import doc1 from 'shared/assets/images/home/home1.jpg'
import doc12 from 'shared/assets/images/home/home12.jpg'

import doc2 from 'shared/assets/images/home/home2.jpg'
import doc22 from 'shared/assets/images/home/home22.jpg'

import doc3 from 'shared/assets/images/home/home3.jpg'
import doc32 from 'shared/assets/images/home/home32.jpg'

import doc4 from 'shared/assets/images/home/home4.jpg'
import doc42 from 'shared/assets/images/home/home42.jpg'

import doc5 from 'shared/assets/images/home/home5.jpg'
import doc52 from 'shared/assets/images/home/home52.jpg'
import doc53 from 'shared/assets/images/home/home53.jpg'
import doc54 from 'shared/assets/images/home/home54.jpg'
import doc55 from 'shared/assets/images/home/home55.jpg'
import doc56 from 'shared/assets/images/home/home56.jpg'
import { SiSitepoint } from 'react-icons/si'

const credentials = [doc1, doc12, doc2, doc22]
const mem = [doc3, doc32, doc4, doc42, doc5, doc52, doc53, doc54, doc55, doc56]

const partners = [
  'Юридическая компания ТОО «GRT COMPANY»',
  'ТОО "Центр сертификации специалистов "САПА"',
  'Web-студия ИП «TAS Prog',
  'ТОО "PROFIL-KZ"',
  'Миграционно-визовый консалтинг ИП Мукатаева А.К.',
  'АО "Страховая компания "НОМАД Иншуранс"',
  `Объединение индивидуальных предпринимателей и юридических лиц "Ассоциация туристов Казахстана "ОzElim"`,
  `Акционерное общество «Дочерняя компания Народного Банка Казахстана по страхованию жизни «Халык-Life»`,
  `Некоммерческая организация «Endowment fund of the Association of Tourists of Kazakhstan» - Эндаумент фонд «OzElim» на базе МФЦА`,
  `Отдел туризма при ГУ «Управление физической культуры и спорта Павлодарской области`,
  `Совет Деловых Женщин Павлодарской области`,
  `ТОО «Y. Taxi Qazaqstan»`,
  `ИП «TURAN TOUR»`,
  `ТОО «PALMA TUR»`,
  `ТОО «Нуртау»`,
  `ИП «МЕЙРБАЕВ М.Ж.»`,
  `ТОО «Айдабол Курылыс»`,
  `ИП Нуржумбаева`,
  `ТОО «Компания «Пять звезд»`,
  `ТОО «Международная ассоциация клубов», г. Алматы`,
]

export default function BlockTwo() {
  const autoplay = React.useRef(Autoplay({ delay: 2000 }))

  return (
    <>
      <div className="relative flex h-auto w-full flex-col group/design-root overflow-x-hidden pt-4 bg-zinc-100">
        <div className="container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center">
            <div className=" flex flex-col flex-1 pb-8">
              <main className="border rounded-lg overflow-hidden bg-white shadow-lg p-4 md:p-8">
                <div className="flex flex-wrap justify-between gap-3">
                  <div className="flex min-w-72 flex-col gap-4 mx-auto">
                    <h1 className="text-primary text-3xl md:text-4xl font-black leading-tight tracking-tighter">
                      Наши партнеры
                    </h1>
                  </div>
                </div>
                <div className="space-y-6 mt-4">
                  <div class="flex h-full grow flex-col items-center justify-center">
                    <main class="w-full rounded-xl bg-white shadow-sm">
                      <div>
                        <ul class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                          {partners.map((q, i) => {
                            return (
                              <li
                                key={i}
                                class="flex items-center gap-4 rounded-lg px-4 py-3 transition-colors"
                              >
                                <SiSitepoint
                                  size={20}
                                  color="#015057"
                                  className="flex-shrink-0 rounded-full"
                                />

                                <p class="flex-1 truncate text-base font-medium">{q}</p>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </main>
                  </div>

                  {/* <Carousel
                    slideSize="25%"
                    slideGap={16}
                    align="center"
                    loop
                    breakpoints={[
                      { maxWidth: 'md', slideSize: '50%' },
                      { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
                    ]}
                    className="max-w-xs sm:max-w-sm md:max-w-full mx-auto"
                    plugins={
                      [
                        // autoplay.current
                      ]
                    }
                  >
                    {partners.map((q, i) => {
                      return (
                        <Carousel.Slide key={i}>
                          <span className='text-xl font-bold'>{q}</span>
                        </Carousel.Slide>
                      )
                    })}
                  </Carousel> */}
                  {/* <p className="text-gray-800 text-base font-normal leading-loose pt-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nihil
                    veritatis nemo consectetur consequatur! Ducimus perferendis culpa sed, dolorum
                    impedit minima. Repellendus, vero perferendis quis autem perspiciatis fugit
                    pariatur optio vitae dignissimos odit! Quo beatae vel animi vitae. Nisi ut iste
                    ad explicabo voluptatibus quaerat eum. Deserunt quis praesentium totam excepturi
                    quas iste velit odio animi sunt accusantium distinctio molestiae ad esse nisi ab
                    hic inventore magni similique quo, eos quisquam porro voluptatum! Saepe unde hic
                    consectetur architecto tenetur suscipit blanditiis libero natus cum! Minus iure,
                    facilis tempora pariatur dolorem dolorum animi aliquid porro natus? Ducimus
                    eligendi eos officia suscipit.
                  </p>
                  <p className="text-gray-800 text-base font-normal leading-loose pt-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque eum nemo soluta
                    ipsum veritatis sint rerum quis vel earum molestias laudantium, reiciendis rem
                    tenetur enim ratione atque iure. Voluptas dicta dolores incidunt blanditiis
                    eveniet praesentium expedita ullam voluptatibus, labore ea maxime laborum odit
                    amet aut delectus aspernatur tenetur eum adipisci corrupti molestias inventore
                    repellendus. Maxime, excepturi. Atque explicabo totam perferendis doloribus
                    veritatis, tenetur, consectetur sunt possimus repellat quaerat labore
                    consequatur soluta! Unde nostrum ad iure minus officiis, amet odit. Numquam.
                  </p>
                  <p className="text-gray-800 text-base font-normal leading-loose pt-1">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, nostrum
                    molestias consectetur dignissimos soluta possimus odio. Non cum aliquam, ipsam
                    ratione neque laboriosam sint dolores ipsa! Non, nesciunt cum animi adipisci
                    explicabo, nostrum blanditiis ab, consequatur dolor error eius distinctio est
                    vel nemo sequi dignissimos repellendus accusamus unde similique. Eaque deleniti
                    nobis eius rerum necessitatibus facilis a, soluta atque quidem magnam tempore,
                    ad tenetur aliquid error aspernatur iste labore ea!
                  </p> */}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex h-auto w-full flex-col group/design-root overflow-x-hidden bg-zinc-100">
        <div className="container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center pb-8">
            <div className="flex flex-col flex-1">
              <main className="border shadow-lg rounded-lg overflow-hidden bg-white p-4 md:p-8">
                <div className="flex flex-wrap justify-between gap-3">
                  <div className="flex min-w-72 flex-col gap-4 mx-auto">
                    <h1 className="text-primary text-3xl md:text-4xl font-black leading-tight tracking-tighter">
                      Меморандумы
                    </h1>
                  </div>
                </div>
                <div className='mt-4'>
                  <Carousel
                    slideSize="25%"
                    slideGap={16}
                    align="start"
                    loop
                    breakpoints={[
                      { maxWidth: 'md', slideSize: '50%' },
                      { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
                    ]}
                    className="max-w-xs sm:max-w-sm md:max-w-full mx-auto"
                  >
                    {mem.map((q, i) => {
                      return (
                        <Carousel.Slide key={i}>
                          <div className="flex flex-col gap-4 rounded-xl bg-background-light shadow-sm overflow-hidden">
                            <a href={q} target="_blank" className="border shadow-lg rounded-xl">
                              <Image className="md:max-w-full aspect-auto" src={q} />
                            </a>
                            {/* <img
                          alt=""
                          data-alt="A breathtaking mountain landscape in Kazakhstan with a turquoise lake."
                        /> */}
                          </div>
                        </Carousel.Slide>
                      )
                    })}
                  </Carousel>
                </div>
                {/* <div className="space-y-6 mt-4">
                  <p className="text-gray-800 text-base font-normal leading-loose pb-3 pt-1 px-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nihil
                    veritatis nemo consectetur consequatur! Ducimus perferendis culpa sed, dolorum
                    impedit minima. Repellendus, vero perferendis quis autem perspiciatis fugit
                    pariatur optio vitae dignissimos odit! Quo beatae vel animi vitae. Nisi ut
                    iste ad explicabo voluptatibus quaerat eum. Deserunt quis praesentium totam
                    excepturi quas iste velit odio animi sunt accusantium distinctio molestiae ad
                    esse nisi ab hic inventore magni similique quo, eos quisquam porro voluptatum!
                    Saepe unde hic consectetur architecto tenetur suscipit blanditiis libero natus
                    cum! Minus iure, facilis tempora pariatur dolorem dolorum animi aliquid porro
                    natus? Ducimus eligendi eos officia suscipit.
                  </p>
                  <p className="text-gray-800 text-base font-normal leading-loose pb-3 pt-1 px-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque eum nemo
                    soluta ipsum veritatis sint rerum quis vel earum molestias laudantium,
                    reiciendis rem tenetur enim ratione atque iure. Voluptas dicta dolores
                    incidunt blanditiis eveniet praesentium expedita ullam voluptatibus, labore ea
                    maxime laborum odit amet aut delectus aspernatur tenetur eum adipisci corrupti
                    molestias inventore repellendus. Maxime, excepturi. Atque explicabo totam
                    perferendis doloribus veritatis, tenetur, consectetur sunt possimus repellat
                    quaerat labore consequatur soluta! Unde nostrum ad iure minus officiis, amet
                    odit. Numquam.
                  </p>
                  <p className="text-gray-800 text-base font-normal leading-loose pb-3 pt-1 px-4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, nostrum
                    molestias consectetur dignissimos soluta possimus odio. Non cum aliquam, ipsam
                    ratione neque laboriosam sint dolores ipsa! Non, nesciunt cum animi adipisci
                    explicabo, nostrum blanditiis ab, consequatur dolor error eius distinctio est
                    vel nemo sequi dignissimos repellendus accusamus unde similique. Eaque
                    deleniti nobis eius rerum necessitatibus facilis a, soluta atque quidem magnam
                    tempore, ad tenetur aliquid error aspernatur iste labore ea!
                  </p>
                </div> */}
              </main>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex h-auto w-full flex-col group/design-root overflow-x-hidden bg-zinc-100">
        <div className="container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center pb-8">
            <div className="flex flex-col flex-1">
              <main className="border shadow-lg rounded-lg overflow-hidden bg-white p-4 md:p-8">
                <div className="flex flex-wrap justify-between gap-3">
                  <div className="flex min-w-72 flex-col gap-4 mx-auto">
                    <h1 className="text-primary text-3xl md:text-4xl font-black leading-tight tracking-tighter">
                      Наши реквизиты
                    </h1>
                  </div>
                </div>
                <div className="space-y-6 mt-4">
                  <Carousel
                    slideSize="25%"
                    slideGap={16}
                    align="start"
                    loop
                    breakpoints={[
                      { maxWidth: 'md', slideSize: '50%' },
                      { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
                    ]}
                    className="max-w-xs sm:max-w-sm md:max-w-full mx-auto"
                  >
                    {credentials.map((q, i) => {
                      return (
                        <Carousel.Slide key={i}>
                          <div className="flex flex-col gap-4 rounded-xl bg-background-light shadow-sm overflow-hidden">
                            <a href={q} target="_blank" className="border shadow-lg rounded-xl">
                              <Image className="md:max-w-full aspect-auto" src={q} />
                            </a>
                            {/* <img
                          alt=""
                          data-alt="A breathtaking mountain landscape in Kazakhstan with a turquoise lake."
                        /> */}
                          </div>
                        </Carousel.Slide>
                      )
                    })}
                  </Carousel>
                </div>
                <div className='mt-4'>
                  <h3 className='mb-1 md:mb-2 text-xl md:text-3xl'>Реквизиты</h3>
                  <div className='flex flex-col'>
                    <div className='md:text-2xl font-bold'>ТОО "OZELIM"</div>
                    <div className='md:text-2xl'>Адрес: <span className='font-bold'>Павлодар</span></div>
                    <div className='md:text-2xl'>Бин: <span className="font-bold">221140000992</span></div>
                    <div className='md:text-2xl'>Банк: <span className="font-bold">АО "Kaspi Bank"</span></div>
                    <div className='md:text-2xl'>КБе: <span className="font-bold">17</span></div>
                    <div className='md:text-2xl'>БИК: <span className="font-bold">CASPKZKA</span></div>
                    <div className='md:text-2xl'>Номер счета: <span className="font-bold">KZ32722S000029456226</span></div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
