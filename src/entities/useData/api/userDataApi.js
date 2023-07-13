import { pb } from 'shared/api'


const userDataApi = {
  changeAvatar: async (userId, image) => {
    console.log(userId, image);
    const formData = new FormData()
    formData.append('avatar', image, `${userId}${Math.round(Math.random() * 99) + 1}`)

    await pb.collection('users').update(userId, formData)
  }
}

export { userDataApi }