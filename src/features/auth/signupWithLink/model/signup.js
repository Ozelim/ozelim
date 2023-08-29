import { pb } from "shared/api"
import { getId } from "shared/lib";

async function signupWithLink (data) {

  try {

    const pyramid = await pb.collection('pyramid').getOne('ozelimbinary123', {expand: 'sponsor'})
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
    })
    .then(async (res) => {
      
      await pb.collection('users').authWithPassword(res.email, data?.password)

      if (sponsor.id === pyramid?.sponsor) return

      const referals = await pb.collection('users').getFullList({
        filter: `sponsor = '${sponsor.id}'`
      })

      if (referals.length === 3 && !sponsor?.bin) {
        for (let i = 1; i <= 50; i++) {
          let multiple = Math.pow(2, i);
          
          if (pyramid?.[i]?.length < multiple) {
            await pb.collection('pyramid').update(pyramid.id, {
              [i]: [...pyramid?.[`${i}`], sponsor.id]
            })
            .then(async res => {
              console.log(sponsor);
              await pb.collection('users').update(sponsor.id, {
                bin: true
              })
              console.log(res, 'write');
            })
            return
          }
        }
      }
    })

  } catch (err) {
    throw err
  }
}

export { signupWithLink }