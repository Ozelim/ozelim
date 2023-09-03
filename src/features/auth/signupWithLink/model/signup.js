import { pb } from "shared/api"
import { getId } from "shared/lib";

async function signupWithLink (data) {

  try {

    const sponsor = await pb.collection('users').getOne(data?.sponsor)
    // .catch(() => {
    //   throw new Error('unverified')
    // })

    if (!sponsor?.verified) {
      throw 'unverified'
    }

    return await pb.collection('users').create({
      ...data, 
      id: getId(15),
      emailVisibility: true,
      level: '0'
    })

  } catch (err) {
    throw err
  }
}

export { signupWithLink }