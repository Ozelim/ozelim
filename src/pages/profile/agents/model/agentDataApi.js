import { pb } from 'shared/api'
import { compress, getId } from 'shared/lib'

const agentsDataApi = {
  changeAvatar: async (userId, image) => {
    if (image) {

      compress(image, {quality: 0.1, maxWidth: 600, maxHeight: 600})
      .then(async res => {
        const formData = new FormData()
        formData.append('avatar', res, getId(5))
    
        return await pb.collection('agents').update(userId, formData)
        .then(res => {
          console.log(res, 'res');
        })
      })
    }

    return await pb.collection('agents').update(userId, {
      avatar: null
    })
  }
}

export { agentsDataApi }