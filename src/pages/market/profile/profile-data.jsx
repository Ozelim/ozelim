import { Button, FileButton, Popover } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'shared/hooks'

export const ProfileData = () => {
  
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
    // if (avatar) {
    //   userDataApi.changeAvatar(user?.id, avatar)
    //   .then(res => {
    //     setShowSave(false)
    //   })
    // } 
    // if (!image) {
    //   userDataApi.changeAvatar(user?.id, null)
    //   .then(res => {
    //     setShowSave(false)
    //   })
    // }
  }

  const {user} = useAuth()
  
  return (
    <div className='market'>
      
      <div className='relative mx-auto'>
        {avatar && (
          <img 
            className='object-cover w-full h-full mx-auto aspect-square'
            src={URL.createObjectURL(avatar)}
            alt="" 
          />
        )}
        {image && (
          <img
            src={getImageUrl(user, image)} 
            className='object-cover w-full h-full mx-auto aspect-square'
            alt="" 
          />
        )}
        <div className='aspect-square w-full h-full mx-auto bg-slate-100'/>
        <div className="flex justify-center mt-4"> 
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
                size='sm'
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

      <ul className='mt-4'>
        <li className='flex gap-4'>
          <p>Имя:</p>
          <p>{user?.fio}</p>
        </li>
        <li className='flex gap-4'>
          <p>Баланс:</p>
          <p>{user?.balance}</p>
        </li>
        <li className='flex gap-4'>
          <p>Бонусы:</p>
          <p>{user?.bonuses}</p>
        </li>
      </ul>

      <p>
        Перейти в <Link to='/' className='underline'>oz-elim.kz</Link>
      </p>
      
    </div>
  )
}
