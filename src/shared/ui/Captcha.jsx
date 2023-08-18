import { Button, NumberInput, TextInput } from '@mantine/core'
import React, { useState } from 'react'

export const Capthca = ({ random1, random2, answer, setAnswer }) => {
  return (
    <div>
      <p>Введите в поле правильный ответ</p>
      <p>{`${random1}+${random2} = ${answer}`}</p>
      <TextInput
        maxLength={2}
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
    </div>
  )
}
