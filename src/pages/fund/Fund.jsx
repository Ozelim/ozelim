import React from 'react'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { useLangContext } from 'app/langContext'
import { usePageData } from 'shared/hooks'
import fund1 from 'shared/assets/images/fund-01.png'
import fund2 from 'shared/assets/images/fund-37.png'
import { Button, Modal, Select, TextInput, Image } from '@mantine/core'
import { pb } from 'shared/api'
import { showNotification } from '@mantine/notifications'
import { SiSitepoint } from 'react-icons/si'
import {
  MdFlag,
  MdFlagCircle,
  MdLightbulb,
  MdLightbulbOutline,
  MdOutlineFlag,
} from 'react-icons/md'
import { FiPhone } from 'react-icons/fi'
import { Carousel } from '@mantine/carousel'

import hero from 'shared/assets/images/fund/hero.jpg'
import gos1 from 'shared/assets/images/fund/fund1.jpg'
import gos2 from 'shared/assets/images/fund/fund12.jpg'

import human from 'shared/assets/images/fund/rights.jpg'

import right1 from 'shared/assets/images/fund/fund-3-37_page-0001.jpg'
import right2 from 'shared/assets/images/fund/fund-3-37_page-0002.jpg'
import right3 from 'shared/assets/images/fund/fund-3-37_page-0003.jpg'
import right4 from 'shared/assets/images/fund/fund-3-37_page-0004.jpg'
import right5 from 'shared/assets/images/fund/fund-3-37_page-0005.jpg'
import right6 from 'shared/assets/images/fund/fund-3-37_page-0006.jpg'
import right7 from 'shared/assets/images/fund/fund-3-37_page-0007.jpg'
import right8 from 'shared/assets/images/fund/fund-3-37_page-0008.jpg'
import right9 from 'shared/assets/images/fund/fund-3-37_page-0009.jpg'
import right10 from 'shared/assets/images/fund/fund-3-37_page-0010.jpg'
import right11 from 'shared/assets/images/fund/fund-3-37_page-0011.jpg'
import right12 from 'shared/assets/images/fund/fund-3-37_page-0012.jpg'
import right13 from 'shared/assets/images/fund/fund-3-37_page-0013.jpg'
import right14 from 'shared/assets/images/fund/fund-3-37_page-0014.jpg'
import right15 from 'shared/assets/images/fund/fund-3-37_page-0015.jpg'
import right16 from 'shared/assets/images/fund/fund-3-37_page-0016.jpg'
import right17 from 'shared/assets/images/fund/fund-3-37_page-0017.jpg'
import right18 from 'shared/assets/images/fund/fund-3-37_page-0018.jpg'
import right19 from 'shared/assets/images/fund/fund-3-37_page-0019.jpg'
import right20 from 'shared/assets/images/fund/fund-3-37_page-0020.jpg'
import right21 from 'shared/assets/images/fund/fund-3-37_page-0021.jpg'
import right22 from 'shared/assets/images/fund/fund-3-37_page-0022.jpg'
import right23 from 'shared/assets/images/fund/fund-3-37_page-0023.jpg'
import right24 from 'shared/assets/images/fund/fund-3-37_page-0024.jpg'
import right25 from 'shared/assets/images/fund/fund-3-37_page-0025.jpg'
import right26 from 'shared/assets/images/fund/fund-3-37_page-0026.jpg'
import right27 from 'shared/assets/images/fund/fund-3-37_page-0027.jpg'
import right28 from 'shared/assets/images/fund/fund-3-37_page-0028.jpg'
import right29 from 'shared/assets/images/fund/fund-3-37_page-0029.jpg'
import right30 from 'shared/assets/images/fund/fund-3-37_page-0030.jpg'
import right31 from 'shared/assets/images/fund/fund-3-37_page-0031.jpg'
import right32 from 'shared/assets/images/fund/fund-3-37_page-0032.jpg'
import right33 from 'shared/assets/images/fund/fund-3-37_page-0033.jpg'
import right34 from 'shared/assets/images/fund/fund-3-37_page-0034.jpg'
import right35 from 'shared/assets/images/fund/fund-3-37_page-0035.jpg'

const gos = [gos1, gos2]

const rights = [
  right1,
  right2,
  right3,
  right4,
  right5,
  right6,
  right7,
  right8,
  right9,
  right10,
  right11,
  right12,
  right13,
  right14,
  right15,
  right16,
  right17,
  right18,
  right19,
  right20,
  right21,
  right22,
  right23,
  right24,
  right25,
  right26,
  right27,
  right28,
  right29,
  right30,
  right31,
  right32,
  right33,
  right34,
  right35,
]

async function getFundData() {
  return await pb.collection('fund_data').getFullList()
}

