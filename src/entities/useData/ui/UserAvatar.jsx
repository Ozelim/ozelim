import React from 'react'
import { Button, FileButton, Popover } from '@mantine/core';
import { useAuth } from 'shared/hooks'
import { getImageUrl } from 'shared/lib';
import { userDataApi } from '../api/userDataApi';
import { pb } from 'shared/api';

export const UserAvatar = () => {

  const { user } = useAuth()

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
      userDataApi.changeAvatar(user?.id, avatar)
      .then(res => {
        setShowSave(false)
      })
    } 
    if (!image) {
      userDataApi.changeAvatar(user?.id, null)
      .then(res => {
        setShowSave(false)
      })
    }
  }

  return (
    <div className='w-full h-full'>
      <div className='relative w-72 h-72 rounded-full overflow-hidden mx-auto'>
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

        <div className='absolute bottom-1 left-1/2 -translate-x-1/2'>
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
