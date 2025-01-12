import React from 'react'
import { ActionIcon, clsx, Text, Textarea } from '@mantine/core'
import dayjs from 'dayjs'
import { AiOutlineSend } from 'react-icons/ai'
import { useParams, useSearchParams } from 'react-router-dom'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'
import { getImageUrl } from 'shared/lib'

async function getChatsByUser(id) {
  return await pb.collection('chats').getFullList({
    filter: `users ?~ "${id}"`,
    expand: 'market_id',
  })
}

async function getChatsByMarket(id) {
  return await pb.collection('chats').getFullList({
    filter: `market_id = "${id}"`,
    expand: 'market_id',
  })
}

async function getChatById(id) {
  return await pb.collection('chats').getFullList({
    filter: `market_id = "${id}"`,
    expand: 'market_id',
  })
}

async function createChat(data) {
  return await pb.collection('chats').create(data)
}

export const Chat = () => {
  const [params, setParams] = useSearchParams()

  const chatId = params.get('chatId')

  const { user } = useAuth()

  const [chats, setChats] = React.useState([])

  const [message, setMessage] = React.useState('')

  const messagesRef = React.useRef(null)

  const selectedChat = chats?.filter((q) => q?.market_id === chatId)?.[0]

  async function handleChat() {
    if (!user?.duken) {
      let userChats = []

      await getChatsByUser(user?.id).then((res) => {
        setChats(res)
        // userChats = res
      })
      // .finally(() => {
      //   getChatById(chatId)
      //   .then(res => {
      //     userChats.push(res)
      //     setChats(userChats)
      //   })
      //   .catch(err => {
      //     if (err?.response?.status === 404) {
      //       createChat({market_id: chatId, users: [user?.id]})
      //       .then(res => {
      //         userChats.push(res)
      //         setChats(userChats)
      //       })
      //     }
      //   })
      // })
      return
    }

    getChatsByMarket(chatId).then((res) => {
      setChats(res)
    })
  }

  async function subscribeToChats() {
    await pb.collection('chats').subscribe('*', function ({ action, record }) {
      const updatedChats = chats?.map((item) => {
        return item?.market_id == record?.market_id ? record : item
      })

      console.log(chats, 'chats')
      console.log(record, 'record')
      console.log(updatedChats, 'updated')
      if (updatedChats?.length !== 0) {
        setChats(updatedChats)
      }
    })

    // return pb.collection('chats').unsubscribe('*')
  }

  console.log(chats, 'chats');
  

  function selectChat(q) {
    params.set('chatId', q?.market_id)
    setParams(params)
  }

  React.useEffect(() => {
    handleChat()
    subscribeToChats()
  }, [])

  React.useEffect(() => {
    messagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [selectedChat?.messages])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!message) return

      sendMessage()
    }
  }

  async function sendMessage() {
    await pb
      .collection('chats')
      .update(selectedChat?.id, {
        messages: [
          ...(selectedChat?.messages ?? []),
          {
            user: user?.id,
            message,
            date: new Date(),
          },
        ],
      })
      .then((res) => {
        setMessage('')
      })
  }

  return (
    <div className="market ">
      {/* <p>Чат с магазином</p> */}
      <div className="grid lg:grid-cols-[30%_auto] border mt-4 rounded-xl overflow-hidden min-h-[45vh]">
        <div className="flex flex-col overflow-y-auto">
          {chats?.map((q, i) => {
            return (
              <div
                className={clsx(
                  'flex gap-2 items-center border-t p-3 pr-0 first:border-t-0 cursor-pointer',
                  {
                    'bg-red-600 text-white': selectedChat?.market_id === q?.market_id,
                  }
                )}
                key={i}
                onClick={() => selectChat(q)}
              >
                <img
                  src={getImageUrl(q?.expand?.market_id, q?.expand?.market_id?.image)}
                  alt=""
                  className="w-14 h-14 object-cover rounded-full"
                />
                <div>
                  <Text lineClamp={1}>{q?.expand?.market_id?.name}</Text>
                  <Text
                    lineClamp={1}
                    size="sm"
                    color={selectedChat?.id === q?.id ? 'white' : 'gray.6'}
                  >
                    {selectedChat?.messages?.[selectedChat?.messages?.length]?.message}
                  </Text>
                </div>
              </div>
            )
          })}
        </div>
        <div className="lg:border-l grid grid-rows-[auto_1fr_auto] h-full">
          <div className="flex gap-4 justify-center items-center mt-3 border-b pb-3">
            <img
              src={getImageUrl(
                selectedChat?.expand?.market_id,
                selectedChat?.expand?.market_id?.image
              )}
              alt=""
              className="w-14 h-14 object-cover rounded-full"
            />
            <div className="flex flex-col justify-center">
              <p>{selectedChat?.expand?.market_id?.name}</p>
              <Text lineClamp={1} size="sm" color="gray.6" className="max-w-xs">
                {selectedChat?.expand?.market_id?.description}
              </Text>
            </div>
          </div>

          <div className="flex flex-col gap-3 grow p-3 overflow-y-auto max-h-[45vh] chat-font relative">
            {selectedChat?.messages &&
              selectedChat?.messages?.map((q, i) => {
                return (
                  <div
                    key={i}
                    className={clsx('bg-red-500 max-w-[264px] p-2 rounded-xl text-white w-fit', {
                      'ml-auto': q?.user === user?.id,
                      // 'bg-gray-100': q?.user !== user?.id
                    })}
                  >
                    <div ref={messagesRef} className="relative flex items-end">
                      <p>{q?.message}</p>
                      <p className="text-xs -mb-[5px] ml-2 text-slate-100">
                        {dayjs(q?.date).format('H:mm')}
                      </p>
                    </div>
                  </div>
                )
              })}
          </div>

          <div className="flex gap-4 justify-center border-t items-center mt-auto w-full h-full shrink">
            <Textarea
              className="w-full h-full grow"
              variant="filled"
              radius="xs"
              placeholder="Введите сообщение"
              onKeyDown={handleKeyDown}
              value={message ?? ''}
              onChange={(e) => setMessage(e.currentTarget.value)}
              rightSection={
                <ActionIcon onClick={sendMessage}>
                  <AiOutlineSend size={30} />
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
