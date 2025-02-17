import { pb } from "shared/api"

async function pushNotification (id, type) {
  await pb.collection('notifications').getOne(id)
  .then(async res => {
    await pb.collection('notifications').update(id, {
      [type]: true
    })
  })
  .catch(async err => {
    if (err?.response?.status === 404) {
      await pb.collection('notifications').create({
        id,
        [type]: true
      })
    }
  })
}

export { pushNotification }