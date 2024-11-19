import React from 'react'

export const colorContext = React.createContext(null)

export function ColorProvider({children}) {
  
  const [color, setColor] = React.useState('orange')

  return (
    <LangContext.Provider value={{color, setColor}}>
      {children}
    </LangContext.Provider>
  )
}

export function useColorContext () {
  return React.useContext(colorContext)
}