import { pb } from "shared/api"

function generateRandomEmail() {
  const validChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const emailLength = 10;
  const domain = 'example.com';

  let randomEmail = '';
  for (let i = 0; i < emailLength; i++) {
    const randomIndex = Math.floor(Math.random() * validChars.length);
    randomEmail += validChars.charAt(randomIndex);
  }

  return randomEmail + '@' + domain;
}

async function signupWithLink (data) {

  try {
    
    const pyramid = await pb.collection('pyramid').getOne('ozelimbinary123', {expand: 'sponsor'})
    const sponsor = await pb.collection('users').getOne(data.sponsor)

    return await pb.collection('users').create({
      ...data, 
      email: generateRandomEmail(),
      name: generateRandomEmail(),
      city: 'Алматы', 
      iin: 112233112233,
      birthday: new Date(),
      phone: 87024299146,
      password: 'zxczxczxc',
      passwordConfirm: 'zxczxczxc',
      emailVisibility: true,
    })
    .then(async (res) => {
      if (sponsor.id === pyramid?.sponsor) return

      const referals = await pb.collection('users').getFullList({
        filter: `sponsor = '${sponsor.id}'`
      })

      if (referals.length === 3) {
        for (let i = 1; i <= 50; i++) {
          let multiple = Math.pow(2, i);
          
          if (pyramid?.[`b${i}`]?.length < multiple) {
            await pb.collection('pyramid').update(pyramid.id, {
              [`b${i}`]: [...pyramid?.[`b${i}`], sponsor.id]
            })
            .then(res => {
              console.log(res, 'write');
            })
            return
          }
        }
      }
    })

  } catch (err) {
    console.log(err.meesage);
  }
}

export { signupWithLink }