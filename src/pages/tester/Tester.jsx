import React from 'react'
import { Button, TextInput } from '@mantine/core'
import { pb } from 'shared/api'

async function getTests () {
  return await pb.collection('tester').getFullList()
}

export const Tester = () => {

  const [tests, setTests] = React.useState([]) 
  const [currentTest, setCurrentTest] = React.useState(() => {
    const storedTest = localStorage.getItem('ozelim_test');
    return storedTest ? JSON.parse(storedTest) : {};
  })

  const [options, setOptions] = React.useState(() => {
    const storedTest = localStorage.getItem('test_options');
    return storedTest ? JSON.parse(storedTest) : {
      started: false, 
      currentQuestion: 0
    };
  })

  const [loading, setLoading] = React.useState(false)

  const [startTime, setStartTime] = React.useState(null);
  const [remainingTime, setRemainingTime] = React.useState(null);

  React.useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('test_time'));
    if (storedData) {
      setStartTime(storedData.startTime);
      setRemainingTime(storedData.remainingTime);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('ozelim_test', JSON.stringify(currentTest));
  }, [currentTest]);

  React.useEffect(() => {
    localStorage.setItem('test_options', JSON.stringify(options));
  }, [options]);

  const [data, setData] = React.useState({
    name: '',
    phone: '',
    city: '',
    company: ''
  })

  React.useEffect(() => {
    getTests()
    .then(res => {
      setTests(res)
    })
  }, [])

  function handleTestStart () {
    setOptions({...options, started: true})
    const now = new Date().getTime();
    const storedStartTime = startTime || now;
    // Update start time and remaining time
    setStartTime(storedStartTime);
    setRemainingTime(currentTest?.duration ?? 90 * 60); // 90 minutes in seconds
    // Save data to local storage
    localStorage.setItem(
      'test_time',
      JSON.stringify({ startTime: storedStartTime, remainingTime: currentTest?.duration ?? 90 * 60 })
    );
    localStorage.setItem(
      'ozelim_test',
      JSON.stringify({ ...currentTest, ...data})
    );
  }

  React.useEffect(() => {
    if (startTime !== null && remainingTime !== null && options?.started) {
      const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const elapsedTime = Math.floor((now - startTime) / 1000); // Elapsed time in seconds
        const newRemainingTime = Math.max((1) * 60 - elapsedTime, 0);
        localStorage.setItem(
          'test_time',
          JSON.stringify({ startTime, remainingTime: newRemainingTime })
        );
        setRemainingTime(newRemainingTime);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [startTime, remainingTime])

  React.useEffect(() => {
    if (remainingTime === 0) {
      setOptions({started: false, currentQuestion: 0})
      setRemainingTime(null)
      setStartTime(null)
      localStorage.removeItem('test_time')
      localStorage.removeItem('test_options')
      localStorage.removeItem('ozelim_test')
      setCurrentTest({})
      setData({
        name: '',
        phone: ''
      })
    }
  }, [remainingTime])

  function handleTestClick (q) {
    setCurrentTest(q)
    localStorage.setItem(`ozelim_test`, JSON.stringify(q))
  }

  function handleAnswer (id, index) {
    setCurrentTest(tester => ({...tester, questions: tester?.questions?.map(q =>
      q.id === id ? { ...q, selected: index } : q
    )}));
  }

  function previousQuestion () {
    setOptions(q => ({...q, currentQuestion: q?.currentQuestion - 1}))
  }

  function nextQuestion () {
    setOptions(q => ({...q, currentQuestion: q?.currentQuestion + 1}))
  }

  async function endTest () {
    if (!currentTest?.name && !currentTest?.phone) return
    setLoading(true)
    await pb.collection('tester_results').create({
      ...data,
      results: {
        ...currentTest,
      }
    })
    .then(() => {
      setOptions({started: false, currentQuestion: 0})
      setRemainingTime(null)
      setStartTime(null)
      setCurrentTest({})
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <div className='w-full'>
      <div className="container">
        <div className="w-full">
          <h1 className='text-center text-2xl'>Тест</h1>
          <div className='mt-5 max-w-xs mx-auto'>
            <TextInput
              label='ФИО'
              value={data?.name}
              onChange={e => setData({...data, name: e?.target?.value})}
            />
            <TextInput
              label='Город'
              value={data?.city}
              onChange={e => setData({...data, city: e?.target?.value})}
            />
            <TextInput
              label='Наименование организации'
              value={data?.company}
              onChange={e => setData({...data, company: e?.target?.value})}
            />
            <TextInput
              label='Номер телефона'
              value={data?.phone}
              onChange={e => setData({...data, phone: e?.target?.value})}
            />
          </div>
          <p className='text-center mt-5'>Выберите тест</p>
          <div className='flex flex-wrap gap-4 justify-center mt-5'>
            {tests?.map((q, i) => {
              return (
                <Button
                  key={i}
                  color={currentTest?.id === q?.id ? 'green' : 'gray'}
                  onClick={options?.started ? () => {} : () => handleTestClick(q)}
                >
                  {q?.name}
                </Button>
              )
            })}
          </div>
            <div className='flex justify-center mt-8'>
              <Button
                disabled={
                  options?.started || 
                  !currentTest?.id || 
                  !data?.name ||
                  !data?.phone ||
                  !data?.city || 
                  !data?.company
                }
                onClick={handleTestStart}
              >
                Начать тест
              </Button>
            </div>
            {options?.started && (
              <div className='flex justify-between gap-4 mt-4'>
                <div>
                  Оставшееся время: {Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 && '0'}{remainingTime % 60}
                </div>
                <div>
                  Вопрос {options?.currentQuestion + 1}/{currentTest?.questions?.length}
                </div>
              </div>
            )}
            {options.started && (
              <>
                {currentTest?.questions?.[options?.currentQuestion] &&
                  <div className='mt-4 p-4 rounded-primary bg-white shadow-md'>
                    <p className='text-center'>{currentTest?.questions?.[options?.currentQuestion]?.question}</p>
                    <div className='grid md:grid-cols-2 gap-4 mt-4'>
                        {currentTest?.questions?.[options?.currentQuestion]?.answers?.map((a, index) => {
                          return (
                            <Button 
                              key={index}
                              variant={index === currentTest?.questions?.[options?.currentQuestion]?.selected ? 'filled' : 'outline'}
                              onClick={() => handleAnswer(currentTest?.questions?.[options?.currentQuestion]?.id, index)}
                            >
                              {a}
                            </Button>
                          )
                        })}
                    </div>
                  </div>}
                  <div className='flex justify-center gap-4 mt-8'>
                    <Button
                      disabled={options?.currentQuestion === 0}
                      onClick={previousQuestion}
                      compact
                    >
                      Предыдущий вопрос
                    </Button>
                    <Button
                      disabled={options?.currentQuestion + 1 === currentTest?.questions?.length}
                      onClick={nextQuestion}
                      compact
                    >
                      Следуйщий вопрос
                    </Button>
                  </div>
              </>
            )}
            <div className='flex justify-center mt-8'>
              <Button 
                disabled={!currentTest?.questions?.every(q => q?.selected === 0 || q?.selected)}
                onClick={endTest}
                loading={loading}
              >
                Завершить тест
              </Button>
            </div>
        </div>
      </div>
    </div>
  )
}