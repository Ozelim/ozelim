import React from 'react'
import { Referal } from './Referal'
import { referapsApi } from '../api/referalsApi'
import { useAuth } from 'shared/hooks'

export const ReferalsList = ({level}) => {

  const {user} = useAuth()

  const [referals, setReferals] = React.useState([])

  async function getReferals () {
    await referapsApi.getReferals(user?.id)
    .then(res => {
      setReferals(res)
    })
  }

  React.useEffect(() => {
    getReferals()
  }, [])

  return (
    <div className='w-full'>
      <div className='flex gap-3'>
        <div className='flex gap-1'>
          <p className='text'>Партнеры:</p>
          <p className=''>{referals.length}</p>
        </div>
        <div className='flex gap-1'>
          <p className='text'>Уровень:</p>
          <p className=''>{level ? level - 1 : 0}</p>
        </div>
      </div>
      <div className='flex gap-4 overflow-x-auto pb-2 mt-1'>
        {referals.map((referal, i) => {
          return (
            <Referal referal={referal} key={i}/>
          )
        })}
      </div>
    </div>
  )
}
