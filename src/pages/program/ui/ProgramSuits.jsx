import React from 'react'

export const ProgramSuits = ({ headings, text }) => {
  return (
    <div className="w-full">
      <div className="container">
        <section className="pt-16">
          <div className="flex">
            <h1 className="w-1/2 text-[35px] text-heading font-bold">
              {headings?.text_head}
            </h1>
            <div className="w-1/2">
              <div className="mb-5">
                <h3 className="font-semibold text-heading text-[20px]">
                  {text?.text1}
                </h3>
                <p className="pr-5 text-[#545454]">{text?.text2}</p>
              </div>
              <div>
                <h3 className="font-semibold text-heading text-[20px]">
                  {text?.text3}
                </h3>
                <p className="pr-5 text-[#545454]">{text?.text4}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
