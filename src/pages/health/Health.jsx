import { Button } from '@mantine/core'
import React from 'react'
import FitnessIcon from 'shared/assets/icons/fitness.svg'
import YogaIcon from 'shared/assets/icons/yoga.svg'

export const Health = () => {

  return (
    <main className="w-full">
      <section className="w-full">
        <div className="container">
          <div className="flex flex-col lg:flex-row">
            <img className="max-w-2xl w-full hidden lg:block" src={FitnessIcon} alt="fitness" />
            <div className="">
              <h1 className="text-2xl md:text-3xl font-bold font-head text-[#1e1e1e]">
                Если у вас хроническая физическая и психологическая усталость
              </h1>
              <img className="max-w-2xl w-full block lg:hidden mt-4" src={FitnessIcon} alt="fitness" />
              <p className="text-xl font-medium mt-3 text-[#1e1e1e]">
                В таких случаях вам нужна перезагрузка. Что это значит:
              </p>
              <ul className="mt-3 text-lg font-medium text-[#5a5959] ">
                <li>
                  • Пребывание в благоприятных <br /> климатических условиях
                </li>
                <li>• Морально-психологические виды отдыха</li>
                <li>• Лечение текущих заболеваний</li>
                <li>• Общая профилактика организма</li>
                <li>• Профилактика иммунной системы человека</li>
                <li>• Лечебная гимнастика и физкультура</li>
              </ul>
              <Button 
                className="mt-10" 
                size="md"
              >
                Подробнее
              </Button>
            </div>
          </div>
        </div>
      </section>


      <section className="bg-[#121212] py-4 lg:py-24 mt-10 lg:mt-20">
        <div className="container">
          <div className="flex flex-col lg:flex-row max-w-6xl m-auto gap-10">
            <img
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=499&q=80"
              alt=""
            />
            <div className="bg-white w-full text-[#1e1e1e] p-6 lg:p-14 ">
              <h1 className=" font-extrabold text-3xl md:text-[40px]">
                После посещения вы почувствуете
              </h1>
              <div className="bg-[#1e1e1e] max-w-[70px] w-full h-1 mt-3"></div>
              <div className="mt-5 md:text-xl font-medium leading-9">
                <div>• Улучшение состояния здоровья</div>
                <div>• Хорошее самочувствие</div>
                <div>• Повышение трудоспособности</div>
                <div>• Снятие симптомов хронической усталости</div>
                <div>
                  • Восстановление физических сил и морально-психологической
                  энергии
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> 
    
      <section className="mt-10 lg:mt-20">
        <div className="container">
          <div className="flex">
            <div className="lg:w-1/2 lg:mr-5 text-[#1e1e1e] text-lg">
              <p className='text'>
                Туризм активного отдыха и оздоровления называют оздоровительным
                или реабилитационным туризмом, так как предусмотрена лечение в
                условиях санатория под наблюдением квалифицированных медицинских
                работников и узких специалистов.
              </p>
              <img
                className="block lg:hidden mt-5 mx-auto"
                src="https://images.unsplash.com/photo-1524863479829-916d8e77f114?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                alt=""
              />
              <p className="mt-5 text">
                Благодаря лечебно-оздоровительному туризму можно получить
                эффективное, практически полное, всестороннее обновление
                организма, так как человеку предоставляется возможность временно
                покинуть место постоянного жительства, работу, изменить привычную
                обстановку и образ жизни. Если совместить отдых с лечением и
                восстановлением организма и превратить его в привычку, т.е. в
                ежегодное мероприятие, то можно снять симптомы физической и
                морально-психологической усталости на достаточно долгий срок.
              </p>
            </div>
            <img
              className="hidden lg:block w-1/2"
              src="https://images.unsplash.com/photo-1524863479829-916d8e77f114?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
              alt=""
            />
          </div>
        </div>
      </section>
    </main>
  )
}
