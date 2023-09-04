import React from 'react'

export const ProgramSuits = ({ headings, text }) => {
  return (
    <div className="w-full">
      <div className="container">
        <section className="pt-16">
          <div className="flex flex-col">
            <h1 className=" text-[35px] font-bold text-teal-500">
              {headings?.text_head}
            </h1>
            <div className="flex flex-col md:flex-row gap-2 mt-8">
              <div className="mb-5">
                <h3 className="font-semibold text-[20px]">
                  {headings?.text1}
                </h3>
                <p className="pr-5 text-[#545454]">{text?.text2}</p>
              </div>
              <div>
                <h3 className="font-semibold text-heading text-[20px]">
                {text?.text3}
                </h3>
                <p className="pr-5 text-[#545454]">
                {text?.text4}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
