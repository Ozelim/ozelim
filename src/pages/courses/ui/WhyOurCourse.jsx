import React from 'react'

export const WhyOurCourse = ({ headings, text }) => {
  return (
    <div className="w-full">
      <div className="container">
        <div className="w-full mt-20">
          <h1 className="heading text-4xl text-teal-500">{headings?.grid_main}</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 md:gap-y-6 mt-5 md:mt-10">
            <div className="p-6 rounded-primary shadow-md bg-white">
              <h4 className="text-2xl font-semibold font-head">
                {headings?.grid_head1}
              </h4>
              <p className="paragraph mt-2">{text?.grid_p1}</p>
            </div>
            <div className="p-6 rounded-primary shadow-md bg-white">
              <h4 className="text-2xl font-semibold font-head">
                {headings?.grid_head2}
              </h4>
              <p className="paragraph mt-2">{text?.grid_p2}</p>
            </div>
            <div className="p-6 rounded-primary shadow-md bg-white">
              <h4 className="text-2xl font-semibold font-head">
                {headings?.grid_head3}
              </h4>
              <p className="paragraph mt-2">{text?.grid_p3}</p>
            </div>
          </div>
          <div>
            <h2 className='text-center mt-5 mb-3 md:mt-5 md:mb-5 text-2xl font-semibold font-head text-teal-500'>
              {text?.grid_head4}
            </h2>
            <div className='grid md:grid-cols-3 gap-4 md:gap-8'>
              <div className="p-6 rounded-primary shadow-md bg-white">
                <p className="paragraph mt-2">{text?.grid_p4}</p>
              </div>
              <div className="p-6 rounded-primary shadow-md bg-white">
                <p className="paragraph mt-2">{text?.grid_p5}</p>
              </div>
              <div className="p-6 rounded-primary shadow-md bg-white">
                <p className="paragraph mt-2">{text?.grid_p6}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
