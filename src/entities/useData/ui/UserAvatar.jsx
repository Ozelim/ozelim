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

  console.log(avatar, image);

  return (
    <div className='w-full h-full'>
      <div className='aspect-square h-full bg-slate-300 rounded-primary overflow-hidden relative'>
        {avatar && (
          <img 
            className='w-full h-full object-cover'
            src={URL.createObjectURL(avatar)}
            alt="" 
          />
        )}
        {image && (
          <img
            src={getImageUrl(user, image)} 
            className='w-full h-full object-cover'
            alt="" 
          />
        )}
        <div className='absolute bottom-1 right-1'>
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
                variant='subtle'
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