export const Fund = () => {
  const { headings, images, text } = usePageData('fund')

  const [r, setR] = React.useState({})

  React.useEffect(() => {
    getFundData().then((res) => {
      setR(res?.[0])
    })
  }, [])

  const matches = useMediaQuery(`(min-width: 767px)`)

  const { qq, kz } = useLangContext()

  const [opened1, handlers1] = useDisclosure()

  const [d, setD] = React.useState({
    name: '',
    phone: '',
    service: '',
  })

  return (
    <>
      <div class="container relative flex w-full flex-col">
        <div class="flex flex-col-reverse items-start gap-4 md:gap-8 lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 clean-block">
          <div class="flex flex-col gap-6 text-left lg:col-span-7 lg:gap-8">
            <div class="flex flex-col gap-3">
              <h1 class="text-primary text-3xl font-black leading-tight tracking-[-0.03em] md:text-4xl">
                Эндаумент фонд
              </h1>
              <h1 class="text-3xl font-medium leading-tight tracking-[-0.03em] md:text-2xl">
                Эндаумент фонд при Ассоциации туристов Казахстана «OzElim» - финансовая опора и
                долгосрочная инвестиция в развитие туризма!
              </h1>
              <p class="text-[#1A202C]/80 text-base font-normal leading-relaxed md:text-lg">
                Эндаумент фонд Ассоциации туристов Казахстана "OzElim" — это целевой фонд, созданный
                для долгосрочного финансирования туристических программ. Основным ом Фонда является
                то, что его капитал не расходуется, а инвестируется. Доходы от этих инвестиций
                направляются на поддержку деятельности Ассоциации и конкретным программам. Фонд
                позволит Ассоциации планировать своё будущее, минимизировать финансовые риски и
                обеспечить стабильное развитие независимо от текущих экономических условий.
              </p>
            </div>
          </div>
          <div class="w-full lg:col-span-5">
            <div
              class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
              data-alt="Vibrant abstract gradient with blue and purple tones"
              style={{
                backgroundImage: `url(${hero})`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="relative container flex w-full flex-col items-center justify-center bg-background-light mt-6">
        <div className="w-full rounded-xl border border-gray-200/80 bg-white shadow-lg">
          <div className="flex flex-col p-4 md:p-8">
            <div className="grid md:grid-cols-2 gap-y-4 ">
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-gray-800 mb-0">Форма:</h2>
                </div>
                <p className="text-sm leading-6 text-gray-700">Некоммерческая организация</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-gray-800 mb-0">Юрисдикция:</h2>
                </div>
                <p className="text-sm leading-6 text-gray-700">
                  Официальный фонд, зарегистрированный на платформе МФЦА (Международный финансовый
                  центр «Астана»).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex h-auto w-full flex-col overflow-x-hidden mt-8">
        <div className="container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center pb-8">
            <div className="flex flex-col flex-1">
              <main className="border shadow-lg rounded-lg overflow-hidden bg-white p-4 md:p-8">
                <Carousel
                  slideSize="50%"
                  slideGap={16}
                  align="start"
                  loop
                  breakpoints={[
                    { maxWidth: 'md', slideSize: '50%' },
                    { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
                  ]}
                  className="max-w-xs sm:max-w-sm md:max-w-full mx-auto"
                >
                  {gos.map((q, i) => {
                    return (
                      <Carousel.Slide key={i}>
                        <div className="flex flex-col gap-4 rounded-xl bg-background-light shadow-sm overflow-hidden">
                          <a href={q} target="_blank" className="border shadow-lg rounded-xl">
                            <Image className="md:max-w-full aspect-auto" src={q} />
                          </a>
                        </div>
                      </Carousel.Slide>
                    )
                  })}
                </Carousel>
              </main>
            </div>
          </div>
        </div>
      </div>

      {/* <div class="relative flex h-auto w-full flex-col mt-8 container">
        <main className="clean-block">
          <div class="flex flex-wrap justify-between gap-3 p-4">
            <div class="flex min-w-72 flex-col gap-4 mx-auto">
              <h1 class="text-primary text-3xl md:text-4xl font-black leading-tight tracking-tighter">
                Lorem ipsum dolor sit.
              </h1>
            </div>
          </div>
          <div class="space-y-6">
            <p class="text-gray-800 text-base font-normal leading-loose">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi pariatur
              repellendus animi ratione quidem eos, nobis alias, laborum omnis commodi sed vero
              voluptatum molestiae eaque aliquam! Quo, obcaecati voluptates. Perspiciatis iste
              itaque quod pariatur assumenda recusandae ad repellendus corrupti voluptate fugiat ut,
              a error fuga laudantium quisquam! Consequuntur eum consectetur amet harum, incidunt
              ipsam quisquam beatae quo, corporis doloribus ad dolorum tempore dolores autem eius
              debitis error illum? Culpa itaque ab recusandae eius ea, suscipit hic. Velit possimus
              suscipit error? Rem voluptatibus saepe error ipsum repellendus repellat quod,
              explicabo exercitationem est porro cumque aliquid commodi necessitatibus asperiores
              quisquam eum in.
            </p>
          </div>
        </main>
      </div>

      <div class="container relative flex h-auto w-full flex-col mt-4 md:mt-8">
        <main className="clean-block">
          <div class="flex flex-wrap justify-between gap-3 p-4">
            <div class="flex min-w-72 flex-col gap-4 mx-auto">
              <h1 class="text-primary text-3xl md:text-4xl font-black leading-tight tracking-tighter">
                Lorem ipsum dolor sit.
              </h1>
            </div>
          </div>
          <div class="space-y-6">
            <p class="text-gray-800 text-base font-normal leading-loose pt-1">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate iste corrupti
              debitis sunt voluptas perspiciatis qui, maiores iure rem adipisci assumenda rerum ad
              similique, libero doloribus dolorem sit necessitatibus cupiditate cum in nemo sequi
              cumque vitae reiciendis. Atque, temporibus facilis mollitia, praesentium nisi modi,
              pariatur ex at eveniet iure earum eos ipsum repudiandae quae explicabo labore vero
              minima quam assumenda culpa optio soluta? Atque accusamus maiores, sint ea, nulla
              commodi fugit sequi soluta at cum amet fuga laudantium ab voluptatum perferendis sit
              repellendus? Possimus ipsam labore, distinctio nesciunt voluptate consequuntur ea sed
              voluptatem necessitatibus eaque facere rem cumque, incidunt nihil?
            </p>
          </div>
        </main>
      </div> */}

      <div className="relative grid md:grid-cols-2 w-full items-center justify-center gap-6 container">
        <div className="flex flex-col w-full max-w-2xl overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl">
          <div className="flex flex-col gap-6 p-4 md:p-8">
            <h2 className="text-3xl font-bold text-primary mb-0 mx-auto">Миссия фонда</h2>
            <p className="text-slate-500">
              Обеспечение устойчивых источников финансирования для поддержки
            </p>
            <div className="content-area">
              <ul className="flex flex-col gap-4 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className=" text-primary text-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.0006 16.2L4.8006 12l-1.4 1.4 5.6 5.6 12-12-1.4-1.4z" />
                    </svg>
                  </span>
                  <p>Работы Ассоциации туристов Казахстана</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className=" text-primary text-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.0006 16.2L4.8006 12l-1.4 1.4 5.6 5.6 12-12-1.4-1.4z" />
                    </svg>
                  </span>
                  <p>Внутренних туристических инициатив</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className=" text-primary text-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.0006 16.2L4.8006 12l-1.4 1.4 5.6 5.6 12-12-1.4-1.4z" />
                    </svg>
                  </span>
                  <p>Цифровых и социальных проектов</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className=" text-primary text-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.0006 16.2L4.8006 12l-1.4 1.4 5.6 5.6 12-12-1.4-1.4z" />
                    </svg>
                  </span>
                  <p>Образовательных программ и инфотуров</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className=" text-primary text-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.0006 16.2L4.8006 12l-1.4 1.4 5.6 5.6 12-12-1.4-1.4z" />
                    </svg>
                  </span>
                  <p>Социальных туров для детей и пенсионеров.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full max-w-2xl h-full overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl">
          <div className="flex flex-col gap-6 p-4 md:p-8">
            <h2 className="text-3xl font-bold text-primary mb-0 text-center">
              Преимущества и прозрачность
            </h2>
            <p className="text-slate-500">
              Эндаумент фонд — это финансовый фундамент устойчивого развития проекта, который
              обеспечивает долгосрочную стабильность без риска и прямых финансовых потерь.
            </p>
            <div className="content-area">
              <ul className="flex flex-col gap-4 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className=" text-primary text-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.0006 16.2L4.8006 12l-1.4 1.4 5.6 5.6 12-12-1.4-1.4z" />
                    </svg>
                  </span>
                  <p>Средства сохраняются и приумножаются</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className=" text-primary text-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.0006 16.2L4.8006 12l-1.4 1.4 5.6 5.6 12-12-1.4-1.4z" />
                    </svg>
                  </span>
                  <p>Пожертвования не расходуются — работает только доход от них</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className=" text-primary text-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.0006 16.2L4.8006 12l-1.4 1.4 5.6 5.6 12-12-1.4-1.4z" />
                    </svg>
                  </span>
                  <p>Поддержка только одобренных проектов с социальным эффектом</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className=" text-primary text-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.0006 16.2L4.8006 12l-1.4 1.4 5.6 5.6 12-12-1.4-1.4z" />
                    </svg>
                  </span>
                  <p>Открытая ежегодная финансовая отчетность</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* new */}
      <div className="relative container flex w-full flex-col items-center justify-center bg-background-light mt-6">
        <div className="w-full rounded-xl border border-gray-200/80 bg-white shadow-lg">
          <div className="flex flex-col p-4 md:p-8">
            <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl text-center">
              Принцип работы
            </h1>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              Средства фонда формируются за счет пожертвований и инвестируются. Доход от этих
              инвестиций используется исключительно на уставные цели.
            </p>
            <div className="my-8 h-px w-full bg-gray-200" />
            <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-12">
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MdLightbulbOutline size={24} className="text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-0">Проект:</h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-700">
                  Единый реестр санаториев Казахстана и цифровой ассистент по подбору санаториев по
                  заболеваниям и патологиям
                </p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MdOutlineFlag size={24} className="text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-0">Цель:</h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-700">
                  Решение проблемы Государственного масштаба, напрямую влияющая на качество жизни
                  населения, экономику и развитие внутреннего туризма.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
 
      {/* new2 */}

      {/* <div className="relative flex container w-full flex-col items-center justify-center mt-6">
        <div className="w-full rounded-xl bg-white shadow-lg">
          <div className="flex flex-col p-4 gap-6 md:p-8">
            <div className="text-center">
              <h1 className="text-primary tracking-tight text-2xl sm:text-3xl font-bold leading-tight">
                Приглашаем поддержать целевой сбор на Проекты
              </h1>
            </div>
            <div className="text-center">
              <p className="text-[#4c669a] text-base font-normal leading-relaxed">
                Мы объединяем людей, идеи и ресурсы — чтобы путешествия по Казахстану стали
                доступнее, глубже и полезнее.
              </p>
            </div>

            <Carousel
              slideSize="25%"
              withControls={false}
              slideGap={16}
              align="start"
              loop
              breakpoints={[
                { maxWidth: 'md', slideSize: '50%' },
                { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
              ]}
              className="max-w-xs sm:max-w-sm md:max-w-full mx-auto"
            >
              {Array(8)
                .fill(1)
                .map((_, i) => {
                  return (
                    <Carousel.Slide key={i}>
                      <div className="flex flex-col gap-4 rounded-xl bg-background-light shadow-sm overflow-hidden">
                        <Image
                          className="md:max-w-full aspect-video "
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhHh74y3ctjWhwTCJNgxbgkXEaWu-fl6Ix4cPo-zrzDG8x6RbtuAW6tldAYzkjt64G9zsRudrKLQx_rusd8VHspRgOjGRMghcVqY7R-Lok0uoCzwXA4xYkuwMMgjmd0o9uIauVhrff8tIot8xZNkB6YLJjQKzA8QEkMBvkOloPd8rP84J1pUK4w2ecJj08ttsdaGGo7ozaTc5UDmheMxlLHOoQ9Mkxx-TaH58t7ibVd1ksY0M_q4EoKwlOH4CYfpLh9BFIanyIeu3s"
                        />

                        <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                          <div>
                            <p className="text-primary text-base font-medium leading-normal">
                              Исследуйте Пейзажи
                            </p>
                            <p className="text-[#4c669a] text-sm font-normal leading-normal">
                              Поддержите сохранение природных чудес.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Carousel.Slide>
                  )
                })}
            </Carousel>
          </div>
        </div>
      </div> */}

      {/* new3 */}

      <div className="relative flex container w-full flex-col items-center justify-center overflow-x-hidden mt-12">
        <div className="w-full">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl md:text-4xl">
              Ключевые проблемы санаторно-курортной отрасли Казахстана
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-primary p-4 md:p-8 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {/* Database icon */}
                <span className="text-2xl">
                  <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                    <path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c5.06 0 8 .98 8 2s-2.94 2-8 2-8-.98-8-2 2.94-2 8-2zm8 14c0 1.03-3.38 3-8 3s-8-1.97-8-3v-2.06c1.92 1.09 5.22 1.56 8 1.56s6.08-.47 8-1.56V18zm0-4c0 1.03-3.38 3-8 3s-8-1.97-8-3v-2.06c1.92 1.09 5.22 1.56 8 1.56s6.08-.47 8-1.56V14zm0-4c0 1.03-3.38 3-8 3s-8-1.97-8-3V7.94c1.92 1.09 5.22 1.56 8 1.56s6.08-.47 8-1.56V10z" />
                  </svg>
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-secondary">Отсутствие единой базы данных</h2>
                <p className="text-sm leading-relaxed text-white">
                  Отсутствие единой базы данных санаториев Казахстана.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-primary p-4 md:p-8 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {/* Psychology icon */}
                <span className="text-2xl">
                  <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                    <path d="M13 11h2c.55 0 1-.45 1-1V7.83A3 3 0 0020 11v5a3 3 0 01-3 3h-3v2a1 1 0 01-2 0v-2H6a3 3 0 01-3-3v-5a3 3 0 012.97-3V10c0 .55.45 1 1 1h2v2h2v-2zm-2 0V6c0-.55.45-1 1-1s1 .45 1 1v5h-2z" />
                  </svg>
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-secondary">
                  Нет автоматизированного подбора
                </h2>
                <p className="text-sm leading-relaxed text-white">
                  Отсутствие централизованной автоматизированной системы подбора санаториев по
                  медицинским показаниям.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-primary p-4 md:p-8 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {/* FlightTakeoff/Flying icon */}
                <span className="text-2xl">
                  <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                    <path d="M2.5 19.59l19.19-7.19a1.003 1.003 0 00-.72-1.88l-5.3 1.99-7.23-7.23A1.003 1.003 0 007.1 4.98l5.69 5.69-2.07.78L4.34 6.4a1.003 1.003 0 00-1.42 1.42l7.46 4.38-2.07.78-5.73-2.15A1.003 1.003 0 002.5 19.59zm18.29 1.68c.44 0 .8-.36.8-.8s-.36-.8-.8-.8-.8.35-.8.8.36.8.8.8z" />
                  </svg>
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-secondary">Утечка клиентов за рубеж</h2>
                <p className="text-sm leading-relaxed text-gray-200">
                  До <span className="font-bold">40%</span> пациентов выбирают санатории России,
                  Узбекистана, Турции и других стран.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-primary p-4 md:p-8 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {/* Trending Down icon */}
                <span className="text-2xl">
                  <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                    <path d="M16.53 11.06a.75.75 0 00-1.06 0l-3.04 3.04-4.24-4.24a.75.75 0 00-1.06 1.06l4.77 4.77a.75.75 0 001.06 0l3.57-3.58a.75.75 0 000-1.06zM5.28 19.72a.75.75 0 01-.53-1.28l13-13a.75.75 0 111.06 1.06l-13 13a.75.75 0 01-.53.22zm13.44 0a.75.75 0 01-.53-.22l-3.22-3.22a.75.75 0 111.06-1.06l3.22 3.22a.75.75 0 01-.53 1.28z" />
                  </svg>
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-secondary">Нераскрытый потенциал</h2>
                <p className="text-sm leading-relaxed text-gray-200">
                  Более <span className="font-bold">60%</span> ресурсов отечественных санаториев
                  недозагружены.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-primary p-4 md:p-8 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {/* Help Center icon */}
                <span className="text-2xl">
                  <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 18h-2v-2h2v2zm2.07-7.75c-.9.92-1.07 1.24-1.07 2.25h-2v-.5c0-1.1.45-1.99 1.36-2.91.78-.78 1.16-1.53 1.16-2.34 0-1.23-1.01-2.25-2.25-2.25S9 8.77 9 10H7c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.19-.64 2.03-1.93 3.25z" />
                  </svg>
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-secondary">Сложность выбора</h2>
                <p className="text-sm leading-relaxed text-gray-200">
                  <span className="font-bold">70%</span> населения не знают, какой санаторий
                  подходит под их диагноз.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-primary p-4 md:p-8 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {/* Sick icon */}
                <span className="text-2xl">
                  <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                    <path d="M18 14c-1.1 0-2 .9-2 2h-2.58c-.22-1.16-.94-2.19-1.9-2.89.7-.51 1.51-.82 2.48-.99.24-.04.41-.28.37-.52-.05-.24-.24-.4-.49-.36-1.38.25-2.3.67-2.78 1.21-.18.19-.22.46-.11.69.11.23.37.32.6.21.3-.16.77-.34 1.49-.52.43-.11.77.22.53.64C10.1 15.18 9 16.02 9 17h6c0-1.1-.9-2-2-2zM12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8z" />
                  </svg>
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-secondary">Рост спроса и неэффективность</h2>
                <p className="text-sm leading-relaxed text-gray-200">
                  Всё больше людей нуждаются в восстановлении, но не знают, куда обращаться.
                </p>
              </div>
            </div>
          </div>
          {/* <div className="mt-8 flex justify-center md:mt-12">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-8 bg-primary text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-primary/30 transition-transform duration-200 hover:scale-105">
              <span className="truncate">Узнать о решении</span>
            </button>
          </div> */}
        </div>
      </div>

      {/* new4 */}

      <div className="relative flex w-full flex-col items-center justify-center bg-background-light group/design-root overflow-x-hidden pb-4">
        <div className="container flex h-full grow flex-col items-center justify-center">
          <div className="shadow-lg relative w-full max-w-2xl overflow-hidden rounded-xl border border-slate-200/50 bg-white p-4 md:p-8">
            <div
              className="absolute -top-1/4 -left-1/4 h-1/2 w-1/2 rounded-full bg-primary/10 blur-3xl"
              data-alt="Faint blue gradient blob for decoration"
            />
            <div
              className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-primary/10 blur-3xl"
              data-alt="Faint blue gradient blob for decoration"
            />
            <div className="relative z-10 flex flex-col items-center text-center">
              <p className="font-normal leading-normal text-slate-500">
                Стоимость Проекта: 14 200 000 тг.
              </p>
              <div className="my-4 h-px w-16 bg-slate-200" />
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900">
                ХОТИТЕ ПОДДЕРЖАТЬ ФОНД И ПРИНЯТЬ УЧАСТИЕ В РЕАЛИЗАЦИИ СОЦИАЛЬНЫХ ИНИЦИАТИВ В
                ТУРИЗМЕ?
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative flex w-full flex-col items-center justify-center bg-background-light p-4 group/design-root"
        style={{
          '--select-button-svg':
            "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(76,102,154)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e');",
        }}
      >
        <div className="w-full max-w-2xl shadow-lg">
          <div className="flex flex-col gap-8 rounded-xl bg-white shadow-lg p-4 sm:p-8">
            <div className="flex flex-col gap-2 text-center">
              <p className="font-normal leading-normal">
                Оставьте заявку на участие, и наша команда свяжется с вами
              </p>
            </div>
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <p className="text-base font-medium leading-normal text-[#0d121b]">ФИО</p>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#cfd7e7] bg-background-light text-[#0d121b] h-12 placeholder:text-[#4c669a] px-4 py-2 text-base font-normal leading-normal"
                    placeholder="Ваше имя и фамилия"
                    type="text"
                    value=""
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <p className="text-base font-medium leading-normal text-[#0d121b]">
                    Телефон / WhatsApp
                  </p>
                  <div className="flex w-full flex-1 items-stretch">
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg border border-r-0 border-[#cfd7e7] bg-background-light text-[#0d121b] h-12 placeholder:text-[#4c669a] px-4 py-2 pr-2 text-base font-normal leading-normal"
                      placeholder="+7 (777) 123-4567"
                      type="tel"
                      value=""
                    />
                    <div className="flex items-center justify-center rounded-r-lg border border-l-0 border-[#cfd7e7] bg-background-light px-3 text-[#4c669a]">
                      <span className="text-xl">
                        <i>
                          {/** Replace with react-icons phone icon */}
                          <FiPhone />
                        </i>
                      </span>
                    </div>
                  </div>
                </label>
              </div>
              <label className="flex flex-col gap-2">
                <p className="text-base font-medium leading-normal text-[#0d121b]">
                  Тип инвестирования
                </p>
                <select
                  placeholder="Выберите тип инвестирования"
                  className="form-input flex w-full min-w-0 flex-1 resize-none appearance-none overflow-hidden rounded-lg border border-[#cfd7e7] bg-background-light text-[#0d121b] h-12 bg-[image:--select-button-svg] bg-right-4 bg-no-repeat placeholder:text-[#4c669a] px-4 py-2 text-base font-normal leading-normal"
                >
                  <option value="">Выберите тип инвестирования</option>
                  <option value="1">Единовременное пожертвование</option>
                  <option value="2">Регулярное пожертвование</option>
                  <option value="3">Корпоративное участие</option>
                  <option value="4">Целевой вклад</option>
                  <option value="5">Спонсорская поддержка</option>
                  <option value="6">Другое…</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-base font-medium leading-normal text-[#0d121b]">
                  Ваш комментарий или предложение
                </p>
                <textarea
                  className="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg border border-[#cfd7e7] bg-background-light text-[#0d121b] min-h-32 placeholder:text-[#4c669a] p-4 text-base font-normal leading-normal"
                  placeholder="Расскажите нам больше о ваших целях инвестирования..."
                ></textarea>
              </label>
              <Button color="emerald">Отправить заявку</Button>
            </form>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex min-w-72 flex-col gap-4 mx-auto">
            <h1 className="text-gray-900 text-4xl font-black leading-tight tracking-tighter">
              {headings?.heading99}
            </h1>
          </div>
        </div>
        <ul className="space-y-4 mt-5">
          <li className="flex gap-4">
            <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
            <p className="text">{text?.text991}</p>
          </li>
          <li className="flex gap-4">
            <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
            <p className="text">{text?.text992}</p>
          </li>
          <li className="flex gap-4">
            <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
            <p className="text">{text?.text993}</p>
          </li>
          <li className="flex gap-4">
            <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
            <p className="text">{text?.text994}</p>
          </li>
          <li className="flex gap-4">
            <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
            <p className="text">{text?.text995}</p>
          </li>
          <li className="flex gap-4">
            <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
            <p className="text">{text?.text996}</p>
          </li>
          <li className="flex gap-4">
            <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
            <p className="text">{text?.text997}</p>
          </li>
          <li className="flex gap-4">
            <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
            <p className="text">{text?.text998}</p>
          </li>
        </ul>
      </div>

      <section className="mt-8 container">
        <h1 className="text-4xlfont-bold text-center">{headings?.heading10}</h1>
        <div className="flex flex-col md:flex-row gap-8 mt-6">
          <Image
            className="max-w-2xl w-full rounded-primary max-h-80 object-cover"
            record={images}
            index={6}
          />
          <div>
            <h2 className="font-semibold text-[20px]">{headings?.heading11}</h2>
            <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">{text?.text12}</ul>
            <div className="flex mt-4">
              <Button onClick={() => handlers1.open()}>
                {kz ? 'Өтініш қалдыру' : `Получить консультацию`}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div class="container relative flex w-full flex-col mt-8">
        <div class="flex flex-col-reverse items-start gap-4 md:gap-8 lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 clean-block">
          <div class="flex flex-col gap-6 text-left lg:col-span-7 lg:gap-8">
            <div class="flex flex-col gap-3">
              <h1 class="text-primary text-3xl font-black leading-tight tracking-[-0.03em] md:text-4xl">
                Авторское право
              </h1>
              <p class="text-[#1A202C]/80 text-base font-normal leading-relaxed md:text-lg">
                Султанов Искандер Серикович - директор юридической компании “GRT COMPANY”, автор
                эксклюзивной системы создания и управления Эндаумент фондами в Казахстане, автор
                инновационной методики управления человеческими ресурсами. Международный "complaints
                officer", юрист Ассоциации туристов Казахстана "OzElim".
              </p>
            </div>
          </div>
          <div class="w-full lg:col-span-5">
            <div
              class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl max-h-96"
              data-alt="Vibrant abstract gradient with blue and purple tones"
              style={{
                backgroundImage: `url(${human})`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="relative flex h-auto w-full flex-col overflow-x-hidden mt-8">
        <div className="container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center pb-4">
            <div className="flex flex-col flex-1">
              <main className="border shadow-lg rounded-lg overflow-hidden bg-white p-4 md:p-8">
                <div className="flex min-w-72 flex-col gap-4 mx-auto">
                  <h1 className="text-primary text-3xl md:text-4xl font-black leading-tight tracking-tighter text-center">
                    Свидетельство о гос. регистрации авторского права
                  </h1>
                </div>
                <Carousel
                  slideSize="25%"
                  slideGap={16}
                  align="start"
                  loop
                  breakpoints={[
                    { maxWidth: 'md', slideSize: '50%' },
                    { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
                  ]}
                  className="max-w-xs sm:max-w-sm md:max-w-full mx-auto mt-4"
                >
                  {rights.map((q, i) => {
                    return (
                      <Carousel.Slide key={i}>
                        <div className="flex flex-col gap-4 rounded-xl bg-background-light shadow-sm overflow-hidden">
                          <a href={q} target="_blank" className="border shadow-lg rounded-xl">
                            <Image className="md:max-w-full aspect-auto" src={q} />
                          </a>
                        </div>
                      </Carousel.Slide>
                    )
                  })}
                </Carousel>
              </main>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full">
        <div className="container">
          <div className="w-full">
            <section className="w-full mt-4">
              <h1 className="text-4xl text-primary-500 font-bold">
                {qq('Эндаумент фонд', 'Эндаумент қоры')}
              </h1>
              <div className="flex flex-col md:flex-row gap-8 mt-6">
                <Image
                  className="max-w-2xl w-full rounded-primary max-h-80 object-cover"
                  record={images}
                  index={1}
                />
                <div>
                  <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">
                    {text?.text1}
                  </ul>
                  <a href={'/fund-ustav.pdf'} target="_blank">
                    <Button className="mt-4">{qq('Устав Фонда', 'Қордың Жарғысы')}</Button>
                  </a>
                </div>
              </div>
            </section>

            <section className="mt-10 lg:mt-16">
              <div className="text-center">
                <h1 className="text-4xl font-medium text-primary-500">{headings?.heading1}</h1>
                <div className="grid gap-8 mt-5 max-w-3xl mx-auto">
                  <p className="text text-left">{text?.text2}</p>
                </div>
              </div>
            </section>

            <section className="mt-10 lg:mt-16">
              <div className="text-center">
                <h1 className="text-4xl font-medium text-primary-500">{headings?.heading3}</h1>
                <div className="grid gap-8 mt-5 max-w-3xl mx-auto">
                  <p className="tracking-wider text-left underline text-primary-500 text-xl">
                    {text?.text3}
                  </p>
                </div>
              </div>
              <div className="grid lg:grid-cols-3 mt-4 gap-4">
                <Image
                  record={images}
                  index={2}
                  className="max-w-[350px] w-full m-auto h-full max-h-64 rounded-primary object-cover"
                />
                <Image
                  record={images}
                  index={3}
                  className="max-w-[350px] w-full m-auto h-full max-h-64 rounded-primary object-cover"
                />
                <Image
                  record={images}
                  index={4}
                  className="max-w-[350px] w-full m-auto h-full max-h-64 rounded-primary object-cover"
                />
              </div>
            </section>

            <section className="mt-8">
              <h1 className="text-4xl font-medium text-primary-500 my-4">{headings?.heading4}</h1>
              <ul className="space-y-4 px-4">
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text">{text?.text4}</p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text">{text?.text5}</p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text">{text?.text6}</p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text">{text?.text7}</p>
                </li>
              </ul>
            </section>

            <section className="w-full pt-10">
              <h1 className="heading text-primary-500 ">{headings?.heading5}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div>
                  <h2 className="md:text-2xl lg:text-4xl text-primary-500 border-b-4 border-black pb-2 md:pb-4 font-bold">
                    {headings?.heading6}
                  </h2>
                  <p className="mt-2 md:mt-4 text text-xl">{text?.text8}</p>
                </div>
                <div>
                  <h2 className="md:text-2xl lg:text-4xl text-primary-500 border-b-4 border-black pb-2 md:pb-4 font-bold">
                    {headings?.heading7}
                  </h2>
                  <p className="mt-2 md:mt-4 text text-xl">{text?.text9}</p>
                </div>
                <div>
                  <h2 className="md:text-2xl lg:text-4xl text-primary-500 border-b-4 border-black pb-2 md:pb-4 font-bold">
                    {headings?.heading8}
                  </h2>
                  <p className="mt-2 md:mt-4 text text-xl">{text?.text10}</p>
                </div>
              </div>
            </section>

            <section className="w-full mt-8">
              <h1 className="text-4xl text-primary-500 font-bold">{headings?.heading9}</h1>
              <div className="flex flex-col md:flex-row gap-8 mt-6">
                <Image
                  className="max-w-2xl w-full rounded-primary max-h-80 object-cover"
                  record={images}
                  index={5}
                />
                <div className="flex flex-col">
                  <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">
                    {text?.text11}
                  </ul>
                  <a href={'/fund-1-2.pdf'} target="_blank">
                    <Button className="mt-4">
                      {qq('Свидетельство о гос.регистрации', 'Авторлық құқық куәлігі')}
                    </Button>
                  </a>
                  <a href={'/fund-3-37.pdf'} target="_blank">
                    <Button className="mt-4">
                      {qq(
                        'Авторское право',
                        'Қазақстандағы Эндаумент қорын жасау және басқару туралы авторлық жүйе'
                      )}
                    </Button>
                  </a>
                </div>
              </div>
            </section>

            <section className="mt-10 lg:mt-16">
              <div>
                <h1 className="text-4xl font-medium text-primary-500 text-center">
                  {headings?.heading99}
                </h1>

                <ul className="space-y-4 mt-5">
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">{text?.text991}</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">{text?.text992}</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">{text?.text993}</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">{text?.text994}</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">{text?.text995}</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">{text?.text996}</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">{text?.text997}</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">{text?.text998}</p>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mt-8">
              <h1 className="text-4xl text-primary-500 font-bold text-center">
                {headings?.heading10}
              </h1>
              <div className="flex flex-col md:flex-row gap-8 mt-6">
                <Image
                  className="max-w-2xl w-full rounded-primary max-h-80 object-cover"
                  record={images}
                  index={6}
                />
                <div>
                  <h2 className="font-semibold text-[20px] text-primary-500">
                    {headings?.heading11}
                  </h2>
                  <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">
                    {text?.text12}
                  </ul>
                  <div className="flex mt-4">
                    <Button onClick={() => handlers1.open()}>
                      {kz ? 'Өтініш қалдыру' : `Оставить заявку`}
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div> */}

      {/* <Modal
        opened={opened1}
        onClose={() => handlers1.close()}
        centered
        title='Оставить заявку'
      >
        <section className='max-w-md mx-auto border px-4 pb-4 shadow-lg bg-white'>
          <TextInput
            label='Имя'
            placeholder='Ваше имя'
            className='mt-3'
            variant='filled'
            value={d?.name}
            onChange={e => setD({...d, name: e?.currentTarget?.value})}
          />
          <TextInput
            label='Контактный номер'
            placeholder='Ваш номер'
            className='mt-3'
            variant='filled'
            value={d?.phone}
            onChange={e => setD({...d, phone: e?.currentTarget?.value})}
          />
          <Select
            label='Услуга'
            placeholder='Выберите услугу'
            data={r?.services?.map(e => {return {label: e, value: e}}) ?? []}
            className='mt-3'
            variant='filled'
            onChange={e => setD({...d, service: e})}
          />
          <div className='flex justify-center mt-6'>
            <Button 
              disabled={!d?.name || !d?.phone}
              onClick={async () => {
                  await pb.collection('fund_bids').create({
                    ...d
                  })
                  .then(() => {
                    showNotification({
                      title: 'Заявка',
                      color: 'green',
                      message: 'Заявка успешно отправлена'
                    })
                    setD({
                      name: '',
                      phone: '',
                    })
                    handlers1.close()
                  })
                }
              }
            >
              {qq('Оставить заявку', 'Өтініш қалдыру')}
            </Button>
          </div>
        </section>
      </Modal> */}
    </>
  )
}
