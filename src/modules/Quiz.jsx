import React from 'react'
import { Button, Group, Select, Stepper, TextInput } from '@mantine/core'
import { pb } from 'shared/api'
import { getRegionsAndDiseas } from 'shared/lib/getRegionsAndDiseases'

async function getQuestions() {
  return (await pb.collection('questions').getFullList())[0]
}

export const Quiz = () => {
  const [questions, setQuestions] = React.useState({})

  const [utils, setUtils] = React.useState({})

  React.useEffect(() => {
    getQuestions().then((res) => {
      console.log(res, 'res')
      setQuestions(res)
    })
    getRegionsAndDiseas().then((res) => {
      setUtils(res)
    })
    getQuestions().then((res) => {
      setQuestions(res)
    })
    getRegionsAndDiseas().then((res) => {
      setUtils(res)
    })
    getQuestions().then((res) => {
      setQuestions(res)
    })
  }, [])

  const [step, setStep] = React.useState(1)

  const nextStep = () =>
    setStep((current) => (current < questions.count ? current + 1 : current))
  const prevStep = () =>
    setStep((current) => (current > 0 ? current - 1 : current))

  const [answer, setAnswer] = React.useState({})

  async function saveAnswers() {
    await pb.collection('questions').create(answer)
  }

  function handleAnswerChange(e, name) {
    if (e.currentTarget) {
      const { value, name } = e.currentTarget
      setAnswer({ ...answer, [name]: value })
      return
    }
    setAnswer({ ...answer, [name]: e })
  }

  const quiz = [...Object.keys(questions)].filter((e) => !isNaN(e))

  return (
    <div className="w-full bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto relative overflow-hidden space-y-2 pb-4">
          <div className="mb-10">
            <h1 className="text-center text-4xl mb-2 text-primary-500">
              Бесплатная помощь специалиста
            </h1>
            <p className="text-center text">
              Впервые на сайте? Ответье на пару вопросов и ждите ответа
              специалиста
            </p>
          </div>

          <Stepper
            allowNextStepsSelect={false}
            active={step}
            onStepClick={setStep}
            classNames={{
              steps: 'md:!flex !hidden',
              content: '-mt-14 md:mt-0',
            }}
          >
            {quiz.map((key, i) => {
              if (Number(key) <= questions.count) {
                console.log(key)
                return (
                  <Stepper.Step key={key}>
                    <div
                      className={
                        'flex rounded-primary border border-zinc-200 justify-center items-center w-full h-full'
                      }
                    >
                      <div className="w-full p-4">
                        <p className="text-lg text-center text">
                          {questions?.[key]}
                        </p>
                        {key == 3 && (
                          <Select
                            variant="filled"
                            data={utils?.diseases ?? []}
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
                            data={utils?.regions ?? []}
                            className="mt-5 rounded-primary w-full max-w-[300px] mx-auto"
                            name={key}
                            value={answer?.[key] ?? ''}
                            onChange={(e) => handleAnswerChange(e, key)}
                            label="Ваш ответ"
                          />
                        )}
                        {key != 3 && key != 2 && (
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
            })}
            {/* {Object.keys(questions)?.map((key, i) => {
              if (!isNaN(key)) {
                if (key < 8) {
                  return (
                    <Stepper.Step key={key}>
                      <div
                        className={
                          'flex rounded-primary border border-zinc-200 justify-center items-center w-full h-full'
                        }
                      >
                        <div className="w-full p-4">
                          <p className="text-lg text-center text">
                            {questions?.[key]}
                          </p>
                          {key == 1 && (
                            <Select
                              variant="filled"
                              data={utils?.diseases ?? []}
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
                              data={utils?.regions ?? []}
                              className="mt-5 rounded-primary w-full max-w-[300px] mx-auto"
                              name={key}
                              value={answer?.[key] ?? ''}
                              onChange={(e) => handleAnswerChange(e, key)}
                              label="Ваш ответ"
                            />
                          )}
                          {key != 1 && key != 2 && (
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
            })} */}
          </Stepper>
          <Group position="center" mt="xl">
            {step > 0 && (
              <Button variant="default" onClick={prevStep}>
                Назад
              </Button>
            )}
            {step < questions.count ? (
              <Button onClick={nextStep}>Следуйщий вопрос</Button>
            ) : (
              <Button onClick={saveAnswers}>Отправить</Button>
            )}
          </Group>
        </div>
      </div>
    </div>
  )
}
