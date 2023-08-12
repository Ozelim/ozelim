import React from 'react'

export const HealthPros = () => {
  return (
    <section className="bg-primary-500 py-4 lg:py-24 mt-10 lg:mt-20">
      <div className="container">
        <div className="flex flex-col lg:flex-row max-w-6xl m-auto gap-10">
          <img
            className=" rounded-primary"
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=499&q=80"
            alt=""
          />
          <div className="bg-white rounded-primary w-full text-[#1e1e1e] p-6 lg:p-14 ">
            <h1 className=" font-extrabold text-3xl md:text-[40px]">
              После посещения вы почувствуете
            </h1>
            <div className="bg-[#1e1e1e] max-w-[70px] w-full h-1 mt-3"></div>
            <div className="mt-5 md:text-xl flex flex-col gap-5 font-medium leading-9">
              <div>• Улучшение состояния здоровья</div>
              <div>• Хорошее самочувствие, бодрость духа и тела</div>
              <div>• Повышение тонуса и трудоспособности</div>
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
  )
}
