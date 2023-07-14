import { pb } from 'shared/api'


const userDataApi = {
  changeAvatar: async (userId, image) => {
    if (image) {
      const formData = new FormData()
      formData.append('avatar', image, `${userId}${Math.round(Math.random() * 99) + 1}`)
  
      return await pb.collection('users').update(userId, formData)
    }

    return await pb.collection('users').update(userId, {
      avatar: null
    })
  }
}

export { userDataApi }