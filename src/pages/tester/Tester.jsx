import React from 'react'
import { Button, Checkbox, TextInput, clsx } from '@mantine/core'
import { pb } from 'shared/api'
import { Link, useSearchParams } from 'react-router-dom'

async function getTests () {
  return await pb.collection('tester').getFullList()
}

export const Tester = () => {

  const [searchParams, setSearchParams] = useSearchParams()

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

  React.useEffect(() => {
    if (searchParams.get('test')) {
      const t = tests?.filter(q => q?.id === searchParams.get('test'))?.[0] ?? {}
      localStorage.setItem(`ozelim_test`, JSON.stringify(t))
      console.log(t);
      setCurrentTest(t)
    }
  }, [searchParams, tests])

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
    setRemainingTime((currentTest?.duration ?? 90) * 60); // 90 minutes in seconds
    // Save data to local storage
    localStorage.setItem(
      'test_time',
      JSON.stringify({ startTime: storedStartTime, remainingTime: (currentTest?.duration ?? 90) * 60 })
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
        const newRemainingTime = Math.max((currentTest?.duration ?? 90) * 60 - elapsedTime, 0);
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
        company: '',
        city: '',
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

  const [results, setResults] = React.useState({})

  async function endTest () {
    if (!currentTest?.name) return
    setLoading(true)
    await pb.collection('tester_results').create({
      ...data,
      results: {
        ...currentTest,
      }
    })
    .then(async (res) => {
      setResults({
        ...res
      })
      setOptions({started: false, currentQuestion: 0})
      setRemainingTime(null)
      setStartTime(null)
      setCurrentTest({})
    })
    .finally(() => {
      setLoading(false)
    })
  }

  if (results?.results) return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='text-center'>
        <p className='text-3xl font-head'>
          Тест завершен!
        </p>
        <p className='text-xl mt-3'>
          Правильных ответов: <span className='text-primary-500'>{results?.results?.questions?.filter(q => q?.selected === q?.answer)?.length}</span>/{results?.results?.questions?.length}
        </p>
        <Button className='mt-3' component={Link} to={'/'}>
          На главную
        </Button>
      </div>
    </div>
  )


  if (options.started) return (
    <div className="w-full">
      <div className="container">
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
        {options?.started && (
          <div className='flex justify-center mt-8'>
            <Button 
              disabled={!currentTest?.questions?.every(q => q?.selected === 0 || q?.selected)}
              onClick={endTest}
              loading={loading}
            >
              Завершить тест
            </Button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className='w-full'>
      <div className="container">
        <div className="w-full">
          <h1 className='text-center text-2xl'>Тестирование</h1>

          <div className='grid lg:grid-cols-[60%_auto] gap-6'>

            <div>
              <div className='flex flex-col justify-center mt-5'>
                {tests?.map((q, i) => {
                  return (
                    <div className='flex gap-4 border-b-2 py-4'>
                      <p>{i + 1}.</p>
                      <Checkbox
                        checked={currentTest?.id === q?.id}
                      />
                      <p 
                        className={clsx('cursor-pointer', {
                          'text-primary-500': currentTest?.id === q?.id
                        })}
                        onClick={options?.started ? () => {} : () => handleTestClick(q)}
                      >
                        {q?.name}
                      </p>
                    </div>
                    // <Button
                    //   key={i}
                    //   color={currentTest?.id === q?.id ? 'green' : 'gray'}
                    //   onClick={options?.started ? () => {} : () => handleTestClick(q)}
                    //   variant={currentTest?.id === q?.id ? 'filled' : 'outline'}
                    // >
                    //   {q?.name}
                    // </Button>
                  )
                })}
              </div>
            </div>
            <div className='mt-6'>
              <p className='text-xl'>Выбранный тест:</p>
              <p className='mt-2 text-2xl'>{currentTest?.name}</p>
              <div className='mt-5 mx-auto'>
                <div className='grid grid-cols-2 gap-4'>
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
                </div>
                <TextInput
                  label='Наименование организации'
                  value={data?.company}
                  onChange={e => setData({...data, company: e?.target?.value})}
                />
              </div>
              <div className='flex justify-center mt-8'>
                <Button
                  disabled={
                    options?.started || 
                    !currentTest?.id || 
                    !data?.name ||
                    !data?.city || 
                    !data?.company
                  }
                  onClick={handleTestStart}
                >
                  Начать тест
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}