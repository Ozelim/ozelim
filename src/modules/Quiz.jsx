import React from 'react'
import { Button, Group, Select, Stepper, TextInput } from '@mantine/core'
import { pb } from 'shared/api'
import { getRegionsAndDiseas } from 'shared/lib/getRegionsAndDiseases'

async function getQuestions () {
  return (await pb.collection('questions').getFullList())[0]
}

export const Quiz = () => {

  const [questions, setQuestions] = React.useState({})

  const [utils, setUtils] = React.useState({})

  React.useEffect(() => {
    getQuestions()
    .then(res => {
      console.log(res, 'res');
      setQuestions(res)
    })
    getRegionsAndDiseas()
    .then(res => {
      setUtils(res)
    })
  }, [])

  const [step, setStep] = React.useState(1)

  const nextStep = () => setStep((current) => (current < 12 ? current + 1 : current));
  const prevStep = () => setStep((current) => (current > 0 ? current - 1 : current));

  const [answer, setAnswer] = React.useState({})

  async function saveAnswers () {
    await pb.collection('questions').create(answer)
  }

  function handleAnswerChange (e, name) {
    if (e.currentTarget) {
      const {value, name} = e.currentTarget
      setAnswer({...answer, [name]: value})
      return 
    }
    setAnswer({...answer, [name]: e})
  }

  return (
    <div className="w-full bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto relative overflow-hidden space-y-2 pb-4">
          <Stepper
            active={step}
            onStepClick={setStep}
          >
            {Object.keys(questions).map((key, i) => {
              if (!isNaN(key)) {
                if (key < 11) {
                  return (
                    <Stepper.Step>
                      <div
                        className={'flex rounded-primary border border-zinc-200 justify-center items-center w-full h-full'}
                      >
                        <div className='w-full p-4'>
                          <p className='text-lg text-center text'>
                            {questions?.[key]}
                          </p>
                          {key == 1 && (
                            <Select 
                              variant='filled'
                              data={utils?.diseases}
                              className="mt-5 rounded-primary w-full max-w-[300px] mx-auto"
                              name={key}
                              value={answer?.[key] ?? ''}
                              onChange={e => handleAnswerChange(e, key)}
                              label='Ваш ответ'
                            />
                          )}
                          {key == 2 && (
                            <Select
                              variant='filled'
                              data={utils?.regions}
                              className="mt-5 rounded-primary w-full max-w-[300px] mx-auto"
                              name={key}
                              value={answer?.[key] ?? ''}
                              onChange={e => handleAnswerChange(e, key)}
                              label='Ваш ответ'
                            />
                          )}
                          {(key != 1 && key != 2) && (
                            <TextInput
                              variant='filled'
                              className="mt-5 rounded-primary w-full max-w-[300px] mx-auto"
                              name={key}
                              value={answer?.[key] ?? ''}
                              onChange={handleAnswerChange}
                              label='Ваш ответ'
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
              <Button variant="default" onClick={prevStep}>Назад</Button>
            )}
            {step < 9 ? (
              <Button onClick={nextStep}>Следуйщий вопрос</Button>
            ) : (
              <Button
                onClick={saveAnswers}
              >
                Отправить
              </Button>
            )}
          </Group>
          <h1 className="text-center text-4xl mb-2 text-primary-500">
            Бесплатная помощь специалиста
          </h1>
          <p className="text-center text">
            Впервые на сайте? Ответье на пару вопросов и ждите ответа специалиста
          </p>
        </div>
      </div>
    </div>
  )
}
