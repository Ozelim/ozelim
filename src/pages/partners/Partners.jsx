import React from 'react'
import { PartnersCard } from 'entities/partnerCard'
import { pb } from 'shared/api'
import { getExtension, getImageUrl } from 'shared/lib'
import { Modal } from '@mantine/core'

async function getPartners () {
  return await pb.collection('partners').getFullList()
}

export const Partners = () => {

  const [partner, setPartner] = React.useState({})
  const [partners, setPartners] = React.useState([])
  
  React.useEffect(() => {
    getPartners()
    .then(res => {
      setPartners(res)
    })
  }, [])

  const [viewModal, setViewModal] = React.useState(false)

  function view (val) {
    setPartner(val)
    setViewModal(true)
  }

  return (
    <>
      <div className="w-full">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners?.map((partner, i) => {
              return <PartnersCard partner={partner} viewPdf={view} key={i} />
            })}
          </div>
        </div>
      </div>
      <Modal
        opened={viewModal}
        onClose={() => setViewModal(false)}
        // size='50%'
        centered
      >
        {getExtension(partner?.pdf) === 'pdf' ?
          <iframe
            className='w-full h-screen' 
            src={getImageUrl(partner, partner?.pdf)} frameborder="0"
          />
          : <img src={getImageUrl(partner, partner?.pdf)} alt="" className='w-full h-auto' />
        }
      </Modal>
    </>
  )
}
