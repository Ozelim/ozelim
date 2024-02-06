import { pb } from 'shared/api'

const referapsApi = {

  getReferals: async (sponsorId) => {
    return await pb.collection('users').getFullList({
      filter: `sponsor = "${sponsorId}"`
    })
  }
}

export { referapsApi }