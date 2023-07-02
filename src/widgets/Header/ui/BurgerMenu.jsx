import React from 'react'
import { Burger } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';

export const BurgerMenu = () => {

  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Burger opened={opened} onClick={toggle} />
  )
}
