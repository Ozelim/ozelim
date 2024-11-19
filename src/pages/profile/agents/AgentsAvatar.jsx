import React from 'react'
import { Button, FileButton, Popover } from '@mantine/core';
import { useAuth } from 'shared/hooks'
import { getImageUrl } from 'shared/lib';
import { agentsDataApi } from './model/agentDataApi';
// import { userDataApi } from '../api/userDataApi';

export const AgentsAvatar = () => {

  const { user } = useAuth('agents')

  const [opened, setOpened] = React.useState(false)
  const [showSave, setShowSave] = React.useState(false)

  const [avatar, setAvatar] = React.useState(null)
  const [image, setImage] = React.useState(null)

  React.useEffect(() => {
    setImage(user?.avatar)
  }, [])

  function handleAvatarChange (val) {
    setAvatar(val)
    setOpened(false)
    setShowSave(true)
  }

  function removeAvatar () {
    if (avatar) {
      setAvatar(null)
      setShowSave(false)
    } else {
      setImage(null)
      setShowSave(true)
    }
    setOpened(false)
  }

  async function changeAvatar () {
    if (avatar) {
      agentsDataApi.changeAvatar(user?.id, avatar)
      .then(res => {
        setShowSave(false)
      })
    } 
    if (!image) {
      agentsDataApi.changeAvatar(user?.id, null)
      .then(res => {
        setShowSave(false)
      })
    }
  }

  return (
    <div className='w-full h-full'>
      <div className='relative w-36 h-36 rounded-full overflow-hidden mx-auto'>
        {avatar && (
          <img 
            className='object-cover w-full h-full mx-auto'
            src={URL.createObjectURL(avatar)}
            alt="" 
          />
        )}
        {image && (
          <img
            src={getImageUrl(user, image)} 
            className='object-cover w-full h-full mx-auto'
            alt="" 
          />
        )}
        <div className='object-cover w-full h-full mx-auto bg-slate-200'/>

      </div>
        {/* <div className='absolute bottom-1 left-1/2 -translate-x-1/2'> */}
        <div className='flex justify-center mt-2'>
          <Popover
            opened={opened}
            onChange={setOpened}
            classNames={{
              dropdown: '!p-0 flex flex-col items-start'
            }}
          >
            <Popover.Target>
              <Button
                compact
                variant='filled'
                size='xs'
                onClick={() => setOpened((q) => !q)}
              >
                Редактировать   
              </Button> 
            </Popover.Target>
            <Popover.Dropdown>
              <FileButton 
                compact
                variant='subtle'
                onChange={handleAvatarChange}
              >
                {(props) => <Button {...props}>Загрузить</Button>}
              </FileButton>

              <Button
                compact
                variant='subtle'
                onClick={removeAvatar}
              >
                Удалить
              </Button>
            </Popover.Dropdown>
          </Popover>
        </div>
      {showSave && (
        <div className='mt-2'>
          <Button
            compact
            variant='outline'
            onClick={changeAvatar}
          >
            Сохранить
          </Button>
        </div>
      )}
    </div>
  )
}