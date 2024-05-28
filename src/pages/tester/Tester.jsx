import React from 'react'
import { Button, TextInput } from '@mantine/core'
import { pb } from 'shared/api'
import { Link, useSearchParams } from 'react-router-dom'

async function getTests () {
  return await pb.collection('tester').getFullList()
}

export const Tester = () => {

  const [tests, setTests] = React.useState([]) 
  const [currentTest, setCurrentTest] = React.useState({
    show: false,
    q: null
  })

  const [data, setData] = React.useState({
    name: '',
    phone: '',
  })

  React.useEffect(() => {
    getTests()
    .then(res => {
      setTests(res)
    })
  }, [])

  function handleTest () {
    setCurrentTest({...currentTest, show: true})
  }

  function handleAnswer (id, index) {
    setCurrentTest(tester => ({...tester, q: {...tester?.q, questions: tester?.q?.questions?.map(q =>
      q.id === id ? { ...q, selected: index } : q
    )}}));
  }

  console.log(currentTest?.q?.questions?.every(q => q?.selected), 'test');

  return (
    <div className='w-full'>
      <div className="container">
        <div className="w-full">
          <TextInput
            label='ФИО'
            value={data?.name}
            onChange={e => setData({...data, name: e?.target?.value})}
          />
          <TextInput
            label='Номер телефона'
            value={data?.phone}
            onChange={e => setData({...data, phone: e?.target?.value})}
          />
          <div className='flex flex-wrap gap-4 justify-center mt-5'>
            {tests?.map((q, i) => {
              return (
                <Button
                  key={i}
                  color={currentTest?.id === q?.id ? 'green' : 'gray'}
                  onClick={() => {
                    setCurrentTest({
                      show: false,
                      q: q
                    })
                  }}
                >
                  {q?.name}
                </Button>
              )
            })}
          </div>
            <div className='flex justify-center mt-8'>
              <Button
                disabled={!currentTest?.q?.id}
                onClick={handleTest}
              >
                Начать тест
              </Button>
            </div>
            {currentTest?.q?.questions?.map((q, i) => {
              return (
                <div key={i} className='mt-8 p-4 rounded-primary bg-white shadow-md'>
                  <p className='text-center'>{q?.question}</p>
                  <div className='grid grid-cols-2 gap-4 mt-4'>
                      {q?.answers?.map((a, index) => {
                        return (
                          <Button 
                            key={index}
                            variant={index === q?.selected ? 'filled' : 'outline'}
                            onClick={() => handleAnswer(q?.id, index)}
                          >
                            {a}
                          </Button>
                        )
                      })}
                  </div>
                </div>
              )
            })}
            <div className='flex justify-center mt-8'>
              <Button 
                disabled={!currentTest?.q?.questions?.every(q => q?.selected === 0 || q?.selected)}
              >
                Завершить тест
              </Button>
            </div>
        </div>
      </div>
    </div>
  )
}