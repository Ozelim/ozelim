import { pb } from "shared/api"

async function signupWithLink (data) {
  try {

    const sponsor = await pb.collection('users').getOne(data.sponsor, {expand: 'referals'})
    const referals = await pb.collection('users').getFullList({
      filter: 'sponsor '
    })

    return await pb.collection('users').create(data)
    // .then(async res => {
    //   await pb.collection('users').update(sponsor.id, {
    //     referals: [...sponsor.referals, res.id]
    //   })
    // })
  } catch (err) {
    console.log(err.meesage);
  }
}

export { signupWithLink }