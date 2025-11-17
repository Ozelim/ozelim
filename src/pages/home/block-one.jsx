import React from 'react'
import { SiSitepoint } from 'react-icons/si'

export const BlockOne = () => {
  return (
    <div
      className="relative flex min-h-screen w-full flex-col bg-background-light group/design-root bg-zinc-100"
      style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}
    >
      <div className="container flex h-full grow flex-col mt-8">
        <div className="flex flex-1 justify-center">
          <div className="flex flex-col flex-1">
            <div className="flex flex-col md:flex-row gap-6 shadow-lg border rounded-lg overflow-hidden bg-white p-4 md:p-8">
              <div className="flex flex-col w-full">
                <div className="flex flex-col gap-3 mb-4">
                  <h1 className="text-primary text-3xl font-black leading-tight tracking-[-0.033em] md:text-4xl">
                    Открой Казахстан вместе с OzElim!
                  </h1>
                  {/* <h3 className="text-gray-800 text-lg font-medium leading-normal md:text-xl mb-0">
                    Lorem ipsum dolor sit.
                  </h3> */}
                </div>
                <p className="text-gray-600 text-base font-normal leading-relaxed">
                  Мы объединяем людей, сервисы, знания и технологии, чтобы сделать путешествия по
                  Казахстану доступными, комфортными и полезными.
                </p>
              </div>
              <div>
                <h2 className="text-primary text-2xl font-bold leading-tight tracking-[-0.015em] mb-0">
                  OzElim - это:
                </h2>
                <div className="flex flex-col">
                  <div className="flex gap-4 p-4 min-h-[72px]">
                    <div className="text-primary flex items-center justify-center rounded-full bg-primary/20 shrink-0 size-8 mt-1">
                      <SiSitepoint size={24} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-gray-600 text-sm font-normal leading-normal">
                        Цифровой ассистент по подбору санаториев по заболеваниям и патологиям
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 min-h-[72px]">
                    <div className="text-primary flex items-center justify-center rounded-full bg-primary/20 shrink-0 size-8 mt-1">
                      <SiSitepoint size={24} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-gray-600 text-sm font-normal leading-normal">
                        Авторские туры и культурно-познавательные маршруты
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 min-h-[72px]">
                    <div className="text-primary flex items-center justify-center rounded-full bg-primary/20 shrink-0 size-8 mt-1">
                      <SiSitepoint size={24} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-gray-600 text-sm font-normal leading-normal">
                      Миграционно-визовая, правовая и страховая поддержка  
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 min-h-[72px]">
                    <div className="text-primary flex items-center justify-center rounded-full bg-primary/20 shrink-0 size-8 mt-1">
                      <SiSitepoint size={24} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-gray-600 text-sm font-normal leading-normal">
                      Административная поддержка Ассоциации туристов Казахстана  
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 min-h-[72px]">
                    <div className="text-primary flex items-center justify-center rounded-full bg-primary/20 shrink-0 size-8 mt-1">
                      <SiSitepoint size={24} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-gray-600 text-sm font-normal leading-normal">
                      Эндаумент фонд на базе МФЦА для поддержки туристических проектов
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <hr className="border-gray-200 mx-4 my-4" /> */}

            <div class="mt-8 relative flex w-full flex-col font-display group/design-root overflow-x-hidden bg-white border shadow-lg rounded-lg overflow-hidden p-4 md:p-8">
              <div class="flex h-full grow flex-col">
                <div class="flex items-center justify-center">
                  <div class="layout-content-container flex flex-col w-full flex-1">
                    <div class="@container">
                      <div class="flex flex-col-reverse items-start gap-8 lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
                        <div class="flex flex-col gap-6 text-left lg:col-span-7 lg:gap-8">
                          <div class="flex flex-col gap-3">
                            <h1 class="text-primary text-2xl font-black leading-tight tracking-[-0.03em] md:text-3xl">
                              Lorem ipsum dolor sit.
                            </h1>
                            <p class="text-[#1A202C]/80 text-base font-normal leading-relaxed md:text-lg">
                              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet omnis
                              veritatis cumque placeat minima molestias numquam ipsa repellat culpa,
                              iusto et eius, repellendus, rerum maxime quo corporis id harum
                              corrupti excepturi. Nam modi sunt odio corrupti excepturi aut dolores
                              explicabo?
                            </p>
                          </div>
                        </div>
                        <div class="w-full lg:col-span-5">
                          <div
                            class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                            data-alt="Vibrant abstract gradient with blue and purple tones"
                            style={{
                              backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBiFE9Sdd0jymYHWXqGTBSe8hqI1mFxOdSTcf9Xpjp641j0h8wXFp55P0myU-RJXutrxou7HGmmxi1rRSPBOwNYXSBcQcvsoVQmopbGkpnZ6EkRAcFceTH44e3uBXA62FOLgcEpzrsrrlgfB9g8aVMWT8Y09kQdIHjQmVaH8zUSJpnHKAzstI76IoIrfkZUORMKCd80BKEW6BEiVbunfVAOSgpqXxWvMGGaFY4bOIs-eAbhYosR38VK7G0-BYuBJG2U8igBzgIcXjBq")',
                            }}
                          ></div>
                        </div>
                      </div>
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
