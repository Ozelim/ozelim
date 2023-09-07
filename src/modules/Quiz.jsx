import React from 'react'
import { Button, Group, Select, Stepper, TextInput } from '@mantine/core'
import { pb } from 'shared/api'
import { getRegionsAndDiseas } from 'shared/lib/getRegionsAndDiseases'
import { useUtils } from 'shared/hooks'
import { showNotification } from '@mantine/notifications'

async function getQuestions() {
  return (await pb.collection('questions').getFullList({
    filter: `question = true`
  }))[0]
}

export const Quiz = () => {

  const [questions, setQuestions] = React.useState({})

  // const [number, setNumber] = React.useState(1)

  const { regions, diseases } = useUtils()

  React.useEffect(() => {
    getQuestions().then((res) => {
      setQuestions(res)
    })

  }, [])

  const [step, setStep] = React.useState(0)

  const nextStep = () =>
    setStep((current) => (current < questions?.count ? current + 1 : current))
  const prevStep = () =>
    setStep((current) => (current > 0 ? current - 1 : current))

  const [answer, setAnswer] = React.useState({})
  const [loading, setLoading] = React.useState(false)

  async function saveAnswers() {
    setLoading(true)
    await pb.collection('questions').create(answer)
    .then(() => {
      showNotification({
        title: 'Заявка',
        message: 'Ваша заявка принята',
        color: 'green'
      })
    })
    .catch(() => {
      showNotification({
        title: 'Заявка',
        message: 'Не удалось отправить результат, попробуйте еще раз позже',
        color: 'red'
      })
    })
    .finally(() => {
      setLoading(false)
      setStep(0)
      setAnswer({})
    })
  }

  function handleAnswerChange(e, name) {
    if (e.currentTarget) {
      const { value, name } = e.currentTarget
      setAnswer({ ...answer, [name]: value })
      return
    }
    setAnswer({ ...answer, [name]: e })
    // setNumber(name)
  }

  return (
    <div className="w-full px-4">
      <div className="container bg-white rounded-primary py-8 shadow-md">
        <div className='w-full flex justify-center'>
          <div className="max-w-4xl relative overflow-hidden space-y-2">
            <div className="mb-10">
              <h1 className="text-center text-4xl mb-2 text-primary-500">
                Санаторно-курортные комплексы по Вашим медицинским показаниям
              </h1>
              <p className="text-center text">
                Ответьте на вопросы и ожидайте консультацию
              </p>
            </div>

            <Stepper
              allowNextStepsSelect={false}
              active={step}
              onStepClick={setStep}
              classNames={{
                steps: 'md:!flex !hidden',
                content: '-mt-16 md:mt-0',
              }}
            >
              {Object.keys(questions ?? {})?.map((key, i) => {
                if (!isNaN(key)) {
                  if (key <= questions?.count) {
                    return (
                      <Stepper.Step key={key}>
                        <div
                          className={
                            'flex rounded-primary border border-zinc-200 justify-center items-center w-full h-full mt-4'
                          }
                        >
                          <div className="w-full p-4">
                            <p className="text-lg text-center text">
                              {questions?.[key]}
                            </p>
                            {key == 1 && (
                              <Select
                                variant="filled"
                                data={diseases ?? []}
                                className="mt-5 rounded-primary w-full max-w-[300px] mx-auto"
                                name={key}
                                value={answer?.[key] ?? ''}
                                onChange={(e) => handleAnswerChange(e, key)}
                                label="Ваш ответ"
                              />
                            )}
                            {key == 2 && (
                              <Select
                                variant="filled"
                                data={regions ?? []}
                                className="mt-5 rounded-primary w-full max-w-[300px] mx-auto"
                                name={key}
                                value={answer?.[key] ?? ''}
                                onChange={(e) => handleAnswerChange(e, key)}
                                label="Ваш ответ"
                              />
                            )}
                            {key >= 3 && (
                              <TextInput
                                variant="filled"
                                className="mt-5 rounded-primary w-full max-w-[300px] mx-auto"
                                name={key}
                                value={answer?.[key] ?? ''}
                                onChange={handleAnswerChange}
                                label="Ваш ответ"
                              />
                            )}
                          </div>
                        </div>
                      </Stepper.Step>
                    )
                  }
                }
              })}
            </Stepper>
            <Group position="center" mt="xl">
              {step > 0 && (
                <Button variant="default" onClick={prevStep}>
                  Назад
                </Button>
              )}
              {step < questions?.count - 1 ? (
                <Button
                  onClick={nextStep}
                  disabled={(answer?.[step + 1]?.length ?? 0) < 3}
                >
                  Следуйщий вопрос
                </Button>
              ) : (
                <Button
                  onClick={saveAnswers}
                  disabled={(answer?.[step + 1]?.length ?? 0) < 3}
                >
                  Отправить
                </Button>
              )}
            </Group>
          </div>
        </div>
      </div>
    </div>
  )
}
