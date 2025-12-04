import { useLangContext } from 'app/langContext'
import React from 'react'
import { SiSitepoint } from 'react-icons/si'

export const BlockOne = () => {

  const {qq} = useLangContext()

  return (
    <div
      className="relative flex w-full flex-col bg-zinc-100 pb-8"
      style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}
    >
      <div className="container flex h-full grow flex-col mt-8">
        <div className="flex flex-1 justify-center">
          <div className="flex flex-col flex-1">
            <div className=" gap-6 shadow-lg border rounded-lg overflow-hidden bg-white p-4 md:p-8">
              <div className="flex flex-col w-full">
                <div className="flex flex-col gap-3 mb-4">
                  <h1 className="text-primary text-3xl font-black leading-tight tracking-[-0.033em] md:text-4xl text-center">
                    {qq(
                      "Открой Казахстан вместе с OzElim!",
                      "OzElim-пен бірге Қазақстанды аш!"
                    )}
                  </h1>
                  {/* <h3 className="text-gray-800 text-lg font-medium leading-normal md:text-xl mb-0">
                    Lorem ipsum dolor sit.
                  </h3> */}
                </div>
                <p className="text-gray-600 text-base font-normal leading-relaxed">
                  {qq(
                    "Мы объединяем людей, сервисы, знания и технологии, чтобы сделать путешествия по Казахстану доступными, комфортными и полезными.",
                    "Біз адамдарды, сервистерді, білімді және технологияларды біріктіріп, Қазақстан бойынша саяхатты қолжетімді, жайлы әрі пайдалы етеміз."
                  )}
                </p>
              </div>
              <div>
                <h2 className="text-primary text-2xl font-bold leading-tight tracking-[-0.015em] mb-0">
                  {qq("OzElim - это:", "OzElim - бұл:")}
                </h2>
                <div className="grid md:grid-cols-2">
                  <div className="flex gap-4 md:p-4 min-h-[72px]">
                    <div className="text-primary flex items-center justify-center rounded-full">
                      <SiSitepoint size={24} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-gray-600 text-sm font-normal leading-normal">
                        {qq(
                          "Цифровой ассистент по подбору санаториев по заболеваниям и патологиям",
                          "Аурулар мен патологиялар бойынша санаторий таңдайтын цифрлық көмекші"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 md:p-4 min-h-[72px]">
                    <div className="text-primary flex items-center justify-center rounded-full shrink-0 ">
                      <SiSitepoint size={24} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-gray-600 text-sm font-normal leading-normal">
                        {qq(
                          "Авторские туры и культурно-познавательные маршруты",
                          "Авторлық турлар және мәдени-танымдық бағыттар"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 md:p-4 min-h-[72px]">
                    <div className="text-primary flex items-center justify-center rounded-full ">
                      <SiSitepoint size={24} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-gray-600 text-sm font-normal leading-normal">
                        {qq(
                          "Миграционно-визовая, правовая и страховая поддержка",
                          "Миграциялық-визалық, құқықтық және сақтандыру қолдау"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 md:p-4 min-h-[72px]">
                    <div className="text-primary flex items-center justify-center rounded-full ">
                      <SiSitepoint size={24} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-gray-600 text-sm font-normal leading-normal">
                        {qq(
                          "Административная поддержка Ассоциации туристов Казахстана",
                          "Қазақстан туристері қауымдастығының әкімшілік қолдауы"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 md:p-4 min-h-[72px]">
                    <div className="text-primary flex items-center justify-center rounded-full ">
                      <SiSitepoint size={24} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-gray-600 text-sm font-normal leading-normal">
                        {qq(
                          "Эндаумент фонд на базе МФЦА для поддержки туристических проектов",
                          "Туристік жобаларды қолдау үшін АХҚО негізіндегі эндаумент қоры"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
