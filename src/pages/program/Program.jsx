import React from 'react'
import { FcInfo } from 'react-icons/fc'

export const Program = () => {
  return (
    <section className="max-w-6xl  m-auto">
      <div className="flex">
        <div className="w-1/2">
          <h1 className="mb-[15px] text-6xl  text-heading font-bold">
            Партнерство, которое работает
          </h1>
          <p className="mb-[40px] text-[#27272D] mr-5">
            В целях популяризации и развития внутреннего туризма Вашему вниманию
            предлагаем социально-накопительную партнерскую программу
            оздоровительного туризма, которая при активной работе в построении
            структуры позволит любому пользователю получить наши услуги
            <span className=" font-bold"> БЕСЛАТНО </span>
          </p>
          <button className="py-[15px] mb-[60px] px-[45px] bg-[#5956E9] text-white text-[18px] font-bold rounded-[8px]">
            Стать партнером
          </button>
          <div className="flex gap-5">
            <div className="w-[150px] text-center">
              <FcInfo className="m-auto" />
              <p className="mt-3">Реферальный бонус 50% от суммы входа</p>
            </div>
            <div className="w-[150px] text-center">
              <FcInfo className="m-auto" />
              <p className="mt-3">Отсутствие дополнительных вложений.</p>
            </div>
            <div className="w-[150px] text-center">
              <FcInfo className="m-auto" />
              <p className="mt-3">Количество рефералов без ограничения</p>
            </div>
          </div>
        </div>
        <img
          className="w-1/2"
          src="https://partner.promarketing.tech/wp-content/uploads/2023/05/main-img1-992x1024.png"
          alt=""
        />
      </div>
      <section className="bg-[#242424] w-full text-white p-[50px] rounded-[20px] mt-16">
        <h1 className="text-[35px] font-bold mb-5 text-center">
          Преимущества <br /> сотрудничества с нами
        </h1>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex items-center ">
            <FcInfo className="text-5xl flex-shrink-0" />
            <p className="text-[22px] ml-4 font-normal">
              Единоразовая и доступная сумма входа
            </p>
          </div>
          <div className="flex items-center ">
            <FcInfo className="text-5xl flex-shrink-0" />
            <p className="text-[22px] ml-4 font-normal">
              100%-кэшбек с первого партнера, который зарегистрируется по Вашей
              реферальной ссылке
            </p>
          </div>
          <div className="flex items-center ">
            <FcInfo className="text-5xl flex-shrink-0" />
            <p className="text-[22px] ml-4 font-normal">
              Переход в основной маркетинг за счет популяризации услуг туризма и
              привлечения новых пользователей
            </p>
          </div>
          <div className="flex items-center ">
            <FcInfo className="text-5xl flex-shrink-0" />
            <p className="text-[22px] ml-4 font-normal">
              Реферальный бонус 50% от суммы входа
            </p>
          </div>
          <div className="flex items-center ">
            <FcInfo className="text-5xl flex-shrink-0" />
            <p className="text-[22px] ml-4 font-normal">
              Количество рефералов без ограничения
            </p>
          </div>
          <div className="flex items-center ">
            <FcInfo className="text-5xl flex-shrink-0" />
            <p className="text-[22px] ml-4 font-normal">
              Отсутствие дополнительных вложений.
            </p>
          </div>
        </div>
        <button className="py-[15px] px-[45px] bg-[#5956E9] text-white text-[18px] font-bold rounded-[8px] block m-auto mt-10">
          Стать партнером
        </button>
      </section>
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

      <section className="bg-[#F7F7F5] mt-16 rounded-[20px] py-[50px] px-[30px]">
        <h2 className="text-[35px] text-heading font-bold">
          Стать нашим партнером - просто!
        </h2>
        <div className="flex">
          <div className="w-2/4">
            <p className="mt-5 font-medium">
              Важный момент! Остаточный доход – это не количество денег! Это
              механизм, который ещё долгое время может Вас обеспечивать
              бесплатными услугами или деньгами за когда-то проделанную работу.
            </p>
            <p className="mt-5  font-medium">
              Даже если это небольшая сумма, но Вы не прилагаете усилий для их
              получения. Это и есть остаточный доход.
            </p>
          </div>
          <div className="w-2/4 ml-11 mt-5">
            <p className="text-[#27272D]">
              Уважаемый пользователь! Прежде чем, зарегистрироваться в нашу
              социально-накопительную партнерскую программу, просим Вас
              ознакомиться с условиями и правилами маркетинга в Агентском
              договоре-офферте.
            </p>
            <button className="py-[15px] px-[45px] bg-[#5956E9] text-white text-[18px] font-bold rounded-[8px] block m-auto mt-5">
              Правила
            </button>
          </div>
        </div>
      </section>
    </section>
  )
}
