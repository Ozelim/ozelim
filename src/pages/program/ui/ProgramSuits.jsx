import React from 'react'

export const ProgramSuits = () => {
  return (
    <div className="w-full">
      <div className="container">
        <section className="pt-16">
          <div className="flex">
            <h1 className="w-1/2 text-[35px] text-heading font-bold">
              Кому подойдет <br /> партнерство с нами?
            </h1>
            <div className="w-1/2">
              <div className="mb-5">
                <h3 className="font-semibold text-heading text-[20px]">
                  Тому, кто хочет открыть свое <br /> маркетинговое агентство
                </h3>
                <p className="pr-5 text-[#545454]">
                  Мы поможем вам выйти на рынок и начать работать в сфере
                  маркетинга, не имея собственной команды
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-heading text-[20px]">
                  Действующим маркетинговым <br />
                  агентствам
                </h3>
                <p className="pr-5 text-[#545454]">
                  Мы закроем вам весь штат настройки и ведения трафика, а у вас
                  будет больше времени на поиск новых клиентов
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
