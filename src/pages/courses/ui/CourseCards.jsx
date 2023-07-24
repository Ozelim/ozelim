import React from 'react'
import { FaRegHandshake } from 'react-icons/fa'
import { HiMiniUserGroup } from 'react-icons/hi2'
import { SiYourtraveldottv } from 'react-icons/si'

export const CourseCards = () => {
  return (
    <div className="w-full">
      <div className="container">
        <section className="flex gap-7 mt-20">
          <div className="border-solid border-4 rounded-primary py-5 px-7 border-[#20c997] w-1/3">
            <div className="flex items-center">
              <div className="bg-[#20c997] p-4 rounded-full">
                <HiMiniUserGroup className="text-5xl text-heading flex-shrink-0" />
              </div>
              <h2 className="text-3xl text-heading ml-3">Групповые туры</h2>
            </div>
            <p className="mt-3">
              Обучающие групповые туры по курортным зонам Казахстана в целях
              закрепления теоретических материалов
            </p>
          </div>
          <div className="border-solid border-4 rounded-primary py-5 px-7 border-primary-500 w-1/3">
            <div className="flex items-center">
              <div className="bg-[#20c997] p-4 rounded-full">
                <SiYourtraveldottv className="text-5xl text-heading flex-shrink-0" />
              </div>
              <h2 className="text-3xl text-heading ml-3">Путевки</h2>
            </div>
            <p className="mt-3">
              Путевку в санаторно-курортную зону всё включено: проживание,
              питание, лечебные процедуры, страхование, трансфер, дорожный
              расход
            </p>
          </div>
          <div className="border-solid border-4 rounded-primary py-5 px-7 border-primary-500 w-1/3">
            <div className="flex items-center">
              <div className="bg-[#20c997] p-4 rounded-full">
                <FaRegHandshake className="text-5xl text-heading flex-shrink-0" />
              </div>
              <h2 className="text-3xl text-heading ml-3">
                Международные практики
              </h2>
            </div>
            <p className="mt-3">
              Международную практику в сфере туризма, гостиничного и
              ресторанного бизнеса за рубежом, всё включено.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
