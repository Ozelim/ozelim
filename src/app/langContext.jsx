import React from 'react'

export const LangContext = React.createContext(null)

export function LangProvider({children}) {
  
  const [lang, setLang] = React.useState(localStorage.getItem('lang') ?? 'ru')

  const kz = lang === 'kz'

  const qq = (ru, kz) => { 
    if (lang === 'kz') return kz
    return ru
  }

  function handleLang () {
    if (lang === 'kz') {
      setLang('ru')
      localStorage.setItem('lang', 'ru')
    } else {
      setLang('kz')
      localStorage.setItem('lang', 'kz')
    }
  } 

  function changeLang (l) {
    console.log(l);
    setLang(l)
    localStorage.setItem('lang', l)
  }

  return (
    <LangContext.Provider value={{lang, qq, handleLang, kz, changeLang}}>
      {children}
    </LangContext.Provider>
  )
}

export function useLangContext () {
  return React.useContext(LangContext)
}