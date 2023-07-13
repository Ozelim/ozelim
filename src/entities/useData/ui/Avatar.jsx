import { Button, Popover } from '@mantine/core';
import React from 'react'
import { pb } from 'shared/api';
import { useAuth } from 'shared/hooks'

export const Avatar = () => {

  const { user, onChange } = useAuth()

  const [opened, setOpened] = React.useState(false)

  return (
    <div className='relative'>
      <div className='aspect-square h-full bg-slate-300 rounded-primary'/>
      <div className='absolute bottom-1 right-1'>
        <Popover
          opened={opened}
          onChange={setOpened}
        >
          <Popover.Target>
            <Button
              compact
              variant='subtle'
              size='xs'
              color='dark'
              onClick={() => setOpened((q) => !q)}
            >
              Редактировать  
            </Button> 
          </Popover.Target>
          <Popover.Dropdown>r
            <p className='cursor-pointer text-sm'>
              Загрузить фото
            </p>
            <p className='cursor-pointer text-sm mt-2'>
              Удалить фото
            </p>
          </Popover.Dropdown>
        </Popover>
      </div>
    </div>
  )
}
