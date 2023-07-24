import { Button, Center } from '@mantine/core'
import React from 'react'
import { FcInfo } from 'react-icons/fc'

export const ProgramPros = () => {
  return (
    <div className="bg-[#242424] w-full">
      <div className="container">
        <section className="text-white p-[50px] rounded-[20px] mt-16">
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
                100%-кэшбек с первого партнера, который зарегистрируется по
                Вашей реферальной ссылке
              </p>
            </div>
            <div className="flex items-center ">
              <FcInfo className="text-5xl flex-shrink-0" />
              <p className="text-[22px] ml-4 font-normal">
                Переход в основной маркетинг за счет популяризации услуг туризма
                и привлечения новых пользователей
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
          <Center>
            <Button size='lg' className="mt-10">
              Стать партнером
            </Button>
          </Center>
        </section>
      </div>
    </div>
  )
}
