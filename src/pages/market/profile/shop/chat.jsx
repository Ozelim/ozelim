import React from 'react'
import { ActionIcon, clsx, Text, Textarea } from '@mantine/core'
import dayjs from 'dayjs'
import { AiOutlineSend } from 'react-icons/ai'
import { useParams, useSearchParams } from 'react-router-dom'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'
import { getImageUrl } from 'shared/lib'

async function getNotificationsChat (id) {
  return await pb.collection('chats').getFullList({
    filter: `type = 'notifications'`
  })
}

async function getMainChat (id) {
  return await pb.collection('chats').getFullList({
    filter: `type = 'default' && user = '${id}'`
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

  const selectedChat = chats?.filter((q) => q?.id === chatId)?.[0]

  async function handleChat() {

    const newChats = []

      await getNotificationsChat().then(async (res) => {
        newChats.push(res?.[0])

        await getMainChat(user?.id)
        .then(q => {
          if (q?.length === 0) {
            createChat({
              user: user?.id,
              type: 'default',
            })
            .then(res => {
              newChats.push(res)
              setChats(newChats)
            })
          }
          newChats.push(q?.[0])
          setChats(newChats)
        })
        .catch(err => {
          console.log(err?.response, 'err');
        })
      })
  }

  async function subscribeToChats() {
    // await pb.collection('chats').subscribe('*', function ({ action, record }) {
    //   const updatedChats = chats?.map((item) => {
    //     return item?.id == record?.id ? record : item
    //   })

    //   if (updatedChats?.length !== 0) {
    //     setChats(updatedChats)
    //   }
    // })

    // return pb.collection('chats').unsubscribe('*')
  }


  function selectChat(q) {
    params.set('chatId', q?.id)
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
      <div className="grid lg:grid-cols-[30%_auto] border mt-4 rounded-xl overflow-hidden min-h-[45vh]">
        <div className="flex flex-col overflow-y-auto">
          {chats?.map((q, i) => {
            return (
              <div
                className={clsx(
                  'flex gap-2 items-center border-t p-3 pr-0 first:border-t-0 cursor-pointer',
                  {
                    'bg-red-600 text-white': selectedChat?.id === q?.id,
                  }
                )}
                key={i}
                onClick={() => selectChat(q)}
              >
                {q?.image ? (
                  <img
                    src={getImageUrl(q, q?.image)}
                    alt=""
                    className="w-14 h-14 object-cover rounded-full"
                  />
                ) : (
                  <img
                    src={'https://pbs.twimg.com/media/GV4Rqt2XEAAQotY?format=jpg&name=4096x4096'}
                    alt=""
                    className="w-14 h-14 object-cover rounded-full"
                  />
                )}
                <div>
                  <Text lineClamp={1}>{q?.name ? q?.name : 'Чат со службой поддержки'}</Text>
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
                selectedChat,
                selectedChat?.image
              )}
              alt=""
              className="w-14 h-14 object-cover rounded-full"
            />
            <div className="flex flex-col justify-center">
              <p>{selectedChat?.name}</p>
              <Text lineClamp={1} size="sm" color="gray.6" className="max-w-xs">
                {selectedChat?.description}
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
                <ActionIcon onClick={sendMessage} disabled={selectedChat?.type === 'notifications'}>
                  <AiOutlineSend size={30} />
                </ActionIcon>
              }
              disabled={selectedChat?.type === 'notifications'}
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
