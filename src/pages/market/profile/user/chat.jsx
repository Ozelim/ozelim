import React from 'react'
import { ActionIcon, clsx, Text, Textarea, Loader } from '@mantine/core'
import dayjs from 'dayjs'
import { AiOutlineSend } from 'react-icons/ai'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'
import { getImageUrl, readNotification } from 'shared/lib'
import { useDisclosure } from '@mantine/hooks'
import { useNotificationStore } from './notificationStore'

async function getOffersChat() {
  return await pb.collection('chats').getFullList({
    filter: `type = 'offer'`,
  })
}

async function getSupportChat(id) {
  return await pb.collection('chats').getOne(id)
}

async function createChat(data) {
  return await pb.collection('chats').create(data)
}

async function getMessages(id) {
  return await pb.collection('messages').getList(1, 30, {
    filter: `chat = '${id}'`,
    expand: 'user, customer, chat',
    sort: '-created',
  })
}

export const Chat = () => {

  const { user } = useAuth()
  const { nots } = useNotificationStore()

  const [offerChat, setOfferChat] = React.useState({})
  const [supportChat, setSupportChat] = React.useState({})
  const [selectedChat, setSelectedChat] = React.useState({})

  const [messages, setMessages] = React.useState([])

  const [messagesLoading, messagesLoading_h] = useDisclosure(false)

  async function handleGetMessages(id) {
    messagesLoading_h.open()
    await getMessages(id)
      .then((q) => {
        setMessages(q?.items)
      })
      .finally(() => {
        messagesLoading_h.close()
      })
  }

  const chats = [supportChat, offerChat]

  const [message, setMessage] = React.useState('')
  const [delay, delay_h] = useDisclosure(false)

  async function handleChatSelect(q) {
    await handleGetMessages(q?.id)
    setSelectedChat(q)
    setMessage('')
    if (q?.type === 'support' && nots?.messages) {
      await readNotification(nots?.id, 'messages')
    }
    if (q?.type === 'offer' && nots?.offer) {
      await readNotification(nots?.id, 'offer')
    }
  }

  const messagesRef = React.useRef(null)

  async function handleSupportChat() {
    await getSupportChat(user?.id)
      .then((q) => {
        setSupportChat(q)
      })
      .catch((err) => {
        if (err?.response?.status === 404) {
          createChat({
            id: user?.id,
            user: user?.id,
            type: 'support',
          }).then((res) => {
            setSupportChat(res)
          })
        }
      })
  }

  async function handleOfferChat() {
    await getOffersChat().then((q) => {
      setOfferChat(q?.[0])
    })
  }

  React.useEffect(() => {
    handleSupportChat()
    handleOfferChat()
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
    if (delay) return

    if (user?.collectionName === 'merchants') {
      await pb
        .collection('messages')
        .create({
          chat: selectedChat?.id,
          message,
          status: 'sent',
          merchant: user?.id,
        })
        .then(async () => {
          await handleGetMessages(selectedChat?.id)
          setMessage('')
          delay_h.open()
          setTimeout(() => {
            delay_h.close()
          }, 5000)
        })
        return
    }
    await pb
      .collection('messages')
      .create({
        chat: selectedChat?.id,
        message,
        status: 'sent',
        ...(user?.collection === 'customer' ? { customer: user?.id } : { user: user?.id }),
      })
      .then(async () => {
        await handleGetMessages(selectedChat?.id)
        setMessage('')
        delay_h.open()
        setTimeout(() => {
          delay_h.close()
        }, 5000)
      })
  }

  async function subscribeToChats() {
    await pb.collection('messages').subscribe('*', function ({ record }) {
      if (record?.chat === selectedChat?.id) {
        handleGetMessages(selectedChat?.id)
      }
    })
  }

  React.useEffect(() => {
    subscribeToChats()
  }, [])

  return (
    <div className="market">
      <div className="grid lg:grid-cols-[30%_auto] border mt-4 rounded-xl overflow-hidden max-w-6xl mx-auto bg-white">
        <div className="flex flex-col overflow-y-auto h-[60vh]">
          {chats?.map((q, i) => {
            return (
              <div
                className={clsx(
                  'flex gap-2 items-center border-t p-3 pr-0 first:border-t-0 cursor-pointer relative',
                  {
                    'bg-primary-600 text-white': selectedChat?.id === q?.id,
                  }
                )}
                key={i}
                onClick={() => handleChatSelect(q)}
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

                {nots?.messages && q?.type === 'support' && (
                  <div className="bg-primary-500 w-4 h-4 rounded-full absolute right-2 top-2" />
                )}

                {nots?.offer && q?.type === 'offer' && (
                  <div className="bg-primary-500 w-4 h-4 rounded-full absolute right-2 top-2" />
                )}
              </div>
            )
          })}
        </div>
        <div className="lg:border-l grid grid-rows-[auto_1fr_auto] h-[60vh]">
          <div className="flex gap-4 justify-center items-center mt-3 border-b pb-3">
            {selectedChat?.type === 'support' && (
              <img
                // src={getImageUrl(selectedChat, selectedChat?.image)}
                src={'https://pbs.twimg.com/media/GV4Rqt2XEAAQotY?format=jpg&name=4096x4096'}
                alt=""
                className="w-14 h-14 object-cover rounded-full"
              />
            )}

            {selectedChat?.type === 'offer' && (
              <img
                // src={getImageUrl(selectedChat, selectedChat?.image)}
                src={'https://pbs.twimg.com/media/GV4Rqt2XEAAQotY?format=jpg&name=4096x4096'}
                alt=""
                className="w-14 h-14 object-cover rounded-full"
              />
            )}

            <div className="flex flex-col justify-center">
              <p>{selectedChat?.name || 'Служба поддержки'}</p>
              <Text size="sm" color="gray.6" className="max-w-xs">
                {selectedChat?.description || 'Чат со службой поддержки'}
              </Text>
            </div>
          </div>

          <div className="flex flex-col gap-3 grow p-3 overflow-y-auto chat-font relative">
            {messagesLoading && (
              <div className="flex justify-center items-center h-full">
                <Loader />
              </div>
            )}
            {messages &&
              messages
                ?.map((q, i) => {
                  return (
                    <div
                      key={i}
                      className={clsx(
                        'bg-primary-500 max-w-[364px] p-2 rounded-xl text-white w-fit',
                        {
                          'ml-auto': q?.user === user?.id || q?.customer === user?.id || q?.merchant === user?.id,
                        }
                      )}
                    >
                      <div ref={messagesRef} className="relative flex items-end">
                        <p>{q?.message}</p>
                        <p className="text-xs -mb-[5px] ml-2 text-slate-100">
                          {dayjs(q?.created).format('HH:mm')}
                        </p>
                      </div>
                    </div>
                  )
                })
                ?.reverse()}
          </div>

          {selectedChat?.type !== 'offer' && (
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
                  <ActionIcon onClick={sendMessage} disabled={selectedChat?.type === 'offer'}>
                    <AiOutlineSend size={30} />
                  </ActionIcon>
                }
                disabled={selectedChat?.type === 'offer'}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}