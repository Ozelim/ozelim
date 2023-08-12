import { Button, Center } from '@mantine/core'
import React from 'react'

export const ProgramRules = () => {
  return (
    <div className="w-full">
      <div className="container">
        <section className="bg-[#F7F7F5] mt-16 rounded-[20px] ">
          <h2 className="text-[35px] text-heading font-bold">
            Стать нашим партнером - просто!
          </h2>
          <div className="flex">
            <div className="w-2/4">
              <p className="mt-5 font-medium">
                Важный момент! Остаточный доход – это не количество денег! Это
                механизм, который ещё долгое время может Вас обеспечивать
                бесплатными услугами или деньгами за когда-то проделанную
                работу.
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
              <Center>
                <Button size="md" className="mt-5">
                  Договор офферты
                </Button>
              </Center>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
