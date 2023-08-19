import { pb } from 'shared/api'
import { getId } from 'shared/lib'


const userDataApi = {
  changeAvatar: async (userId, image) => {
    if (image) {
      const formData = new FormData()
      formData.append('avatar', image, getId(10))
  
      return await pb.collection('users').update(userId, formData)
      .then(res => {
        console.log(res, 'res');
      })
    }

    return await pb.collection('users').update(userId, {
      avatar: null
    })
  }
}

export { userDataApi }