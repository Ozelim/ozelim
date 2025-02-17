import { pb } from "shared/api"

async function readNotification (id, type) {
  await pb.collection('notifications').update(id, {
    [type]: false
  })
  .catch(async err => {
    if (err?.response?.status === 404) {
      await pb.collection('notifications').create({
        id,
        [type]: false
      })
    }
  })
}

export { readNotification }