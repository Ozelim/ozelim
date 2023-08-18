import { pb } from "shared/api"
import { getId } from "shared/lib";

function RandomNumbers() {
  const randomNumbers = Array.from({ length: 15 }, () => Math.floor(Math.random() * 10));
  return randomNumbers
}

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
    const sponsor = await pb.collection('users').getOne(data?.sponsor)

    return await pb.collection('users').create({
      ...data, 
      id: getId(),
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
          
          if (pyramid?.[`${i}`]?.length < multiple) {
            await pb.collection('pyramid').update(pyramid.id, {
              [`${i}`]: [...pyramid?.[`${i}`], sponsor.id]
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
    console.log(err.meesage);
  }
}

export { signupWithLink }