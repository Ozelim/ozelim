import { ActionIcon, clsx, Text, Textarea } from '@mantine/core'
import dayjs from 'dayjs'
import React from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'
import { getImageUrl } from 'shared/lib'

async function getChatByUser (id) {
  return await pb.collection('chats').getFullList({
    filter: `messages.user = "${id}"`
  })
}

async function getChatById (id) {
  return (await pb.collection('chats').getFullList({
    filter: `market_id = "${id}"`,
    expand: 'market_id'
  }))?.[0]
}

async function createChat (data) {
  return await pb.collection('chats').create(data)
}

export const Chat = () => {

  const {id} = useParams()

  const {user} = useAuth()  

  const [chats, setChats] = React.useState([])
  const [chat, setChat] = React.useState({})

  const [message, setMessage] = React.useState('')

  const messagesRef = React.useRef(null)

  React.useEffect(() => {
    messagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat?.messages])

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); 
      if (!message) return

      sendMessage()
    }
  };
  
  async function sendMessage () {
    await pb.collection('chats').update(chat?.id, {
      messages: [
        ...chat?.messages ?? [],
        {
          user: user?.id,
          message,
          date: new Date()
        }
      ]
    })
    .then(res => {
      getChatById(id)
      .then(res => {
        const newChats = chats.map(q => q.id === res.id ? res : q)
        setChats(newChats)
        setChat(res)
        setMessage('')
      })
    })
  }

  async function handleChat () {

    let currentChat = {}

    getChatById(id)
    .then(res => {
      setChat(res)
      currentChat = res
      console.log(res, 'res');
    })
    .catch(err => {
      if (err?.response?.status === 404) {
        createChat({market_id: id})
        .then(res => {
          currentChat = res
        })
      }
    })

    await getChatByUser(user?.id)
    .then(res => {
      setChats([currentChat, ...res, ])
    })
  }

  React.useEffect(() => {
    handleChat()
  }, [])
  
  return (
    <div className='container-market !max-w-5xl market'>
      <p>Чат с магазином</p>
      <div className='grid lg:grid-cols-[30%_auto] border mt-4 rounded-xl overflow-hidden min-h-[10vh]'>
        <div className="flex flex-col overflow-y-auto">
          {chats?.map((q, i) => {
            return (
              <div 
                className={clsx('flex gap-2 items-center border-t p-3 pr-0 first:border-t-0 cursor-pointer', {
                  'bg-red-600 text-white': chat?.id === q?.id
                })} 
                key={i}
                onClick={() => setChat(q)}
              >
                <img 
                  src={getImageUrl(q?.expand?.market_id, q?.expand?.market_id?.image)}
                  alt="" 
                  className='w-14 h-14 object-cover rounded-full'
                />
                <div>
                  <Text lineClamp={1}>{q?.expand?.market_id?.name}</Text>
                  <Text lineClamp={1} size='sm' color={chat?.id === q?.id ? 'white' : 'gray.6'}>
                    {chat?.messages?.[chat?.messages?.length]?.message}
                  </Text>
                </div>
              </div>
            )
          })}
        </div>
        <div className='lg:border-l grid grid-rows-[auto_1fr_auto] h-full'>

          <div className='flex gap-4 justify-center items-center mt-3 border-b pb-3'>
            <img 
              src={getImageUrl(chat?.expand?.market_id, chat?.expand?.market_id?.image)}  
              alt="" 
              className='w-14 h-14 object-cover rounded-full'
            />
            <div className='flex flex-col justify-center'>
              <p>{chat?.expand?.market_id?.name}</p>
              <Text lineClamp={1} size='sm' color='gray.6' className='max-w-xs'>
                {chat?.expand?.market_id?.description}
              </Text>
            </div>
          </div>

          <div className='flex flex-col gap-3 grow p-3 overflow-y-auto max-h-[50vh] chat-font'>
            {chat?.messages?.map((q, i) => {
              return (
                <div 
                  key={i} 
                  className={clsx('bg-red-500 max-w-[264px] p-2 rounded-xl text-white w-fit', {
                    'ml-auto': q?.user === user?.id,
                    // 'bg-gray-100': q?.user !== user?.id
                  })}
                >
                  <div ref={messagesRef} className='relative flex items-end'>
                    <p>
                      {q?.message}
                    </p>
                    <p className='text-xs -mb-[5px] ml-2 text-slate-100'>{dayjs(q?.date).format('H:mm')}</p>
                  </div>
                </div>
              )
            })}
              
          </div>

          <div className='flex gap-4 justify-center border-t items-center mt-auto w-full h-full shrink'>
            <Textarea
              className='w-full h-full grow'
              variant='filled'
              radius='xs'
              placeholder='Введите сообщение'
              onKeyDown={handleKeyDown}
              value={message ?? ''}
              onChange={e => setMessage(e.currentTarget.value)}
              rightSection={
                <ActionIcon onClick={sendMessage}>
                  <AiOutlineSend size={30}/>
                </ActionIcon>
              }
              // classNames={{
              //   input: 'h-full w-full'
              // }}
            />
          </div>
          

        </div>
      </div>
    </div>
  )
}
