import React from 'react'

export const WhyOurCourse = () => {
  return (
    <div className="w-full">
      <div className="container">
        <div className="w-full mt-20">
          <h1 className="heading text-heading">
            Почему вам стоит пройти именно наши курсы
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 md:gap-y-6 mt-5 md:mt-10">
            <div className="p-6 rounded-primary shadow-md bg-white">
              <h4 className="text-2xl font-semibold font-head">
                Авторские курсы
              </h4>
              <p className="paragraph mt-2">
                от Центра сертификации специалистов «САПА».
              </p>
            </div>
            <div className="p-6 rounded-primary shadow-md bg-white">
              <h4 className="text-2xl font-semibold font-head">
                Индивидуальный подход
              </h4>
              <p className="paragraph mt-2">
                Вы получите не только сухую теорию, но и возможность
                индивидуально заниматься с профессионалами.
              </p>
            </div>
            <div className="p-6 rounded-primary shadow-md bg-white">
              <h4 className="text-2xl font-semibold font-head">
                Правильное обучение
              </h4>
              <p className="paragraph mt-2">
                Наши преподаватели проводят живые онлайн-трансляции, в конце
                каждого занятия готовы ответить на ваши вопросы. Учебные
                материалы доступны для понимания каждому слушателю.
              </p>
            </div>
            <div className="p-6 rounded-primary shadow-md bg-white">
              <h4 className="text-2xl font-semibold font-head">
                Трудоустройство
              </h4>
              <p className="paragraph mt-2">
                Лучшие студенты будут трудоустроены или привлечены к сезонным
                работам в сфере туризма по договору.
              </p>
            </div>
            <div className="p-6 rounded-primary shadow-md bg-white">
              <h4 className="text-2xl font-semibold font-head">
                С нуля до профи
              </h4>
              <p className="paragraph mt-2">
                У нас вы пройдете курс менеджер по туризму с нуля и овладеете
                всеми необходимыми навыками для закрытия успешных сделок по
                продаже туров.
              </p>
            </div>
            <div className="p-6 rounded-primary shadow-md bg-white">
              <h4 className="text-2xl font-semibold font-head">
                Онлайн-библиотека
              </h4>
              <p className="paragraph mt-2">
                Уникальная возможность получить месячный доступ ко внутреннему
                онлайн-обучению сети. Доступ к вебинарам по направлениям от
                партнеров сети.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
