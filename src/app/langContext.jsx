import React from 'react'

export const LangContext = React.createContext(null)

export function LangProvider({children}) {
  
  const [lang, setLang] = React.useState(localStorage.getItem('lang') ?? 'ru')

  const kz = lang === 'kz'

  function handleLang () {
    if (lang === 'kz') {
      setLang('ru')
      localStorage.setItem('lang', 'ru')
    } else {
      setLang('kz')
      localStorage.setItem('lang', 'kz')
    }
  } 

  return (
    <LangContext.Provider value={{lang, handleLang, kz}}>
      {children}
    </LangContext.Provider>
  )
}

export function useLangContext () {
  return React.useContext(LangContext)
}