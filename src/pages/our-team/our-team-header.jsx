import React from 'react'
import { Image } from 'shared/ui'

import q from 'shared/assets/images/team/1.png'
import { SiSitepoint } from 'react-icons/si'

export const OurTeamHeader = ({ headings, text }) => {
  return (
    <section className="w-full">
      <div className="container">
        <div className="flex flex-col lg:flex-row mt-4 gap-8 shadow-lg overflow-hidden rounded-lg bg-white p-4">
          <img
            src={q}
            className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
          />

          <div className="w-full lg:text-left text-center">
            {/* <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500">
              {headings?.main}
            </h1> */}

            <h1 className="text-2xl font-black leading-tight tracking-tight text-primary md:text-3xl lg:text-4xl">
              {headings?.main}
            </h1>

            {/* <p className="text-xl font-medium mt-3 text-[#1e1e1e]">{headings?.submain}</p> */}
            <h3 className="text-lg md:text-xl mt-4">{headings?.submain}</h3>

            {/* <ul className="mt-3 text-lg font-medium text-[#5a5959] ">
              <li>• {text?.text1}</li>
              <li>• {text?.text2}</li>
              <li>• {text?.text3}</li>
              <li>• {text?.text4}</li>
            </ul> */}

            <div className="flex flex-col gap-6">
              <div className="flex items-center md:items-start gap-4">
                <SiSitepoint size={20} color='text-bg' className="mt-1.5 flex-shrink-0 rounded-full"/>
                <div className="flex flex-col gap-1">
                  <p className="text-base text-[#4c669a]">{text?.text1}</p>
                </div>
              </div>
              <div className="flex items-center md:items-start gap-4">
                <SiSitepoint size={20} color='text-bg' className="mt-1.5 flex-shrink-0 rounded-full"/>
                <div className="flex flex-col gap-1">
                  <p className="text-base text-[#4c669a]">{text?.text2}</p>
                </div>
              </div>
              {/* <div className="flex items-center md:items-start gap-4">
                <SiSitepoint size={20} color='text-bg' className="mt-1.5 flex-shrink-0 rounded-full"/>
                <div className="flex flex-col gap-1">
                  <p className="text-base text-[#4c669a]">{text?.text3}</p>
                </div>
              </div> */}
              <div className="flex items-center md:items-start gap-4">
                <SiSitepoint size={20} color='text-bg' className="mt-1.5 flex-shrink-0 rounded-full"/>
                <div className="flex flex-col gap-1">
                  <p className="text-base text-[#4c669a]">{text?.text4}</p>
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
